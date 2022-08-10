// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/proxy',
        createProxyMiddleware({
            target: 'https://rlp-proxy.herokuapp.com',
            changeOrigin: true,
        })
    );
};