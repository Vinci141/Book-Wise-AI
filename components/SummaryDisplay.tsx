import React, { useState } from 'react';
import type { SummaryData } from '../types';
import Card from './Card';
import { LightbulbIcon, ClipboardIcon, CheckIcon, ListIcon, GridIcon } from './IconComponents';

interface SummaryDisplayProps {
  data: SummaryData;
  bookTitle: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ data, bookTitle }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
  };

  return (
    <Card className="mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-sky-400 mb-4 capitalize">{bookTitle}</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-3 border-b-2 border-slate-700 pb-2">Summary</h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{data.summary}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
                <LightbulbIcon className="w-7 h-7 text-yellow-300" />
                Key Learnings
            </h3>
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    aria-label="List view"
                    title="List view"
                >
                    <ListIcon className="w-5 h-5" />
                </button>
                <button 
                    onClick={() => setViewMode('visual')} 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'visual' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                    aria-label="Visual view"
                    title="Visual view"
                >
                    <GridIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
        
        {viewMode === 'list' ? (
          <ul className="space-y-4">
            {data.keyLearnings.map((item, index) => (
              <li key={index} className="flex items-start gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                <span className="text-2xl mt-1 flex-shrink-0">{item.visual}</span>
                <p className="text-slate-300 flex-grow">{item.learning}</p>
                <button 
                  onClick={() => handleCopy(item.learning, index)}
                  className="ml-4 p-2 rounded-full hover:bg-slate-700 transition-colors duration-200 flex-shrink-0"
                  aria-label="Copy key learning to clipboard"
                >
                  {copiedIndex === index ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.keyLearnings.map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center gap-4 p-6 bg-slate-900/50 rounded-lg border border-slate-700/50 transform transition-transform hover:scale-105">
                      <span className="text-5xl mb-2">{item.visual}</span>
                      <p className="text-slate-300 flex-grow text-sm">{item.learning}</p>
                      <button 
                          onClick={() => handleCopy(item.learning, index)}
                          className="mt-4 p-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
                          aria-label="Copy key learning to clipboard"
                      >
                          {copiedIndex === index ? (
                              <CheckIcon className="w-5 h-5 text-green-400" />
                          ) : (
                              <ClipboardIcon className="w-5 h-5 text-slate-400" />
                          )}
                      </button>
                  </div>
              ))}
          </div>
        )}

      </div>
    </Card>
  );
};

export default SummaryDisplay;