module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json'],

    transform: {
        '^.+\\.js?$': 'babel-jest',
    },

    transformIgnorePatterns: ['node_modules/(?!(@hckrnews|@trojs|node-fetch|fetch-blob|data-uri-to-buffer|formdata-polyfill)/)'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    testMatch: ['**/__tests__/*.js'],

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    testResultsProcessor: 'jest-sonar-reporter',
    reporters: [
      'default',
      [ 'jest-junit', {
        outputDirectory: 'test-reports',
        outputName: 'jest-junit.xml',
      } ]
    ],
};
