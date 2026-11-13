import { Page } from '@playwright/test';
import { NavigationBar } from '../components/navigation-bar.component';
import { LoginPage } from './login.page';

export class PageManager {
  constructor(private readonly page: Page) {}

  loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  navigationBar(): NavigationBar {
    return new NavigationBar(this.page);
  }
}
