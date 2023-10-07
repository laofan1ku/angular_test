/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-07 11:18:48
 * @Description: 请填写简介
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
