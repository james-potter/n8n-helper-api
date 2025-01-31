// jest.setup.js

beforeAll(() => {
  jest.spyOn(global.console, 'log').mockImplementation(() => {}); // Suppress logs
  jest.spyOn(global.console, 'warn').mockImplementation(() => {}); // Suppress warnings
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore original console methods after tests
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason);
});
