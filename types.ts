
export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  description: string[];
}

export interface WorkItem {
  category: string;
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Artwork {
  src: string;
  alt: string;
  category: string;
  title: string;
  link: string;
}