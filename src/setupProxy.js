const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/maniadb", {
      target: "http://www.maniadb.com/api/search",
      pathRewrite: {
        "^/maniadb": "",
      },
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/gossing", {
      target: "http://www.gossing-server.com:8081/api/v1",
      pathRewrite: {
        "^/gossing": "",
      },
      changeOrigin: true,
    })
  );
};
