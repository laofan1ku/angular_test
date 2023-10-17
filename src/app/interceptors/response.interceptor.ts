/*
 * @Author: 老范
 * @Date: 2023-10-16 14:29:35
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 16:42:22
 * @Description: 响应拦截器
 */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

const successCodeAry: number[] = [200, 201, 202, 204];
@Injectable()
export class ResponseHandlerInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly message: NzMessageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event: any) => {
        // console.log(
        //   '🚀 ~ file: response.interceptor.ts:47 ~ ResponseHandlerInterceptor ~ filter ~ event:',
        //   event
        // );
        if (event instanceof HttpResponse) {
          // 请求成功的时候
          if (successCodeAry.includes(event.status)) {
            // const { message } = body;
            // this.message.success(message);
            return true;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }),
      map((event: HttpResponse<any>) => event.clone({ body: event.body.data }))
    );
  }
}
