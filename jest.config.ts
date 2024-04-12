import nextJest from 'next/jest.js';

import type { Config } from 'jest';

const createNextJestConfig = nextJest({
  dir: './'
});

const config: Config = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // setupFiles: ['<rootDir>/src/__mocks__/.env.local.js'],
  verbose: false,

  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  modulePaths: ['<rootDir>']
};

const jestConfig = async (): Promise<Config> => {
  const nextJestConfig = await createNextJestConfig(config)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
      ...nextJestConfig.moduleNameMapper
    }
  };
};

// module.exports = jestConfig
export default jestConfig;
