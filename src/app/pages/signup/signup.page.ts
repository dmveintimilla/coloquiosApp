import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;


  constructor(private location: Location,
    private authService: FirebaseauthService,
    public formBuilder: FormBuilder, 
    private router:Router,
    public toastController: ToastController  ) { }


  ngOnInit() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d].{5,}/),
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

   

    this.validations_form = this.formBuilder.group({
      // username: new FormControl('', Validators.compose([
      //   UsernameValidator.validUsername,
      //   Validators.maxLength(25),
      //   Validators.minLength(5),
      //   Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      //   Validators.required
      // ])),
      name: new FormControl('',  Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+\.@estud.usfq.edu.ec$')
      ])),
      banner_id: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('(00[0-9]{6})$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  validation_messages = {
    // 'username': [
    //   { type: 'required', message: 'Username is required.' },
    //   { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    //   { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    //   { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    //   { type: 'validUsername', message: 'Your username has already been taken.' }
    // ],
    'name': [
      { type: 'required', message: 'Ingrese su nombre.' },
      { type: 'minlength', message: 'Su nombre debe tener al menos 3 caracteres.' },
    ],
    'lastname': [
      { type: 'required', message: 'Ingrese su apellido.' }
    ],
    'email': [
      { type: 'required', message: 'Ingrese su email.' },
      { type: 'pattern', message: 'Por favor, ingrese un email valido.' }
    ],
    'banner_id': [
      { type: 'required', message: 'Ingrese su código banner.' },
      { type: 'pattern', message: 'Su código banner debe empezar con 00 y debe tener solo números.' }
    ],
    'password': [
      { type: 'required', message: 'Ingrese su contraseña.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' },
      { type: 'pattern', message: 'Su contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Ingrese la contraseña de confirmación.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Las constraseñas no coinciden.' }
    ]
    // ,
    // 'terms': [
    //   { type: 'pattern', message: 'De.' }
    // ],
  };

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/user"]);
  }

  backButtonClick(){
    this.location.back();
  }

  //Metodo para registrarse
  registrarse(id, name, lastname, email, password){  
    this.authService.registrar(id.value, name.value, lastname.value, email.value, password.value)
    .then(res => {

      this.authService.SendVerificationMail();
      this.router.navigate(['verify-email'])
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
