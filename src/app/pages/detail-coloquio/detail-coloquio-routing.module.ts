import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailColoquioPage } from './detail-coloquio.page';

const routes: Routes = [
  {
    path: '',
    component: DetailColoquioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailColoquioPageRoutingModule {}
