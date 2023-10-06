const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || '';
}

export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const isDevEnv = NODE_ENV === 'development';

export const isProdEnv = NODE_ENV === 'production';

export const API_URL = isDevEnv ? '/api' : '';
