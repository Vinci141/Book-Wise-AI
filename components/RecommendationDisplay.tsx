import React from 'react';
import Card from './Card';
import { Recommendations, RecommendationItem } from '../types';
import { BookOpenIcon, GlobeIcon, AcademicCapIcon } from './IconComponents';

interface RecommendationDisplayProps {
  recommendations: Recommendations;
}

const RecommendationList: React.FC<{
  title: string;
  items: RecommendationItem[];
  icon: React.ReactNode;
}> = ({ title, items, icon }) => (
  <div>
    <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-200 border-b-2 border-slate-700 pb-2 mb-4">
      {icon}
      {title}
    </h3>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
          <p className="font-semibold text-indigo-400">{item.title}</p>
          <p className="text-slate-400 text-sm mt-1">{item.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendations }) => {
  return (
    <Card className="mt-8 animate-fade-in">
      <h2 className="text-3xl font-bold text-indigo-400 mb-6">
        Further Learning Recommendations
      </h2>
      <div className="space-y-8">
        <RecommendationList
          title="Books"
          items={recommendations.books}
          icon={<BookOpenIcon className="w-6 h-6 text-indigo-400" />}
        />
        <RecommendationList
          title="Websites & Blogs"
          items={recommendations.websites}
          icon={<GlobeIcon className="w-6 h-6 text-indigo-400" />}
        />
        <RecommendationList
          title="Online Courses"
          items={recommendations.courses}
          icon={<AcademicCapIcon className="w-6 h-6 text-indigo-400" />}
        />
      </div>
    </Card>
  );
};

export default RecommendationDisplay;
