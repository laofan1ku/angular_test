/*
 * @Author: liukun
 * @Date: 2023-09-27 10:22:40
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-20 11:46:27
 * @FilePath: \501-aq-pro\src\api\main.ts
 * @Description: 后端接口封装文件
 *
 */
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '@/app/service/base.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private readonly baseService: BaseService) {}

  // 树形列表
  getTreeListApi(): Observable<any> {
    return this.baseService.get('getDataTableNames');
  }
  getDocumentsApi(listQuery: any): Observable<any> {
    return this.baseService.get(`getDocuments`, { params: listQuery });
  }
  // 导出文件 csv/json
  exportFileCSVApi(params: any): Observable<any> {
    return this.baseService.get(`exportCSV`, {
      responseType: 'blob',
      params,
    });
  }
  exportFileJSONApi(params: any): Observable<any> {
    return this.baseService.get(`exportJSON`, {
      params,
    });
  }
  getModelListApi(listQuery: any): Observable<any> {
    return this.baseService.get('getModelInfos', { params: listQuery });
  }
}
