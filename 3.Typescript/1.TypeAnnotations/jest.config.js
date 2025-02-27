/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}]
  },
  collectCoverage: true,                         // Enable coverage collection
  collectCoverageFrom: ["src/**/*.ts"],          // Include all TypeScript files in src
  coveragePathIgnorePatterns: ["/node_modules/"], // Ignore node_modules
};
