import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Alimento {
  nombre: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  unidad: number;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private alimentosCollection = this.firestore.collection<Alimento>('alimentos');

  constructor(private firestore: AngularFirestore) {}

  // Crear un nuevo alimento
  addAlimento(alimento: Alimento) {
    return this.alimentosCollection.add(alimento);
  }

  // Leer todos los alimentos
  getAlimentos(): Observable<Alimento[]> {
    return this.alimentosCollection.valueChanges({ idField: 'id' });
  }

  // Actualizar un alimento
  updateAlimento(id: string, alimento: Alimento) {
    return this.alimentosCollection.doc(id).update(alimento);
  }

  // Eliminar un alimento
  deleteAlimento(id: string) {
    return this.alimentosCollection.doc(id).delete();
  }
}
