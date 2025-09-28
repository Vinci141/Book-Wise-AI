import React, { useState } from 'react';
import BookInput from './components/BookInput';
import SummaryDisplay from './components/SummaryDisplay';
import RecommendationInput from './components/RecommendationInput';
import RecommendationDisplay from './components/RecommendationDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import { generateSummaryAndLearnings, generateRecommendations } from './services/geminiService';
import type { SummaryData, Recommendations } from './types';

function App() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isRecsLoading, setIsRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState<string | null>(null);

  const handleSummarySubmit = async (bookTitle: string) => {
    setIsSummaryLoading(true);
    setSummaryData(null);
    setSummaryError(null);
    try {
      const result = await generateSummaryAndLearnings(bookTitle);
      setSummaryData(result);
    } catch (error) {
      if (error instanceof Error) {
        setSummaryError(error.message);
      } else {
        setSummaryError('An unknown error occurred.');
      }
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleRecommendationSubmit = async (interest: string) => {
    setIsRecsLoading(true);
    setRecommendations(null);
    setRecsError(null);
    try {
      const result = await generateRecommendations(interest);
      setRecommendations(result);
    } catch (error) {
      if (error instanceof Error) {
        setRecsError(error.message);
      } else {
        setRecsError('An unknown error occurred.');
      }
    } finally {
      setIsRecsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
              AI Book Insights
            </span>
          </h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Get concise summaries, key learnings, and personalized learning paths for any book or topic. Powered by Gemini.
          </p>
        </header>

        <main className="space-y-16">
          {/* Summary Section */}
          <section>
            <Card>
              <h2 className="text-2xl font-bold text-sky-400 mb-1">Summarize a Book</h2>
              <p className="text-slate-400 mb-6">Enter a book title to get started.</p>
              <BookInput onSubmit={handleSummarySubmit} isLoading={isSummaryLoading} />
            </Card>
            {isSummaryLoading && <LoadingSpinner />}
            {summaryError && <Card className="mt-8 text-red-400 bg-red-900/30 border-red-700">{summaryError}</Card>}
            {summaryData && <SummaryDisplay summaryData={summaryData} />}
          </section>

          {/* Recommendation Section */}
          <section>
             <Card>
                <h2 className="text-2xl font-bold text-indigo-400 mb-1">Discover New Resources</h2>
                <p className="text-slate-400 mb-6">Enter a topic of interest to get curated recommendations.</p>
                <RecommendationInput onSubmit={handleRecommendationSubmit} isLoading={isRecsLoading} />
             </Card>
             {isRecsLoading && <LoadingSpinner />}
             {recsError && <Card className="mt-8 text-red-400 bg-red-900/30 border-red-700">{recsError}</Card>}
             {recommendations && <RecommendationDisplay recommendations={recommendations} />}
          </section>
        </main>

        <footer className="text-center mt-16 text-slate-500 text-sm">
          <p>Built with Gemini API & React</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
