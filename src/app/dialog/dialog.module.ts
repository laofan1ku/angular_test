/*
 * @Author: 老范
 * @Date: 2023-09-25 16:08:50
 * @LastEditors: liukun
 * @LastEditTime: 2023-10-13 14:44:35
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { dialogComponent } from './dialog.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
@NgModule({
  declarations: [dialogComponent],
  imports: [
    NzTreeModule,
    CommonModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzPaginationModule,
    NgxJsonViewerModule,
    NzIconModule,
  ],
  providers: [],
  exports: [dialogComponent],
})
export class dialogModule {}
