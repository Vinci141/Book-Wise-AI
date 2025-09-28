import { GoogleGenAI, Type } from "@google/genai";
import type { SummaryData, Recommendations } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

// Note: This schema is now for reference, as we instruct the model in the prompt
// to generate a JSON string when using Google Search grounding.
const summarySchemaReference = {
    author: "string",
    summary: "string",
    keyLearnings: [{ learning: "string", visual: "string" }],
};


const recommendationsSchema = {
    type: Type.OBJECT,
    properties: {
        books: {
            type: Type.ARRAY,
            description: "A list of recommended books related to the user's interest.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the book." },
                    description: { type: Type.STRING, description: "A brief, one-sentence description of why the book is recommended." },
                },
                required: ["title", "description"],
            },
        },
        websites: {
            type: Type.ARRAY,
            description: "A list of recommended websites, blogs, or online resources.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The name of the website or resource." },
                    description: { type: Type.STRING, description: "A brief, one-sentence description of the resource." },
                },
                required: ["title", "description"],
            },
        },
        courses: {
            type: Type.ARRAY,
            description: "A list of recommended online courses (e.g., from Coursera, Udemy, etc.).",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the course." },
                    description: { type: Type.STRING, description: "A brief, one-sentence description of the course." },
                },
                required: ["title", "description"],
            },
        },
    },
    required: ["books", "websites", "courses"],
};


export const generateSummaryAndLearnings = async (bookTitle: string): Promise<SummaryData> => {
  try {
    // Using Google Search grounding for factual accuracy.
    // The prompt now explicitly asks for a JSON object string as output.
    const prompt = `Using Google Search to ensure 100% factual accuracy, provide the correct author for the book titled "${bookTitle}". Then, generate a concise summary and 5-7 key actionable learnings, each with a relevant emoji.
    
    Return the entire response as a single, raw JSON object string. Do not use markdown (e.g., \`\`\`json). The JSON object must have this exact structure: 
    { 
      "author": "string", 
      "summary": "string", 
      "keyLearnings": [{ "learning": "string", "visual": "string" }] 
    }`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        // Use Google Search for grounding to improve factual accuracy.
        // responseSchema and responseMimeType are not compatible with this tool.
        tools: [{googleSearch: {}}],
      },
    });

    const jsonText = response.text.trim();
    // In case the model wraps the response in markdown, we extract the JSON object.
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (!match) {
        throw new Error("Invalid JSON response from the model.");
    }

    return JSON.parse(match[0]) as SummaryData;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary. The book may not be well-known or the title could be incorrect.");
  }
};

export const generateRecommendations = async (interest: string): Promise<Recommendations> => {
    try {
        const prompt = `Based on an interest in "${interest}", recommend the top 3 books, 3 websites/blogs, and 3 online courses for further learning. For each recommendation, provide a title and a brief, one-sentence description.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationsSchema,
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Recommendations;
    } catch (error) {
        console.error("Error generating recommendations:", error);
        throw new Error("Failed to generate recommendations. Please try a different topic.");
    }
};