/** @type {import('ts-jest').JestConfigWithTsJest} */
export const testEnvironment = "node";
export const transform = {
  "^.+\\.tsx?$": ["ts-jest", {}], // Escape the dot with double backslash
};
