import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodService } from '../service/food.service';

interface Alimento {
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

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearAlimento() {
    if (this.nuevoAlimento.nombre.trim()) {
      this.foodService.addAlimento(this.nuevoAlimento).then(() => {
        console.log('Alimento agregado');
        this.mostrarFormulario = false;  // Oculta el formulario después de agregar
        this.nuevoAlimento = { nombre: '', calorias: 0, proteinas: 0, carbohidratos: 0, unidad: 0 }; // Limpia el formulario
        this.loadAlimentos();  // Refresca la lista de alimentos
      }).catch(error => {
        console.error('Error al agregar alimento:', error);
      });
    } else {
      console.warn('El nombre del alimento no puede estar vacío.');
    }
  }
}
