import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigColoquiosComponent } from './config-coloquios/config-coloquios.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConfigColoquiosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
