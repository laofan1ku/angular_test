/*
 * @Author: 老范
 * @Date: 2023-09-25 15:02:27
 * @LastEditors: 老范
 * @LastEditTime: 2023-09-26 09:43:42
 * @Description: 请填写简介
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { treeComponent } from './tree/tree.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/Index',
  },
  {
    path: '/Index',
    // loadChildren: () => import('./tree/tree.module').then((m) => m.treeModule),
    component: treeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
