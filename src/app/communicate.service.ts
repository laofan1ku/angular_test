/*
 * @Author: liukun
 * @Date: 2023-09-28 09:35:37
 * @LastEditors: liukun
 * @LastEditTime: 2023-09-28 09:53:59
 * @FilePath: \PROJECT_NAME\src\app\communicate.service.ts
 * @Description:
 *
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicateService {
  private subject = new Subject<string>();
  ob = this.subject.asObservable();
  sendData(msg: string) {
    this.subject.next(msg);
  }
}
