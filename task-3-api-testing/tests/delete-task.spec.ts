import { expect, test } from '../fixtures/test';
import { testData } from '../test-data/tasks';

test.describe('DELETE /tasks/{id}', () => {
  test('deletes an existing task', async ({ tasksApi, existingTask }) => {
    const response = await tasksApi.deleteTask(existingTask.id);

    expect(response.status()).toBe(204);
    const getResponse = await tasksApi.getTask(existingTask.id);
    expect(getResponse.status()).toBe(404);
  });

  test('returns 404 for an unknown id', async ({ tasksApi }) => {
    const response = await tasksApi.deleteTask(testData.unknownTaskId);

    expect(response.status()).toBe(404);
  });
});
