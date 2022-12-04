import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddColoquioPage } from './add-coloquio.page';

const routes: Routes = [
  {
    path: '',
    component: AddColoquioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddColoquioPageRoutingModule {}
