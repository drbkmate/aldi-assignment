# QA Engineer Homework Assignment

| Task | Folder |
| --- | --- |
| Task 1: Manual Testing | [task-1-manual-testing](task-1-manual-testing) |
| Task 2: Frontend Testing | [task-2-frontend-testing](task-2-frontend-testing) |
| Task 3: API Testing | [task-3-api-testing](task-3-api-testing) |
| Bonus Questions | [bonus-questions.md](bonus-questions.md) |

## Task 1: Manual Testing

[ALDI_Add_to_Shopping_List_Test_Design.xlsx](task-1-manual-testing/ALDI_Add_to_Shopping_List_Test_Design.xlsx) contains the test case fields, three test cases for the "Add to Shopping List" feature of aldi.us, the bug report fields and a sample bug report. Screenshots for the bug report are in [attachments](task-1-manual-testing/attachments).

## Task 2: Frontend Testing

End-to-end tests with Playwright and TypeScript for the login feature of [Conduit](https://conduit.bondaracademy.com), a public demo application built with Angular 18.

| Test | Expected result |
| --- | --- |
| Signs in with valid credentials | User is redirected to the home page and the navigation bar shows the username instead of "Sign in". |
| Shows an error for an invalid password | Error "email or password is invalid" is shown, the user stays on the login page and is not signed in. |
| Cannot submit when the form is empty | "Sign in" button is disabled, the user stays on the login page and is not signed in. |
| Cannot submit when only the password is filled in | "Sign in" button is disabled, the user stays on the login page and is not signed in. |
| Cannot submit when only the email is filled in | "Sign in" button is disabled, the user stays on the login page and is not signed in. |

Conduit validates the form in the browser: the "Sign in" button stays disabled until both fields are filled in, so these cases never reach the server and show no error message.

```
task-2-frontend-testing/
  pages/login.page.ts                      Page object for the login form
  pages/page-manager.ts                    Creates the page objects and gives access to them
  components/navigation-bar.component.ts   Page object for the navigation bar
  fixtures/test.ts                         Provides the page manager to the tests as a fixture
  config/test-user.ts                      Reads the test user from environment variables
  tests/login.spec.ts                      Login tests
```

## Task 3: API Testing

API tests with Playwright and TypeScript for a RESTful task management API.

```
task-3-api-testing/
  clients/tasks-api.client.ts   Sends the requests to the /tasks endpoints
  models/task.ts                Task request and response types
  test-data/tasks.ts            Test data
  fixtures/test.ts              Provides the API client and a pre-created task that is deleted after the test
  tests/                        One spec file per endpoint
```

### Expected status codes and responses

A task is exchanged as JSON:

```json
{
  "id": "8f14e45f",
  "title": "Buy milk",
  "description": "2 liters",
  "completed": false
}
```

| Endpoint | Request body | Success | Error |
| --- | --- | --- | --- |
| `POST /tasks` | `title`, `description`, `completed` | `201 Created`, the created task with a generated `id` (some APIs return `200 OK` instead) | `400 Bad Request` if any field is missing |
| `GET /tasks/{id}` | none | `200 OK`, the task | `404 Not Found` if the task does not exist |
| `PUT /tasks/{id}` | `title`, `description`, `completed` | `200 OK`, the updated task | `400 Bad Request` if any field is missing, `404 Not Found` if the task does not exist |
| `DELETE /tasks/{id}` | none | `204 No Content`, empty body (some APIs return `200 OK` instead); a following `GET` returns `404` | `404 Not Found` if the task does not exist |

All three fields are required in the request body, so `POST` and `PUT` have one test for each missing field.

### Authentication

The assignment does not mention authentication, so the tests send no credentials. If the API required a token, it would be sent as an `Authorization` header through `extraHTTPHeaders` in `playwright.config.ts`, and the tests would also check `401 Unauthorized` for a missing or invalid token.

## Setup

1. Install [Node.js](https://nodejs.org) 20 or newer.
2. Install the dependencies:

   ```bash
   npm ci
   ```

3. Install the Chromium browser used by Playwright:

   ```bash
   npx playwright install --with-deps chromium
   ```

4. Register a test user at https://conduit.bondaracademy.com/register.
5. Create the `.env` file and fill in the test user's credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Value |
   | --- | --- |
   | `CONDUIT_USER_EMAIL` | Email of the test user |
   | `CONDUIT_USER_PASSWORD` | Password of the test user |
   | `CONDUIT_USERNAME` | Username of the test user |
   | `TASKS_API_BASE_URL` | Base URL of the task management API under test, e.g. `http://localhost:3000` |

## Running the tests

```bash
npm test               # all tests, headless
npm run test:frontend  # Task 2 tests only
npm run test:api       # Task 3 tests only
npm run test:headed    # Task 2 tests with a visible browser
npm run report         # open the HTML report of the last run
```

The assignment does not provide a real task API, so the Task 3 tests are written against an imaginary one and running them results in errors. With an API that has the endpoints described in Task 3 and its URL set in `TASKS_API_BASE_URL`, they would work.

## Continuous integration

[playwright.yml](.github/workflows/playwright.yml) runs the Task 2 tests on GitHub Actions after each push. The test user's credentials are read from the repository secrets `CONDUIT_USER_EMAIL`, `CONDUIT_USER_PASSWORD` and `CONDUIT_USERNAME` (Settings > Secrets and variables > Actions).
