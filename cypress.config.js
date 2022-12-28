const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://dev.app.urevited.com',
  },
  env: {
    username: 'marko.petricevic+admin@servalit.com',
    password: 'Test12345!'
  },
})
