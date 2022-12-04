import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(private router: Router,
              private location: Location,
              public auth: FirebaseauthService,
              public toastController: ToastController ) { }

  ngOnInit() {
  }


  passwordRecovery(email){

    console.log(email.value);

    this.auth.PasswordRecover(email.value).then(res => {


      this.presentToast('COMPLETED', 'Password recovery email has been sent.', "checkmark-circle-outline", "darkgreen");

      setTimeout(() => {
        this.router.navigate(['']);
      }, 1500);

    }).catch(err => {
      this.presentToast('ERROR', err.message, "close-circle-outline", "danger");
    });


  }
  backButtonClick(){
    this.location.back();
  }


   //Mostrat Toast
   async presentToast(ttl, msg, icon, color) {
    const toast = await this.toastController.create({
      header: ttl, 
      message: msg,
      icon: icon,
      color: color,
      duration: 2000
    });
    toast.present();
  }

}
