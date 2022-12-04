import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportColoquioPageRoutingModule } from './report-coloquio-routing.module';

import { ReportColoquioPage } from './report-coloquio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportColoquioPageRoutingModule
  ],
  declarations: [ReportColoquioPage]
})
export class ReportColoquioPageModule {}
