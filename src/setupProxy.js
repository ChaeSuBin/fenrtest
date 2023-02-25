const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  //app.use(proxy("/hotpepper/gourmet/v1", { target: "http://webservice.recruit.co.jp"}));
  app.use(
    "/gourmet",
    createProxyMiddleware({
      target: "http://webservice.recruit.co.jp/hotpepper",
      changeOrigin: true,
    })
  );
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "http://webservice.recruit.co.jp/hotpepper",
      changeOrigin: true,
    })
  );
};