module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    collectCoverage: true, // Enable coverage collection
    coverageDirectory: 'coverage', // Directory to store coverage reports
    coverageReporters: ['text', 'lcov', 'json'], // Formats for coverage reports
    collectCoverageFrom: [
      'src/**/*.ts', // Include all TypeScript files in the src/ directory
      '!src/**/*.d.ts', // Exclude type definition files
      '!src/index.ts', // Exclude specific files if needed
    ],
    verbose: true, 
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // 👈 Add this line
  };

  