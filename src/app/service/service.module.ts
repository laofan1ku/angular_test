/*
 * @Author: 老范
 * @Date: 2023-10-16 14:49:18
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 17:06:29
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResponseHandlerInterceptor } from '@/app/interceptors/response.interceptor';
import { ErrorHandlerInterceptor } from '@/app/interceptors/error.interceptor';
import { HeaderInterceptor } from '@/app/interceptors/header.interceptor';
import { ServiceInterceptor } from '@/app/interceptors/service.interceptor';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class ServiceModule {}
