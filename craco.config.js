/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require('craco-alias')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  jest: {
    testEnvironment: 'node',
    verbose: true,
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    setupTestFrameworkScriptFile: './setupTests.ts',
    testMatch: ['**/*.test.ts'],
  },
}
