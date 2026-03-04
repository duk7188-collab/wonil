export interface Post {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface Settings {
  primaryColor?: string;
  companyName?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}
