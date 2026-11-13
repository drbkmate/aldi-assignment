import { getTestUser } from '../config/test-user';
import { expect, test } from '../fixtures/test';

const testData = {
  invalidPassword: 'invalid-password',
  incompleteForms: [
    { name: 'the form is empty', email: '', password: '' },
    { name: 'only the password is filled in', email: '', password: 'password123' },
    { name: 'only the email is filled in', email: 'user@example.com', password: '' },
  ],
};

test.describe('Login', () => {
  test.beforeEach(async ({ pm }) => {
    await pm.loginPage().goto();
  });

  test('signs in with valid credentials', async ({ page, pm }) => {
    const user = getTestUser();

    await pm.loginPage().login(user.email, user.password);

    await expect(page).toHaveURL('/');
    await expect(pm.navigationBar().profileLink(user.username)).toBeVisible();
    await expect(pm.navigationBar().signInLink()).toBeHidden();
  });

  test('shows an error for an invalid password', async ({ page, pm }) => {
    const user = getTestUser();

    await pm.loginPage().login(user.email, testData.invalidPassword);

    await expect(pm.loginPage().errorMessages()).toHaveText('email or password is invalid');
    await expect(page).toHaveURL('/login');
    await expect(pm.navigationBar().signInLink()).toBeVisible();
  });

  for (const { name, email, password } of testData.incompleteForms) {
    test(`cannot submit when ${name}`, async ({ page, pm }) => {
      await pm.loginPage().fillForm(email, password);

      await expect(pm.loginPage().signInButton()).toBeDisabled();
      await expect(page).toHaveURL('/login');
      await expect(pm.navigationBar().signInLink()).toBeVisible();
    });
  }
});
