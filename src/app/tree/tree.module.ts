/*
 * @Author: 老范
 * @Date: 2023-09-25 16:08:50
 * @LastEditors: 老范
 * @LastEditTime: 2023-09-26 10:39:04
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { treeComponent } from './tree.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
@NgModule({
  declarations: [treeComponent],
  imports: [NzTreeModule, CommonModule, NzModalModule],
  providers: [],
  exports: [treeComponent],
})
export class treeModule {}
