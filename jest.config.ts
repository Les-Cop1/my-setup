import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  setupFilesAfterEnv: ['<rootDir>/src/config/setupTests.ts', '<rootDir>/src/config/reactTestingLibrary.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@components': '<rootDir>/src/components',
    '@helpers': '<rootDir>/src/helpers',
    '@types': '<rootDir>/src/types',
    '@api': '<rootDir>/src/api',
    '@contexts': '<rootDir>/src/contexts',
    '@hooks': '<rootDir>/src/hooks',
    '@pages': '<rootDir>/src/pages',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
  },
  testEnvironment: 'jsdom',
  snapshotResolver: '<rootDir>/src/config/snapshotResolver.js',
  modulePathIgnorePatterns: ['node_modules', 'dist', '.jest-test-results.json'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'text'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/config/',
    '<rootDir>/src/hooks/',
    '<rootDir>/src/contexts/',
    '<rootDir>/src/api/',
  ],
}

export default config
