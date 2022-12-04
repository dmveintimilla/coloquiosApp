import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailColoquioPageRoutingModule } from './detail-coloquio-routing.module';

import { DetailColoquioPage } from './detail-coloquio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailColoquioPageRoutingModule
  ],
  declarations: [DetailColoquioPage]
})
export class DetailColoquioPageModule {}
