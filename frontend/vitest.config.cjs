const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.test.{js,jsx,ts,tsx}', 'src/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['src/setupTests.js']
  }
})
