/*
 * @Author: 老范
 * @Date: 2023-09-25 16:08:50
 * @LastEditors: 老范
 * @LastEditTime: 2023-09-26 10:39:04
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { NzDemoTreeBasicControlledComponent } from './tree.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzContextMenuService } from 'ng-zorro-antd/dropdown';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NzDemoTreeBasicControlledComponent],
  imports: [NzStepsModule, NzTreeModule, NzDropDownModule, CommonModule],
  providers: [],
  exports: [NzDemoTreeBasicControlledComponent],
})
export class treeModule {}
