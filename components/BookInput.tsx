
import React, { useState } from 'react';
import { SparklesIcon } from './IconComponents';

interface BookInputProps {
  onSubmit: (bookTitle: string) => void;
  isLoading: boolean;
}

const BookInput: React.FC<BookInputProps> = ({ onSubmit, isLoading }) => {
  const [bookTitle, setBookTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookTitle.trim()) {
      onSubmit(bookTitle.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        placeholder="Enter a book title (e.g., 'Sapiens: A Brief History of Humankind')"
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !bookTitle.trim()}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <SparklesIcon className="w-5 h-5" />
        <span>{isLoading ? 'Analyzing...' : 'Summarize'}</span>
      </button>
    </form>
  );
};

export default BookInput;
