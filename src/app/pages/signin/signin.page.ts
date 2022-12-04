import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(  public router: Router,
                public authService: FirebaseauthService,
                public toastController: ToastController ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.login(email.value, password.value)
      .then(res => {
        if(this.authService.isEmailVerified){
          this.router.navigate(['home','home', 'tab1'])
        } else {
          window.alert('No se ha verificado el email');
          return false;
        }
      }).catch(err => {
        this.presentToast('ERROR', err.message, "close-circle-outline");
      })
  }

   //Mostrat Toast
   async presentToast(ttl, msg, icon) {
    const toast = await this.toastController.create({
      header: ttl, 
      message: msg,
      icon: icon,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }


}
