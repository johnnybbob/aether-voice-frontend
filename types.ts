import { LucideIcon } from 'lucide-react';

export interface AgentStats {
  users: string;
  rating: string;
}

export interface Agent {
  id: string;
  name: string;
  tagline: string;
  avatar: string;
  image3d: string;
  tags: string[];
  category: string;
  stats: AgentStats;
  desc: string;
  prompts: string;
}

export interface Video {
  id: number;
  title: string;
  author: string;
  views: string;
  cover: string;
  duration?: string;
  agentId?: string;
}

export interface LiveStream {
  id: number;
  title: string;
  host: string;
  viewers: string;
  cover: string;
  tag: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  author: string;
  replies: string;
  likes: string;
  tag: string;
}

export interface Banner {
  id: string;
  tag: string;
  title: string;
  desc: string;
  bgGradient: string;
  decorativeCircle: string;
  posterTitle: string;
  posterSubtitle: string;
  themeColor: string;
}

export interface BusinessSolution {
  id: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  scenario: string;
  tech: string;
  archType: 'customer_service' | 'sales_assistant' | 'internal_training';
}

export interface Category {
  id: string;
  label: string;
}