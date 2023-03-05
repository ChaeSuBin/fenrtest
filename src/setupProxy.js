const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  //app.use(proxy("/hotpepper/gourmet/v1", { target: "http://webservice.recruit.co.jp"}));
  app.use(
    "/hotpepper",
    createProxyMiddleware({
      target: "https://webservice.recruit.co.jp",
      changeOrigin: true,
    })
  );
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://webservice.recruit.co.jp",
      changeOrigin: true,
    })
  );
};