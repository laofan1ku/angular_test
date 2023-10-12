/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-10-12 14:02:13
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '@/app/app.component';

const routes: Routes = [
  // {
  //   path: '/mian',
  //   // component: AppComponent,
  //   redirectTo: 'Index',
  //   children: [
  //     {
  //       path: '/mian1',
  //       // pathMatch: 'full',
  //       component: AppComponent,
  //       // redirectTo: '/Index',
  //     },
  //     {
  //       path: 'Index',
  //       loadChildren: () => import('./app.module').then((m) => m.AppModule),
  //       // component: AppComponent,
  //     },
  //   ],
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/Index',
  },
  {
    path: 'Index',
    // loadChildren: () => import('./app.module').then((m) => m.AppModule),
    component: AppComponent,
    children: [
      {
        path: 'chart',
        // pathMatch: 'full',
        loadChildren: () =>
          import('./chart/chart.module').then((m) => m.chartModule),
      },
      {
        path: 'Index',
        loadChildren: () => import('./app.module').then((m) => m.AppModule),
        // component: AppComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
