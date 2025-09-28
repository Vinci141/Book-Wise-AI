
export interface KeyLearning {
  learning: string;
  visual: string; // Emoji or simple visual concept
}

export interface SummaryData {
  summary: string;
  keyLearnings: KeyLearning[];
}

export interface RecommendationItem {
  title: string;
  description: string;
}

export interface Recommendations {
  books: RecommendationItem[];
  websites: RecommendationItem[];
  courses: RecommendationItem[];
}
