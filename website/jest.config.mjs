import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Next.jsのアプリケーションへのパスを指定
  dir: './',
});

// Jestの設定
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // パスエイリアスが必要な場合に設定
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

export default createJestConfig(customJestConfig);
