/*
 * @Author: 老范
 * @Date: 2023-10-16 14:00:58
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 16:59:54
 * @Description: http请求封装
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
export const HTTP_TIMEOUT = 1000 * 30; // http请求30秒超时

type ObjectType = Record<string, any>;
@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private apiUrl = (window as any).getWinConfig().server;
  constructor(private readonly http: HttpClient) {}

  /**
   * 封装一个统一的get请求方法
   * @param url:{String} url地址
   * @param urlParams: {object} url配置参数
   * @param options:配置参数
   */
  public get<T>(
    url: string,
    // urlParams?: ObjectType,
    options?: {
      params?: ObjectType;
      headers?: ObjectType;
      responseType?: any;
    }
  ): Observable<unknown> {
    url = `${this.apiUrl}${url}`;
    const $params: HttpParams = new HttpParams({
      fromObject: options?.params ?? {},
    });
    const $headers: HttpHeaders = new HttpHeaders(options?.headers ?? {});
    return this.http
      .get<T>(url, {
        headers: $headers,
        params: $params,
        responseType: options?.responseType,
      })
      .pipe(timeout(HTTP_TIMEOUT));
  }

  /**
   * 封装一个put提交数据
   * @param url url地址
   * @param body 请求体
   * @param options 附属内容
   */
  public put<T>(
    url: string,
    id: string | number,
    body: ObjectType | null,
    options?: {
      params?: ObjectType;
      headers?: ObjectType;
    }
  ): Observable<unknown> {
    const $url = `${url}/${id}`;
    const $params: HttpParams = new HttpParams({
      fromObject: options?.params ?? {},
    });
    const $headers: HttpHeaders = new HttpHeaders(options?.headers ?? {});
    return this.http
      .put<T>($url, null, {
        headers: $headers,
        params: $params,
      })
      .pipe(timeout(HTTP_TIMEOUT));
  }

  /**
   * post请求的方法
   * @param url url地址
   * @param body 请求体
   * @param options 附属条件
   */
  public post<T>(
    url: string,
    body: ObjectType | null,
    options?: {
      params?: ObjectType;
      headers?: ObjectType;
    }
  ): Observable<unknown> {
    const $params: HttpParams = new HttpParams({
      fromObject: options?.params ?? {},
    });
    const $headers: HttpHeaders = new HttpHeaders(options?.headers ?? {});

    return this.http
      .post<T>(url, null, {
        headers: $headers,
        params: $params,
      })
      .pipe(timeout(HTTP_TIMEOUT));
  }

  /**
   * 删除数据的方法
   * @param url url地址
   * @param options 附属条件
   */
  public delete<T>(
    url: string,
    id: string | number,
    options?: {
      params?: ObjectType;
      headers?: ObjectType;
    }
  ): Observable<unknown> {
    const $url: string = `${url}/${id}`;
    const $params: HttpParams = new HttpParams({
      fromObject: options?.params ?? {},
    });
    const $headers: HttpHeaders = new HttpHeaders(options?.headers ?? {});
    return this.http
      .delete<T>($url, {
        headers: $headers,
        params: $params,
      })
      .pipe(timeout(HTTP_TIMEOUT));
  }
}
