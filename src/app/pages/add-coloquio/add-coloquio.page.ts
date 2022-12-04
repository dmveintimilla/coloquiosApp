import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-coloquio',
  templateUrl: './add-coloquio.page.html',
  styleUrls: ['./add-coloquio.page.scss'],
})
export class AddColoquioPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  backButtonClick(){
    this.location.back();
  }

}
