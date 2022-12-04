import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportColoquioPage } from './report-coloquio.page';

const routes: Routes = [
  {
    path: '',
    component: ReportColoquioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportColoquioPageRoutingModule {}
