export interface TaskInput {
  title: string;
  description: string;
  completed: boolean;
}

export interface Task extends TaskInput {
  id: string;
}
