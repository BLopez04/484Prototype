export type Screen = 'home' | 'game' | 'add-task' | 'settings';

export interface Task {
  id?: number;
  title: string;
  time: string;
  type: string;
  steps: string[];
}

