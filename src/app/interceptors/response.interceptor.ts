/*
 * @Author: 老范
 * @Date: 2023-10-16 14:29:35
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 14:30:44
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
        if (event instanceof HttpResponse) {
          const status = event.status;
          const body = event.body;
          // 请求成功的时候
          if (status >= 200 && status < 300) {
            const currentUrl: string = event.url ?? '';
            const { code, message } = body;
            if (!Object.is(code, 0)) {
              // token失效跳转到登录页面
              if (Object.is(code, 10042)) {
                this.message.create('warning', message);
                setTimeout(() => {
                  this.router.navigateByUrl('/');
                });
              } else {
                // TODO是否要在这里弹出一个错误提示
                this.message.error(message);
              }
              return false;
            }
            return true;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }),
      map((event: HttpResponse<any>) =>
        event.clone({ body: event.body.result })
      )
    );
  }
}
