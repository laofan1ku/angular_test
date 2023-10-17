/*
 * @Author: liukun
 * @Date: 2023-09-28 09:35:37
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-13 15:42:14
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
    console.log('service-msg', msg);
    this.subject.next(msg);
  }
}
