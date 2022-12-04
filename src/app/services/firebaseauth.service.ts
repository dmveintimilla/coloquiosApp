import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { Estudiante } from '../models';
import { FirestoreService } from './firestore.service';



@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  userData: any;
  datosEstudiante: Estudiante;

  constructor(  
    public router: Router,
    public ngZone: NgZone,
    public firestore: Firestore,
    public auth: AngularFireAuth,
    public afStore: AngularFirestore,
    private firestoreService: FirestoreService   ) {
      this.stateUser();
      // this.auth.authState.subscribe((user) => {
      //   if (user) {
      //     this.userData = user;
      //     localStorage.setItem('user', JSON.stringify(this.userData));
      //     JSON.parse(localStorage.getItem('user'));
      //   } else {
      //     localStorage.setItem('user', null);
      //     JSON.parse(localStorage.getItem('user'));
      //   }
      // });
      
  }

  stateUser() {
    this.stateAuth().subscribe( res => {
       console.log(res);
      if (res !== null) {
         this.getInfoUser();

      }  
   });

  }
  login(email: string, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
    // signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  // logout() {
  //   return this.auth.signOut();
  // }

  // registrar(email: string, password: string){
  //   return this.auth.createUserWithEmailAndPassword(email, password);
  // }
  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  // Register user with email/password
  async registrar(id, name, lastname, email, password) {

    const userAuth = await this.auth.createUserWithEmailAndPassword(email, password);

    console.log(userAuth);

    const userData = {
      uid: userAuth.user.uid,
      id: id,
      first_name: name,
      last_name: lastname,
      email: email
    };

    this.SetUserData(userData);
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
       return user.uid;
    }
 }



  // Email verification when new user register
  SendVerificationMail() {
    return this.auth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['profilesetup']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail);
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
  // Auth providers
  AuthLogin(provider) {
    return this.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      banner: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      
    };
  
    return userRef.set(userData, {
      merge: true,
    });
  }


 stateAuth() {
    return this.auth.authState;
 }

 async getInfoUser() {
     const uid = await this.getUid();
     const path = 'users';  
     this.firestoreService.getDoc<Estudiante>(path, uid).subscribe( res => {
           if (res !== undefined) {
                 this.datosEstudiante = res;
                console.log('datosCliente ->' , this.datosEstudiante);
           }
     });
 }


}
