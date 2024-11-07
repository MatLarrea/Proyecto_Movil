import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FoodModalComponent } from '../food-modal/food-modal.component';
import { userLogoutUseCase } from '../use-cases/user-logout.user-case';
import { StorageService } from '../service/Storage.service';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';




interface Alimento {
  nombre: string;
  calorias: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nickname: string = '';
  altura: number = 0;
  peso: number = 0;
  edad: number = 0;
  nivelActividad: string = '';
  meta: string = '';
  genero: string = '';
  caloriasDiarias: number = 0;
  caloriasConsumidas: number = 0; // Acumulador de calorías
  caloriasRestantes: number = 0; // Propiedad para calorías restantes
  avatar: string = 'assets/avatar.png'; // Imagen por defecto
  avatarUrl: string = '';

 

  // Listas de alimentos por franja horaria
  alimentosManana: Alimento[] = [];
  alimentosTarde: Alimento[] = [];
  alimentosNoche: Alimento[] = [];

  

  constructor(private router: Router, private route: ActivatedRoute, private modalCtrl: ModalController, private userLogout: userLogoutUseCase, private storageService: StorageService,) {
    
      this.caloriasDiarias = this.calcularCaloriasDiarias();
      this.calcularCaloriasRestante();
    
  }

  ngOnInit() {
    this.loadUserData();
  }

  async ionViewDidEnter() {
    const user = await this.storageService.get('user');
    if (!user) {
      console.log('No se encontraron datos del usuario.');
    }else{
      this.loadUserData();
    }
  }
  
  calcularCaloriasDiarias(): number {
    let metabolismoBasal: number;
  
    // Fórmulas de Harris-Benedict
    if (this.genero === 'masculino') {
      metabolismoBasal = 88.362 + (13.397 * this.peso) + (4.799 * this.altura) - (5.677 * this.edad);
    } else if (this.genero === 'femenino') {
      metabolismoBasal = 447.593 + (9.247 * this.peso) + (3.098 * this.altura) - (4.330 * this.edad);
    } else {
      // Por defecto, si el género no está especificado
      metabolismoBasal = 2300; 
    }
  
    // Ajuste por nivel de actividad
    let factorActividad: number;
    switch (this.nivelActividad) {
      case 'bajo':
        factorActividad = 1.2;
        break;
      case 'medio':
        factorActividad = 1.55;
        break;
      case 'alto':
        factorActividad = 1.9;
        break;
      default:
        factorActividad = 1.2;
        break;
    }
  
    let caloriasMantenimiento = metabolismoBasal * factorActividad;
  
    // Ajuste según el objetivo
    if (this.meta === 'bajar de peso') {
      return Math.round(caloriasMantenimiento - 500);
    } else if (this.meta === 'subir de peso') {
      return Math.round(caloriasMantenimiento + 500);
    } else {
      return Math.round(caloriasMantenimiento); 
    }
  }

  // Abrir el modal y agregar alimentos a la franja correspondiente
  async openFoodModal(franja: 'mañana' | 'tarde' | 'noche') {
    const modal = await this.modalCtrl.create({
      component: FoodModalComponent,
          
      
      
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const alimentosSeleccionados: Alimento[] = data.data.alimento;
        alimentosSeleccionados.forEach(alimento => {
          if (franja === 'mañana') {
            this.alimentosManana.push(alimento);
          } else if (franja === 'tarde') {
            this.alimentosTarde.push(alimento);
          } else if (franja === 'noche') {
            this.alimentosNoche.push(alimento);
          }
        });
        this.calcularCaloriasConsumidas();
      }
    });

    await modal.present();
  }

  calcularCaloriasConsumidas() {
    let totalCalorias = 0;
  
    this.alimentosManana.forEach(alimento => {
      totalCalorias += alimento.calorias;
    });
  
    this.alimentosTarde.forEach(alimento => {
      totalCalorias += alimento.calorias;
    });
  
    this.alimentosNoche.forEach(alimento => {
      totalCalorias += alimento.calorias;
    });
  
    this.caloriasConsumidas = Math.round(totalCalorias); 
    this.calcularCaloriasRestante(); 
  }

  calcularCaloriasRestante() {
    this.caloriasRestantes = Math.round(this.caloriasDiarias - this.caloriasConsumidas); 
  }

  async loadUserData() {

    const userData = await this.storageService.get('user');
    console.log("datos usuario: ", userData);
    this.nickname = userData['nickname'];
    this.altura = userData['altura'];
    this.peso = userData['peso'];
    this.edad = userData['edad'];
    this.nivelActividad = userData['nivelActividad'];
    this.meta = userData['meta'];
    this.genero = userData['genero'];
    
  }

  async singOut() {
    await this.storageService.clear();
    this.userLogout.performLogout();
    this.router.navigate(['/splash']);
  }
  eliminarAlimento(franja: string, index: number) {
    let alimentoEliminado;
  
    // Eliminar el alimento del array y almacenar su referencia
    if (franja === 'mañana') {
      alimentoEliminado = this.alimentosManana.splice(index, 1)[0];
    } else if (franja === 'tarde') {
      alimentoEliminado = this.alimentosTarde.splice(index, 1)[0];
    } else if (franja === 'noche') {
      alimentoEliminado = this.alimentosNoche.splice(index, 1)[0];
    }
  
    // Restar las calorías del alimento eliminado de la cuenta total
    if (alimentoEliminado) {
      this.caloriasConsumidas -= alimentoEliminado.calorias;
      this.calcularCaloriasRestante();  // Recalcular calorías restantes
    }
  }
  



  async tomarFoto() {
    try {
      // Abre la cámara y toma una foto
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Especifica que la fuente es la cámara
        quality: 200 // Calidad de la imagen (puedes ajustar este valor)
      });

      // Obtiene la URL de la imagen tomada
      this.avatarUrl = image.webPath;
    } catch (error) {
      console.error("Error al tomar la foto", error);
    }
  }

}

