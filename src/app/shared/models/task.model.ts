export interface Task {
  id: string;
  title: string;
  description?: string;
  energy: 'low' | 'medium' | 'high';
  avoidance: number; // 1–5 scale
  dopamineHit: boolean;
  tags?: string[];
  completed: boolean;
  createdAt: Date;
}
