import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagmentColoquioPageRoutingModule } from './managment-coloquio-routing.module';

import { ManagmentColoquioPage } from './managment-coloquio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagmentColoquioPageRoutingModule
  ],
  declarations: [ManagmentColoquioPage]
})
export class ManagmentColoquioPageModule {}
