
import React from 'react';
import type { Recommendations, RecommendationItem } from '../types';
import Card from './Card';
import { BookIcon, WebIcon, CourseIcon } from './IconComponents';

interface RecommendationDisplayProps {
  data: Recommendations;
}

const RecommendationSection: React.FC<{ title: string; items: RecommendationItem[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-sky-400">
            {icon}
            {title}
        </h3>
        <ul className="space-y-4">
            {items.map((item, index) => (
                <li key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 transform transition-transform hover:scale-[1.02] hover:border-sky-500/50">
                    <h4 className="font-bold text-slate-100">{item.title}</h4>
                    <p className="text-slate-400">{item.description}</p>
                </li>
            ))}
        </ul>
    </div>
);


const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ data }) => {
  return (
    <Card className="mt-8 animate-fade-in">
        <div className="grid md:grid-cols-3 gap-8">
            <RecommendationSection title="Books" items={data.books} icon={<BookIcon className="w-7 h-7" />} />
            <RecommendationSection title="Websites" items={data.websites} icon={<WebIcon className="w-7 h-7" />} />
            <RecommendationSection title="Courses" items={data.courses} icon={<CourseIcon className="w-7 h-7" />} />
        </div>
    </Card>
  );
};

export default RecommendationDisplay;
