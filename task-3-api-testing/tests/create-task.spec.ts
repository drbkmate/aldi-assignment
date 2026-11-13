import { expect, test } from '../fixtures/test';
import { Task } from '../models/task';
import { testData } from '../test-data/tasks';

test.describe('POST /tasks', () => {
  test('creates a task and returns it with a generated id', async ({ tasksApi }) => {
    const response = await tasksApi.createTask(testData.newTask);

    expect(response.status()).toBe(201);
    const task: Task = await response.json();
    expect(task).toEqual({ id: expect.any(String), ...testData.newTask });
    await tasksApi.deleteTask(task.id);
  });

  for (const { missingField, body } of testData.tasksWithMissingField) {
    test(`returns 400 when ${missingField} is missing`, async ({ tasksApi }) => {
      const response = await tasksApi.createTask(body);

      expect(response.status()).toBe(400);
    });
  }
});
