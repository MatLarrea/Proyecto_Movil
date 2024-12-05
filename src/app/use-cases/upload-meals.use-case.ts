import { Injectable } from "@angular/core";
import { StorageService } from "../service/Storage.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { receta } from "../service/modelos/receta";
import { FirestoreService } from "../service/firestore.service";

@Injectable({
    providedIn: 'root',
})

export class uploadMeals {

    constructor(private storageService: StorageService, private firestore: AngularFirestore, private firestoreService: FirestoreService){}
    

    async uploadMeal(receta: receta): Promise<{success: boolean, message: string}>{

        
    try {
        
        const currentUser = await this.storageService.get('user')
        
        if (currentUser && currentUser.uid){

                const MEAL_ID = this.firestore.createId();
                const uid = currentUser.uid;
                
                
                const nuevaReceta = {
                    nombre: receta.nombre,
                    ingredientes: receta.ingredientes,
                    modoPreparacion: receta.modoPreparacion,
                    foto: receta.foto,
                    userId: uid,
                    mealId: MEAL_ID
                };
        
                //Agregar a la base de datos
                const collection = this.firestore.collection('meals');
                await collection.doc(MEAL_ID).set(nuevaReceta);

        
        
                console.log('Receta guardada con éxito');
                console.log("Storage recetas: ", this.storageService.get('recetas'))

                return {success: true, message: 'Receta guardada con éxisto'}
            } else {
                return { success: false, message: 'No se encontró el UID del usuario.' };
            }  
        } catch (error) {
            return {success: false, message: error};
        }
    }

    async deleteMeal(receta: receta): Promise<{success: boolean, message: string}>{
        
        let meals = []

        try{
            const collection = this.firestore.collection('meals');
            await collection.doc(receta.mealId).delete()
            meals = await this.firestoreService.getItem('meals')
            

            console.log('Coleccion meals: ', meals)
            this.storageService.set('recetas', meals)
            console.log('Coleccion meals: ', this.storageService.get('recetas'))
            return{success: true, message: 'Comida eliminada'}
        } catch (error) {
            return {success: false, message: error};
        }
    }
}