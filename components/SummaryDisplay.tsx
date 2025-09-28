
import React from 'react';
import type { SummaryData } from '../types';
import Card from './Card';
import { LightbulbIcon } from './IconComponents';

interface SummaryDisplayProps {
  data: SummaryData;
  bookTitle: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ data, bookTitle }) => {
  return (
    <Card className="mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-sky-400 mb-4 capitalize">{bookTitle}</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-3 border-b-2 border-slate-700 pb-2">Summary</h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{data.summary}</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
          <LightbulbIcon className="w-7 h-7 text-yellow-300" />
          Key Learnings
        </h3>
        <ul className="space-y-4">
          {data.keyLearnings.map((item, index) => (
            <li key={index} className="flex items-start gap-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <span className="text-2xl mt-1">{item.visual}</span>
              <p className="text-slate-300">{item.learning}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SummaryDisplay;
