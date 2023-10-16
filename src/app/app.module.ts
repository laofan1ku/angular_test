/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-16 15:18:07
 * @Description: 请填写简介
 */
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { treeModule } from './tree/tree.module';
import { dialogModule } from './dialog/dialog.module';
import { chartModule } from './chart/chart.module';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
// 拦截器
import { ServiceModule } from '@/app/service/service.module';
registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    treeModule,
    dialogModule,
    chartModule,
    ServiceModule,
  ],
  bootstrap: [AppComponent],
  /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, ServiceModule],
})
export class AppModule {}
