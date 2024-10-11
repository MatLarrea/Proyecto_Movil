import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Alimento {
  nombre: string;
  calorias: number;
  selected?: boolean; 
}

@Component({
  selector: 'app-food-modal',
  templateUrl: './food-modal.component.html',
})
export class FoodModalComponent {
  alimentos: Alimento[] = [
    { nombre: 'Manzana', calorias: 52 },
    { nombre: 'Plátano', calorias: 89 },
    { nombre: 'Pollo', calorias: 239 },
    { nombre: 'Pera', calorias: 52 },
    { nombre: 'Calabazo', calorias: 89 },
    { nombre: 'Naranja', calorias: 239 },
    { nombre: 'Carne', calorias: 52 },
    { nombre: 'Tomate', calorias: 89 },
    { nombre: 'Maní', calorias: 239 },
    
  ];

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  addFood() {
    this.modalCtrl.dismiss({
      alimento: this.alimentos.filter(a => a.selected)
    });
  }

}