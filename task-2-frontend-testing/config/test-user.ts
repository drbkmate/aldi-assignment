export interface TestUser {
  email: string;
  password: string;
  username: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export function getTestUser(): TestUser {
  return {
    email: requireEnv('CONDUIT_USER_EMAIL'),
    password: requireEnv('CONDUIT_USER_PASSWORD'),
    username: requireEnv('CONDUIT_USERNAME'),
  };
}
