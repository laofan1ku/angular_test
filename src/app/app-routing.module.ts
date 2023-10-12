/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-12 15:25:55
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '@/app/app.component';
import { treeComponent } from '@/app/tree/tree.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // component: treeComponent,
    loadChildren: () => import('./tree/tree.module').then((m) => m.treeModule),
    // redirectTo: '/Index',
  },
  {
    path: 'Index',
    // loadChildren: () => import('./app.module').then((m) => m.AppModule),
    component: treeComponent,
    children: [
      {
        path: 'chart',
        // pathMatch: 'full',
        loadChildren: () =>
          import('./chart/chart.module').then((m) => m.chartModule),
      },
      {
        path: 'Index1',
        // loadChildren: () => import('./app.module').then((m) => m.AppModule),
        component: AppComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
