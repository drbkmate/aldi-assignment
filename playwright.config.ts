import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'frontend',
      testDir: './task-2-frontend-testing/tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://conduit.bondaracademy.com',
      },
    },
    {
      name: 'api',
      testDir: './task-3-api-testing/tests',
      use: {
        baseURL: process.env.TASKS_API_BASE_URL,
      },
    },
  ],
});
