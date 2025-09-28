
import React, { useState, useCallback } from 'react';
import { generateSummaryAndLearnings, generateRecommendations } from './services/geminiService';
import type { SummaryData, Recommendations } from './types';
import BookInput from './components/BookInput';
import SummaryDisplay from './components/SummaryDisplay';
import RecommendationInput from './components/RecommendationInput';
import RecommendationDisplay from './components/RecommendationDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import { BookIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [currentBookTitle, setCurrentBookTitle] = useState<string>('');
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);
  
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async (bookTitle: string) => {
    setIsLoadingSummary(true);
    setError(null);
    setSummary(null);
    setCurrentBookTitle(bookTitle);
    try {
      const result = await generateSummaryAndLearnings(bookTitle);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingSummary(false);
    }
  }, []);

  const handleRecommend = useCallback(async (interest: string) => {
    setIsLoadingRecs(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await generateRecommendations(interest);
      setRecommendations(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingRecs(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-slate-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-4">
            <BookIcon className="w-12 h-12 text-sky-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">
              BookWise AI
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Unlock knowledge from any book. Get concise summaries, key insights, and personalized paths for your learning journey.
          </p>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Summarizer Section */}
        <section className="mb-16">
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-center">1. Summarize a Book</h2>
            <BookInput onSubmit={handleSummarize} isLoading={isLoadingSummary} />
          </Card>
          {isLoadingSummary && <LoadingSpinner />}
          {summary && <SummaryDisplay data={summary} bookTitle={currentBookTitle} />}
        </section>

        {/* Recommendations Section */}
        <section>
          <Card>
            <h2 className="text-2xl font-semibold mb-4 text-center">2. Discover Your Next Step</h2>
            <p className="text-slate-400 text-center mb-6">Tell us what you're passionate about, and we'll curate a list of resources to fuel your curiosity.</p>
            <RecommendationInput onSubmit={handleRecommend} isLoading={isLoadingRecs} />
          </Card>
          {isLoadingRecs && <LoadingSpinner />}
          {recommendations && <RecommendationDisplay data={recommendations} />}
        </section>
        
        <footer className="text-center mt-16 text-slate-500">
            <p>Powered by Google Gemini</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
