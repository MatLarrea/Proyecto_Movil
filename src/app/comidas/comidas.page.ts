import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular';

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
    foto: ''
  };

  recetaSeleccionada: any = null;  
  isModalOpen: boolean = false;  
  isModalDetalleOpen: boolean = false;  

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.cargarRecetas();  
  }

  
  async cargarRecetas() {
    const recetasGuardadas = await this.storage.get('recetas') || [];
    this.recetas = recetasGuardadas;
  }

  
  openModal() {
    this.isModalOpen = true;
  }

  
  closeModal() {
    this.isModalOpen = false;
  }

  
  abrirModalDetalle(receta: any) {
    this.recetaSeleccionada = receta;
    this.isModalDetalleOpen = true;
  }

  
  closeModalDetalle() {
    this.isModalDetalleOpen = false;
    this.recetaSeleccionada = null;
  }

  
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

  
  async crearReceta() {
    try {
      const recetasGuardadas = await this.storage.get('recetas') || [];
      const nuevaReceta = {
        nombre: this.receta.nombre,
        ingredientes: this.receta.ingredientes,
        modoPreparacion: this.receta.modoPreparacion,
        foto: this.receta.foto
      };

      
      recetasGuardadas.push(nuevaReceta);

      
      await this.storage.set('recetas', recetasGuardadas);
      console.log('Receta guardada con éxito');

     
      this.cargarRecetas();

      
      this.closeModal();
    } catch (error) {
      console.error('Error al guardar la receta:', error);
    }
  }
  async eliminarReceta(receta: any) {
    
    this.recetas = this.recetas.filter(r => r.nombre !== receta.nombre);

    
    await this.storage.set('recetas', this.recetas);
  }
}
