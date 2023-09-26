/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-09-26 09:43:42
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzDemoTreeBasicControlledComponent } from './tree/tree.component';

const routes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./tree/tree.module').then((m) => m.treeModule),
      },
      // {
      //   path: 'file',
      //   loadChildren: () =>
      //     import('./views/file/file.module').then((m) => m.FileModule),
      // },
      // {
      //   path: 'system',
      //   loadChildren: () =>
      //     import('./views/system/system.module').then((m) => m.SystemModule),
      // },
      // {
      //   path: 'setting',
      //   canActivateChild: [AuthGuard],
      //   loadChildren: () =>
      //     import('./views/setting/setting.module').then((m) => m.SettingModule),
      // },
    ],
  },
  {
    path: 'home1',
    // loadChildren: () => import('./tree/tree.module').then((m) => m.treeModule),
    component: NzDemoTreeBasicControlledComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
