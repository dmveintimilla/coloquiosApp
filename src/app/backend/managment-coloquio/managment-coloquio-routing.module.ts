import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagmentColoquioPage } from './managment-coloquio.page';

const routes: Routes = [
  {
    path: '',
    component: ManagmentColoquioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagmentColoquioPageRoutingModule {}
