import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(  public fireStorage: AngularFireDatabase,) { }

uploadImage(){
  return new Promise(resolve =>{
    setTimeout(() => {
      resolve(true);
      console.log("responde la promesa");
      return;
    }, 2000);

  })
}

}
