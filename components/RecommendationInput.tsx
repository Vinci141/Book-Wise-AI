
import React, { useState } from 'react';
import { SparklesIcon } from './IconComponents';

interface RecommendationInputProps {
  onSubmit: (interest: string) => void;
  isLoading: boolean;
}

const RecommendationInput: React.FC<RecommendationInputProps> = ({ onSubmit, isLoading }) => {
  const [interest, setInterest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interest.trim()) {
      onSubmit(interest.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        placeholder="Enter a subject you're interested in (e.g., 'Quantum Physics')"
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !interest.trim()}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <SparklesIcon className="w-5 h-5" />
        <span>{isLoading ? 'Searching...' : 'Recommend'}</span>
      </button>
    </form>
  );
};

export default RecommendationInput;
