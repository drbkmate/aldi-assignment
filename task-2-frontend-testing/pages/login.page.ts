import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
  }

  signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  errorMessages(): Locator {
    return this.page.locator('.error-messages li');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async fillForm(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillForm(email, password);
    await this.signInButton().click();
  }
}
