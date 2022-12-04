import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Coloquio } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FirestorageService } from '../../services/firestorage.service';


@Component({
  selector: 'app-config-coloquios',
  templateUrl: './config-coloquios.component.html',
  styleUrls: ['./config-coloquios.component.scss'],
})
export class ConfigColoquiosComponent implements OnInit {

  coloquios: Coloquio[] = [];

  newColoquio: Coloquio;
  
  enableNewColoquio: boolean;

  private path = "Coloquios/";

  loading: any;

  handlerMessage = '';

  newImage = '';
  
  

  constructor(private location: Location,
              public firestoreService: FirestoreService,
              private loadingCtrl: LoadingController,
              private toastController: ToastController,
              private alertController: AlertController,
              public firestorageService: FirestorageService
    ) { }

  ngOnInit() {
    this.getColoquios();
  }

  backButtonClick(){
    this.location.back();
  }

  guardarColoquio(){
    this.showLoading();
    this.firestoreService.createDoc(this.newColoquio, this.path, this.newColoquio.id).then( res =>{
      this.loading.dismiss();
      this.presentToast("Guardado con éxito");
    }).catch(error => {
      this.presentToast("No se pudo guardar");

    });
    //una promesa es algo que no sabemos cuando se va a ejectuar
  }

  getColoquios(){
    //Observable. Nos suscribimos a este obsavable para ver todos los datos de la colleccion
    this.firestoreService.getCollection<Coloquio>(this.path).subscribe( res =>{
      this.coloquios = res;

    });
  }

  async deleteColoquio(coloquio: Coloquio){
      const alert = await this.alertController.create({
        
        header: 'Advertencia',
        // subHeader: 'Advertencia',
        message: 'Seguro que desea <strong>eliminar</strong> este Coloquio',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.handlerMessage = 'Alert canceled';
            },
            
          },
          {
            text: 'OK',
            role: 'confirm',
            //handler es una llamada a una función
            handler: () => {
              this.handlerMessage = 'Alert confirmed';
              this.firestoreService.deleteDoc(this.path, coloquio.id).then( res =>{
                this.loading.dismiss();
                this.presentToast("Eliminado con éxito")
                this.alertController.dismiss();
              }).catch(error => {
                this.presentToast("No se pudo eliminar")
          
              });

            }
          }
        ]
      });
  
      await alert.present();
    }



  nuevo(){
    this.enableNewColoquio = true;
    this.newColoquio  = {
      nombre: "",
      lugar: "",
      cantidad: null,
      id: this.firestoreService.getId(),
      foto: "",
      // id: this.firestoreService.getId(),
      fecha: new Date,
    };
   

  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      cssClass: "normal",
      message: 'guardado...',
    });

    this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: "normal",
      duration: 1500,
      color: 'light',
    });

    await toast.present();
  }

  async newImageUpload(event: any){
    // if (event.target.files && event.target.files[0]){
    //   const reader = new FileReader();
    //   reader.onload = ((image) => {
    //     this.newImage = image.target.result as string;

    //   });
    //   reader.readAsDataURL(event.target.files[0]);
    // }

    // this.firestorageService.uploadImage().then( res => {
    //   console.log("recibi res de la promesa", res);
    // }); 
    const res = await this.firestorageService.uploadImage();
    console.log("recubu res de a promesa", res);

    console.log("fin de la funcion newImageUpdload")
  }


}
