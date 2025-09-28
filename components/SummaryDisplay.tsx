import React from 'react';
import Card from './Card';
import { SummaryData, KeyLearning } from '../types';

interface SummaryDisplayProps {
  summaryData: SummaryData;
}

const KeyLearningItem: React.FC<{ item: KeyLearning }> = ({ item }) => (
  <li className="flex items-start gap-4">
    <span className="text-2xl mt-1">{item.visual}</span>
    <p className="text-slate-300">{item.learning}</p>
  </li>
);

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summaryData }) => {
  return (
    <Card className="mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-sky-400 mb-2">
        Summary & Key Learnings
      </h2>
      <p className="text-lg text-slate-400 mb-6 font-medium">
        by {summaryData.author}
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b-2 border-slate-700 pb-2 mb-4">
            Summary
          </h3>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            {summaryData.summary}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-200 border-b-2 border-slate-700 pb-2 mb-4">
            Key Learnings
          </h3>
          <ul className="space-y-4">
            {summaryData.keyLearnings.map((learning, index) => (
              <KeyLearningItem key={index} item={learning} />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default SummaryDisplay;
