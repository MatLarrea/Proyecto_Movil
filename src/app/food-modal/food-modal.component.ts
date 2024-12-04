import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodService } from '../service/food.service';

interface Alimento {
  id?: string;  // Añadimos 'id' para el manejo de actualización y eliminación
  nombre: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  unidad: number;
  selected?: boolean;
}

@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
})
export class FoodModalComponent {
  alimentos: Alimento[] = [];
  nuevoAlimento: Alimento = {
    nombre: '',
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    unidad: 0,
  };
  mostrarFormulario = false;

  constructor(
    private modalCtrl: ModalController,
    private foodService: FoodService
  ) {}

  ngOnInit() {
    this.loadAlimentos();
  }

  loadAlimentos() {
    // Carga los alimentos y asigna el UID a cada uno automáticamente
    this.foodService.getAlimentos().subscribe(alimentos => {
      this.alimentos = alimentos;
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  addFood() {
    this.modalCtrl.dismiss({
      alimento: this.alimentos.filter(a => a.selected)
    });
  }

  toggleFormulario(abierto: boolean) {
    this.mostrarFormulario = abierto;
  }

  crearAlimento() {
    if (this.nuevoAlimento.nombre.trim()) {
      if (this.nuevoAlimento.id) {
        // Si el alimento tiene un ID, realiza una actualización
        this.foodService.updateAlimento(this.nuevoAlimento.id, this.nuevoAlimento).then(() => {
          console.log('Alimento actualizado');
          this.resetFormulario();
          this.loadAlimentos();
        }).catch(error => {
          console.error('Error al actualizar alimento:', error);
        });
      } else {
        // Si no tiene ID, crea un nuevo alimento
        this.foodService.addAlimento(this.nuevoAlimento).then(() => {
          console.log('Alimento agregado');
          this.resetFormulario();
          this.loadAlimentos();
        }).catch(error => {
          console.error('Error al agregar alimento:', error);
        });
      }
    } else {
      console.warn('El nombre del alimento no puede estar vacío.');
    }
  }

  eliminarAlimento(id: string) {
    this.foodService.deleteAlimento(id).then(() => {
      console.log('Alimento eliminado');
      this.loadAlimentos();
    }).catch(error => {
      console.error('Error al eliminar alimento:', error);
    });
  }

  modificarAlimento(alimento: Alimento) {
    // Carga los datos del alimento en el formulario para editarlos
    this.nuevoAlimento = { ...alimento };
    this.mostrarFormulario = true;
  }

  resetFormulario() {
    this.mostrarFormulario = false;
    this.nuevoAlimento = { nombre: '', calorias: 0, proteinas: 0, carbohidratos: 0, unidad: 0 };
  }
}
