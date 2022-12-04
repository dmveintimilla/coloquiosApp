import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managment-coloquio',
  templateUrl: './managment-coloquio.page.html',
  styleUrls: ['./managment-coloquio.page.scss'],
})
export class ManagmentColoquioPage implements OnInit {

  coloquios: [1,2,3,4,5,6];

  constructor() { }

  ngOnInit() {
  }

}
