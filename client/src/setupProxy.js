const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://nobles-and-barnes-api.onrender.com',
      changeOrigin: true,
    })
  );
};