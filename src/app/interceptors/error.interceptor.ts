/*
 * @Author: 老范
 * @Date: 2023-10-16 13:54:18
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 16:00:20
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
const errorCodeAry: number[] = [400, 401, 403, 404, 406, 410, 422, 500];

interface errorRes extends HttpErrorResponse {
  response: errResData;
}
interface errResData {
  status: number;
  data: any;
}
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
      catchError((error: errorRes): Observable<any> => {
        console.log(
          '🚀 ~ file: error.interceptor.ts:33 ~ ErrorHandlerInterceptor ~ catchError ~ error:',
          error
        );
        if (errorCodeAry.includes(error.response.status))
          this.modalService.confirm({
            nzTitle: '<h4>失败</h4>',
            nzContent: `<b>${error.response.data}</b>`,
            nzOnOk: () => {},
          });
        // token过期 服务器错误等处理
        return throwError(error);
      }),
      // 重试2次
      retry(2)
    );
  }
}
