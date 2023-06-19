module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!<rootDir>/src/domain/usecases/**'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': ['ts-jest',
      {
        isolatedModules: true
      }
    ]
  }
}
