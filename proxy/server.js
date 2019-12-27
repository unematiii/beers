const apicache = require("apicache");
const express = require("express");
const proxy = require("http-proxy-middleware");

const API_KEY = '659d5c6b8f3d2447f090119e48202fdb';
const CACHE_TIMEOUT = '1 hour';
const PORT = 3334;
const PROXY_URL = 'https://api.brewerydb.com/v2/';

const app = express();

const apiMiddleware = (key) => (req, res, next) => {
    req.originalUrl = `${req.originalUrl}&key=${key}`;
    next();
};

const proxyMiddleware = (url) => proxy('/*', {
    target: url,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyRes: function (proxyRes) {
        // CORS
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
});

app.use('*', 
    apicache.middleware(CACHE_TIMEOUT), 
    apiMiddleware(API_KEY), 
    proxyMiddleware(PROXY_URL)
);

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}.`);
});
