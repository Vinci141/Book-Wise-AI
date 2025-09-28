import { GoogleGenAI, Type } from "@google/genai";
import type { SummaryData, Recommendations } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    author: {
        type: Type.STRING,
        description: "The full name of the book's author. It is crucial that this is factually correct.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise summary of the book, capturing the main ideas and themes. Should be around 3-4 paragraphs.",
    },
    keyLearnings: {
      type: Type.ARRAY,
      description: "A list of 5-7 key, actionable learnings from the book.",
      items: {
        type: Type.OBJECT,
        properties: {
          learning: {
            type: Type.STRING,
            description: "A single key learning or takeaway from the book.",
          },
          visual: {
            type: Type.STRING,
            description: "A single, relevant emoji that visually represents the key learning.",
          },
        },
        required: ["learning", "visual"],
      },
    },
  },
  required: ["author", "summary", "keyLearnings"],
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
    const prompt = `For the book titled "${bookTitle}", provide its author, a concise summary, and 5-7 key actionable learnings. It is crucial that the author's name is correct. Provide a relevant emoji for each key learning.`;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: summarySchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as SummaryData;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary. Please check the book title and try again.");
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
