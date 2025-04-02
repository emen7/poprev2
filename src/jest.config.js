/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(unified|unist|remark|rehype|mdast|hast|bail|trough|vfile|micromark|decode-named-character-reference|character-entities|property-information|space-separated-tokens|comma-separated-tokens|estree-util-.*|devlop|zwitch|web-namespaces)/)',
  ],
};