import { Component } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  admin = false;

  constructor( private firebaseauthService: FirebaseauthService
   ) {}

  getUid() {
    this.firebaseauthService.stateAuth().subscribe( res => {
          if (res !== null) {
              // if (res.uid === '3eCy39ycwGcfRSG9NlFlSTlNvtx2')  {
                if (res.uid === 'r36tdAc0ZzXoyxP6ycoJWjtVIZ92')  {
                  this.admin = true;
              } else {
                 this.admin = false;
              }
          } else {
            this.admin = false;
          }
    });
}

}
