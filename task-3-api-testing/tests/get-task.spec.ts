import { expect, test } from '../fixtures/test';
import { testData } from '../test-data/tasks';

test.describe('GET /tasks/{id}', () => {
  test('returns an existing task', async ({ tasksApi, existingTask }) => {
    const response = await tasksApi.getTask(existingTask.id);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(existingTask);
  });

  test('returns 404 for an unknown id', async ({ tasksApi }) => {
    const response = await tasksApi.getTask(testData.unknownTaskId);

    expect(response.status()).toBe(404);
  });
});
