import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddColoquioPageRoutingModule } from './add-coloquio-routing.module';

import { AddColoquioPage } from './add-coloquio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddColoquioPageRoutingModule
  ],
  declarations: [AddColoquioPage]
})
export class AddColoquioPageModule {}
