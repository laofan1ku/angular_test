/*
 * @Author: 老范
 * @Date: 2023-10-07 10:10:41
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-13 14:00:37
 * @Description: 请填写简介
 */
(function (v, p) {
  window[v] = p;
})("getWinConfig", function () {
  delete window.getWinConfig;
  return {
    server: "http://192.168.2.206:8848/",
  };
});
 