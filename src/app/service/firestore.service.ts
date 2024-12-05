import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { returnUpBack } from 'ionicons/icons';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  //Parámetros que corresponden a los campos de la coleccion almacenada en la firestore
  setItem(data: any, path: string, id: string){
    
    //Creo una coleccion 
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  async getItem(path: string): Promise<any[]> {
    let items = [];
    console.log("Estoy leyendo una colección");

    // Utiliza una Promesa para esperar a que los datos se carguen
    await new Promise<void>((resolve, reject) => {
        this.database.collection(path).valueChanges().subscribe(
            (res) => {
                res.forEach(item => {
                    items.push(item);
                });
                resolve(); // Resuelve la promesa cuando los datos se han cargado
            },
            (error) => {
                console.error('Error al leer la colección:', error);
                reject(error); // Rechaza la promesa en caso de error
            }
        );
    });

    console.log('Items: ', items);
    return items;
  }
}
