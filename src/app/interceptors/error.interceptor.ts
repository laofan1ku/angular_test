/*
 * @Author: 老范
 * @Date: 2023-10-16 13:54:18
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 14:59:00
 * @Description: 错误拦截器
 */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly modalService: NzModalService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): Observable<any> => {
        console.log(
          '🚀 ~ file: error.interceptor.ts:33 ~ ErrorHandlerInterceptor ~ catchError ~ error:',
          error
        );
        // token过期 服务器错误等处理
        switch (error.status) {
          case 401: // Unauthorized
            this.modalService.confirm({
              nzTitle: '<h4>权限提示</h4>',
              nzContent: '<b>当前操作没权限,是否跳转到主页</b>',
              nzOnOk: () => this.router.navigateByUrl('/home'),
            });
            break;
          case 403:
            this.modalService.warning({
              nzTitle: '访问受限提示',
              nzContent: '你访问过于频繁,等会访问',
            });
            break;
          case 500:
            this.modalService.error({
              nzTitle: '<h4>错误提示</h4>',
              nzContent: '服务器端错误,请求重新刷新页面',
              nzOnOk: () => window.location.reload(),
            });
            break;
          default:
            // todo
            return throwError(error);
        }
        return throwError(error);
      }),
      // 重试3次
      retry(3)
    );
  }
}
