import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estudiante } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // comentarios: Comentario[] = []; 

  currentUser: any;
  datosEstudiante: Estudiante;
  suscriber: Subscription;
  suscriberUserInfo: Subscription;

  // comentarios: Comentario;

  constructor(  public firebaseauthService: FirebaseauthService,
    private dataService: FirestoreService,
    

      ) {
        // this.infoUser();
       }

  ngOnInit(){

    //Hardcoded pero depende del usuario
    this.dataService.getUserById("r36tdAc0ZzXoyxP6ycoJWjtVIZ92").subscribe((user) => {
      this.currentUser = user;
    });

    // this.currentUser = this.firebaseauthService.datosEstudiante.nombre;

    
    // this.auth.
    //   this.currentUser = user;
    // });
  }

  // infoUser(){
  //   const data: Comentario = {
  //     name1: this.firebaseauthService.datosEstudiante.nombre,
  //     apellido: this.firebaseauthService.datosEstudiante.apellido,
  //     id: this.firebaseauthService.datosEstudiante.id,
  //   }
  // }

  // getProductos() {
  //   this.firestoreService.getCollection<Producto>(this.path).subscribe(  res => {
  //          this.productos = res;
  //   });
  // }
  data = '{{currentUser?currentUser.first_name:"Usuario"}},{{currentUser?currentUser.last_name:"Usuario"}},{{currentUser?currentUser.banner:"Usuario"}}';
  generated = '';

  displayQrCode() {
    return this.generated !== '';
  }

  process(data) {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(self.data, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }

}


// interface Comentario {
//   name1: string;
//   apellido: string;
//   id: string;
// }
