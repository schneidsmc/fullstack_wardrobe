// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ["**/server/**/*.test.js"], // Use 'jsdom' for React components instead of 'node'
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest" // Transforms JavaScript and TypeScript files using babel-jest
    },
    setupFiles: ["<rootDir>/jest.setup.js"], // Specifies the setup file
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy" // Mocks CSS imports
    }, // Add this line
};

