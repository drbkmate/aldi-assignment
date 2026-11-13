import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  private readonly root: Locator;

  constructor(page: Page) {
    this.root = page.locator('nav');
  }

  signInLink(): Locator {
    return this.root.getByRole('link', { name: 'Sign in' });
  }

  profileLink(username: string): Locator {
    return this.root.getByRole('link', { name: username });
  }
}
