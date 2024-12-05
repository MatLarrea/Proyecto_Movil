import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StorageService } from '../service/Storage.service';
import { GeolocationService } from '../service/geolocation-service.service';
import { uploadMeals } from '../use-cases/upload-meals.use-case';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreService } from '../service/firestore.service';
@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.page.html',
  styleUrls: ['./comidas.page.scss'],
})
export class ComidasPage implements OnInit {
  recetas: any[] = [];
  receta = {
    nombre: '',
    ingredientes: '',
    modoPreparacion: '',
    foto: '',
    userId: '',
    mealId: ''
  };

  recetaSeleccionada: any = null;
  isModalOpen: boolean = false;
  isModalDetalleOpen: boolean = false;

  constructor(private storageService: StorageService, private geolocationService: GeolocationService, private mealUseCase: uploadMeals, private firestore: AngularFirestore, private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  // Cargar las recetas desde el Storage
  async cargarRecetas() {
    this.recetas.length = 0;
    const recetasGuardadas = await this.firestoreService.getItem('meals');
    this.recetas = recetasGuardadas;
    console.log('RecetasGuardadas: ', this.recetas)
  }

  // Abrir el modal para crear una receta
  openModal() {
    this.isModalOpen = true;
  }

  // Cerrar el modal de crear receta
  closeModal() {
    this.isModalOpen = false;
  }

  // Abrir el modal de detalle de una receta
  abrirModalDetalle(receta: any) {
    this.recetaSeleccionada = receta;
    this.isModalDetalleOpen = true;
  }

  // Cerrar el modal de detalle
  closeModalDetalle() {
    this.isModalDetalleOpen = false;
    this.recetaSeleccionada = null;
  }

  // Función para tomar una foto
  async tomarFoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      this.receta.foto = photo.dataUrl;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Función para crear una nueva receta
  async crearReceta() {
    try {
      
      const nuevaReceta = {
        nombre: this.receta.nombre,
        ingredientes: this.receta.ingredientes,
        modoPreparacion: this.receta.modoPreparacion,
        foto: this.receta.foto,
        userId: '',
        mealId: ''
      };

      await this.mealUseCase.uploadMeal(nuevaReceta);
      console.log('Receta guardada con éxito');
      console.log("Storage recetas: ", this.storageService.get('recetas'))
      this.cargarRecetas();
      this.closeModal();  // Cerrar el modal

    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }

  // Función para eliminar una receta
  async eliminarReceta(receta: any) {
    await this.mealUseCase.deleteMeal(receta);
    this.cargarRecetas(); 
    this.closeModalDetalle();
    console.log("Storage recetas: ", this.storageService.get('recetas'))
  }



  isModalModificarOpen: boolean = false; // Controla la visibilidad del modal de modificar
  recetaEnEdicion: any = null;          // Receta seleccionada para modificar
  // Abrir el modal para modificar receta
abrirModalModificar(receta: any) {
  this.recetaEnEdicion = { ...receta }; // Crear una copia para editar
  this.isModalModificarOpen = true;
}

// Cerrar el modal de modificar receta
cerrarModalModificar() {
  this.isModalModificarOpen = false;
  this.recetaEnEdicion = null;
}

// Guardar los cambios en la receta modificada
async guardarRecetaModificada() {
  try {
    const index = this.recetas.findIndex(r => r.nombre === this.recetaEnEdicion.nombre);

    if (index !== -1) {
      this.recetas[index] = this.recetaEnEdicion; // Actualizar la receta en la lista
      await this.storageService.set('recetas', this.recetas); // Guardar en el almacenamiento
    }

    console.log('Receta modificada con éxito');
    this.cerrarModalModificar(); // Cerrar el modal
  } catch (error) {
    console.error('Error al modificar la receta:', error);
  }
}


}
