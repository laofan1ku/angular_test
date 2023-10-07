/*
 * @Author: liukun
 * @Date: 2023-09-27 10:22:40
 * @LastEditors: liukun
 * @LastEditTime: 2023-09-27 16:13:35
 * @FilePath: \PROJECT_NAME\src\api\main.ts
 * @Description:
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private apiUrl = 'http://192.168.2.206:8848/';
  constructor(private http: HttpClient) {}
  // 树形列表
  getTreeListApi(): Observable<any> {
    return this.http.get(`${this.apiUrl}getDataTableNames`);
  }
  getDocumentsApi(listQuery: any): Observable<any> {
    // 创建 HttpParams 对象来设置参数
    let params = new HttpParams();
    // 遍历传递的对象并将其作为参数添加到 HttpParams 中
    for (const key in listQuery) {
      if (listQuery.hasOwnProperty(key)) {
        params = params.set(key, listQuery[key]);
      }
    }
    return this.http.get(`${this.apiUrl}getDocuments`, { params });
  }
  // 导出文件 csv/json
  exportFileCSVApi(name: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('tableName', name);
    return this.http.get(`${this.apiUrl}exportCSV`, {
      responseType: 'blob',
      params,
    });
  }
  exportFileJSONApi(name: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('tableName', name);
    return this.http.get(`${this.apiUrl}exportJSON`, {
      params,
    });
  }
}
