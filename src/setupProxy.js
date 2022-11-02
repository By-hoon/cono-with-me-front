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
};
