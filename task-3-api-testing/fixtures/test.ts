import { expect, test as base } from '@playwright/test';
import { TasksApiClient } from '../clients/tasks-api.client';
import { Task } from '../models/task';
import { testData } from '../test-data/tasks';

interface ApiFixtures {
  tasksApi: TasksApiClient;
  existingTask: Task;
}

export const test = base.extend<ApiFixtures>({
  tasksApi: async ({ request }, use) => {
    await use(new TasksApiClient(request));
  },

  existingTask: async ({ tasksApi }, use) => {
    const response = await tasksApi.createTask(testData.newTask);
    expect(response.status()).toBe(201);
    const task: Task = await response.json();
    await use(task);
    await tasksApi.deleteTask(task.id);
  },
});

export { expect };
