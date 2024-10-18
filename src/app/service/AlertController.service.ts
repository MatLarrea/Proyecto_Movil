import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importar AlertController

@Injectable({
  providedIn: 'root'
})

export class AlertControllerService {

    constructor (public alertController: AlertController){

    }

  // Método para mostrar alertas usando Ionic
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

