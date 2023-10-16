/*
 * @Author: 老范
 * @Date: 2023-10-16 13:56:57
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 16:46:28
 * @Description: 请填写简介
 */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// 获取环境配置项目
// import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
// import { storage } from '../utils';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  // private baseUrl: string;
  constructor(private readonly router: Router) {
    // this.baseUrl = environment.baseUrl;
  }
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(
    //   '🚀 ~ file: header.interceptor.ts:32 ~ HeaderInterceptor ~ req:',
    //   req
    // );
    // 处理url地址的问题
    // const url = this._url(req.url);
    // if (this.ignoreToken(req.url)) {
    //   req = req.clone({
    //     url,
    //     headers: req.headers.set(
    //       'Content-Type',
    //       'application/json; charset=UTF-8'
    //     ),
    //   });
    // } else {
    // 如果本地获取不到token就重定向到登录页面
    // if (!storage.getItem(X_USER_TOKEN)) {
    //   console.log('没token跳转到登录页面');
    //   this.router.navigateByUrl('/login');
    //   req = req.clone({
    //     url,
    //     headers: req.headers.set(
    //       'Content-Type',
    //       'application/json; charset=UTF-8'
    //     ),
    //   });
    // } else {
    //   // 设置请求头
    //   req = req.clone({
    //     url,
    //     headers: req.headers
    //       .set('Content-Type', 'application/json; charset=UTF-8')
    //       .set(X_USER_TOKEN, JSON.parse(storage.getItem(X_USER_TOKEN)))
    //       .set(X_ORG_ID, '2'),
    //   });
    // }
    // }
    return next.handle(req);
  }

  /**
   * 忽视token的方法
   * @param url 当前的url地址
   */
  // public ignoreToken(url: string): boolean {
  //   const ignoreToken: string[] = environment.ignoreToken;
  //   let currentUrl = url
  //     .split('/')
  //     .filter((item) => Boolean(item))
  //     .join('/');
  //   currentUrl =
  //     currentUrl.lastIndexOf('?') != -1
  //       ? currentUrl.substring(0, currentUrl.lastIndexOf('?'))
  //       : currentUrl;
  //   if (ignoreToken.includes(currentUrl)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // private _url(url: string): string {
  //   if (url.startsWith('http') || url.startsWith('https')) {
  //     return url;
  //   } else {
  //     /**
  //      * 处理url拼接问题
  //      * 1.如果baseUrl带了/结尾,url也带了/开头就截取一个
  //      * 2.如果baseUrl不带/结尾,url也不带/结尾就加一个
  //      * 3.如果都不是就直接返回
  //      */
  //     if (/.*?\/$/.test(this.baseUrl) && /^\/.*/.test(url)) {
  //       return `${this.baseUrl}${url.substring(1, url.length)}`;
  //     } else if (!/.*?\/$/.test(this.baseUrl) && !/^\/.*/.test(url)) {
  //       return `${this.baseUrl}/${url}`;
  //     } else {
  //       return `${this.baseUrl}${url}`;
  //     }
  //   }
  // }
}
