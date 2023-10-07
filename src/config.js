/*
 * @Author: 老范
 * @Date: 2023-10-07 10:10:41
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-07 14:43:25
 * @Description: 请填写简介
 */
(function (v, p) {
  window[v] = p;
})("getWinConfig", function () {
  delete window.getWinConfig;
  /**
   * 外置配置参数
   */
  /*
   * service: 服务器请求地址
   */
  return {
    server: "http://192.168.2.206:8818/",
  };
});
// (function (window) {
//   window.__env = window.__env || {};
//   console.log(123);
//   // 生产环境
//   window.__env = {
//     production: false,
//     requestPath: "http://192.168.2.206:8848/",
//   };
// })(this);
