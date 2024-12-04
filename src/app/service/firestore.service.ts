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

  getItem(path: string){

    console.log("Estoy leyendo una coleccion")
    this.database.collection(path).valueChanges().subscribe( (res) => {
      console.log('Items: ',res);
    });
  }

}
