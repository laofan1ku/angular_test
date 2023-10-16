/*
 * @Author: 老范
 * @Date: 2023-10-16 13:23:08
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 14:28:38
 * @Description: 请求拦截器
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(
      '🚀 ~ file: service.interceptor.ts:16 ~ ServiceInterceptor ~ intercept ~ request:',
      request
    );
    const copyReq = request.clone();
    // const copyReq = request.clone({
    //   setHeaders: {
    //     token: 'my-auth-token2',
    //     'self-header': 'test2'
    //   }
    // });
    return next.handle(request);
  }
}
