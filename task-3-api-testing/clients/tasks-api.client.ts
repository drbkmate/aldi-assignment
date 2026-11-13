import { APIRequestContext, APIResponse } from '@playwright/test';
import { TaskInput } from '../models/task';

export class TasksApiClient {
  constructor(private readonly request: APIRequestContext) {}

  createTask(task: Partial<TaskInput>): Promise<APIResponse> {
    return this.request.post('/tasks', { data: task });
  }

  getTask(id: string): Promise<APIResponse> {
    return this.request.get(`/tasks/${id}`);
  }

  updateTask(id: string, task: Partial<TaskInput>): Promise<APIResponse> {
    return this.request.put(`/tasks/${id}`, { data: task });
  }

  deleteTask(id: string): Promise<APIResponse> {
    return this.request.delete(`/tasks/${id}`);
  }
}
