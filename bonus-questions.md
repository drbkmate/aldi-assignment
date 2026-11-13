# Bonus Questions

## Docker

### What is Docker?

Docker is a tool that packages an application and everything it needs to run into an image. A started image runs as a container, which behaves the same way on any device or a CI server.

### How is it useful for a QA engineer?

- The tests always run in the same environment, with the same Node.js, Playwright and browser versions, locally and in CI as well.
- The browsers are already installed in the image, so the automated tests can be run on any browser without installing it on the machine.
- Containers are isolated from each other, so more test suites can run at the same time.

### Example

Instead of installing the browsers on the CI machine, I run the test job inside the official Playwright Docker image, which already has the browsers and everything they need. For example in GitHub Actions:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container: mcr.microsoft.com/playwright:v1.65.0-noble
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:frontend
```

The image version is the same as the `@playwright/test` version in `package.json`, so the browsers match the test runner. This repository's [playwright.yml](.github/workflows/playwright.yml) works the same way.

## CI Integration

I have used GitLab CI and GitHub Actions. In GitLab the pipeline is configured in a `.gitlab-ci.yml` file in the root of the repository. If the project doesn't have one yet, I create it, add a `test` stage and configure it to run after each push or on each merge request. The example below runs it on each merge request, inside the official Playwright Docker image like in the Docker answer:

```yaml
stages:
  - test

playwright-tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.65.0-noble
  script:
    - npm ci
    - npm run test:frontend
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

The test user's credentials are stored as CI/CD variables in the GitLab project settings, so they are not in the repository. If a test fails, the pipeline fails too, and with the "Pipelines must succeed" merge setting the merge request can't be merged until it is fixed.

This repository uses GitHub Actions: [playwright.yml](.github/workflows/playwright.yml) runs the Task 2 tests after each push.
