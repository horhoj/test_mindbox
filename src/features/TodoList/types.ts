export interface Todo {
  id: string;
  text: string;
  isComplete: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
