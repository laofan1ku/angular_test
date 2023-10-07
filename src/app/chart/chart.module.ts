/*
 * @Author: 老范
 * @Date: 2023-09-25 16:08:50
 * @LastEditors: liukun
 * @LastEditTime: 2023-09-26 15:13:12
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { chartComponent } from './chart.component';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
@NgModule({
  declarations: [chartComponent],
  imports: [CommonModule, NgxEchartsModule.forRoot({ echarts }), NzGridModule],
  providers: [],
  exports: [chartComponent],
})
export class chartModule {}
