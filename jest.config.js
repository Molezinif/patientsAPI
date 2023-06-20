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
    '!<rootDir>/src/domain/usecases/**',
    '!<rootDir>/src/main/adapters/expressRouteAdapter.ts'
  ],
  coverageDirectory: 'coverage',
  transform: {
    '.+\\.ts$': ['ts-jest',
      {
        isolatedModules: true
      }
    ]
  },
  setupFilesAfterEnv: ['<rootDir>/tests/infra/db/prisma/singleton.ts']
}
