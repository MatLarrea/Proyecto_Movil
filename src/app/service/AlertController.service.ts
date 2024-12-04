import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Injectable({
  providedIn: 'root'
})

export class AlertControllerService {

    constructor (public alertController: AlertController){

    }

  // Método para mostrar alertas usando Ionic
  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}

