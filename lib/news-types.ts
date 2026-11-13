// Browser-safe types and filters for first-party technology news.
export const newsCategories = ["All", "AI", "Development", "Security", "Cloud", "Technology"] as const;
export type NewsCategory = Exclude<(typeof newsCategories)[number], "All">;

export type NewsItem = {
  slug: string;
  title: string;
  description: string;
  author: string;
  category: NewsCategory;
  date: string;
  tags: string[];
  featured: boolean;
  readingMinutes: number;
};
