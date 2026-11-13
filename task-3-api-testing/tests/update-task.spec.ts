import { expect, test } from '../fixtures/test';
import { testData } from '../test-data/tasks';

test.describe('PUT /tasks/{id}', () => {
  test('updates an existing task and returns it', async ({ tasksApi, existingTask }) => {
    const response = await tasksApi.updateTask(existingTask.id, testData.updatedTask);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ id: existingTask.id, ...testData.updatedTask });
  });

  for (const { missingField, body } of testData.tasksWithMissingField) {
    test(`returns 400 when ${missingField} is missing`, async ({ tasksApi, existingTask }) => {
      const response = await tasksApi.updateTask(existingTask.id, body);

      expect(response.status()).toBe(400);
    });
  }

  test('returns 404 for an unknown id', async ({ tasksApi }) => {
    const response = await tasksApi.updateTask(testData.unknownTaskId, testData.updatedTask);

    expect(response.status()).toBe(404);
  });
});
