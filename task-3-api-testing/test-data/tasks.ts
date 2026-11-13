export const testData = {
  unknownTaskId: 'unknown-task-id',
  newTask: { title: 'Buy milk', description: '2 liters', completed: false },
  updatedTask: { title: 'Buy bread', description: '1 loaf', completed: true },
  tasksWithMissingField: [
    { missingField: 'title', body: { description: '2 liters', completed: false } },
    { missingField: 'description', body: { title: 'Buy milk', completed: false } },
    { missingField: 'completed', body: { title: 'Buy milk', description: '2 liters' } },
  ],
};
