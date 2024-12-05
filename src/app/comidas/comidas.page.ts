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
    const recetasGuardadas = await this.storageService.get('recetas') || [];
    this.recetas = recetasGuardadas;
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
      this.cargarRecetas();  // Recargar las recetas después de guardar
      console.log("Storage recetas: ", this.storageService.get('recetas'))
      this.closeModal();  // Cerrar el modal

    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }

  // Función para eliminar una receta
  async eliminarReceta(receta: any) {
    // Filtrar las recetas para eliminar la seleccionada
    this.recetas = this.recetas.filter(r => r.nombre !== receta.nombre);

    // Guardar nuevamente las recetas sin la eliminada
    await this.storageService.set('recetas', this.recetas);
    
  }
}
