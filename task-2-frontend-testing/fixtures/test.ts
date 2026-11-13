import { test as base } from '@playwright/test';
import { PageManager } from '../pages/page-manager';

interface Fixtures {
  pm: PageManager;
}

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';
