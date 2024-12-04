import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StorageService } from "../service/Storage.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class userUpdateUseCase{

    constructor(private firestore: AngularFirestore, private storageService: StorageService){}

    async updateStats(nickname: string, altura: string, peso: number, edad: number, nivelActividad: string, meta: string, genero: string): Promise<{success: Boolean, message: string}>{

        try{
            
            const currentUser = await this.storageService.get('user');

            if(!currentUser){
                return {success: false, message: 'Usuario no encontrado'}
            }
            
            const uid = currentUser.uid;

            await this.firestore.collection('Users').doc(uid).update({
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                nickname: nickname,
                altura: altura,
                peso: peso,
                edad: edad,
                nivelActividad: nivelActividad,
                meta: meta,
                genero: genero,
                firstLoginStatus: true
            })
            
            const userStatsUpdate = {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                nickname: nickname,
                altura: altura,
                peso: peso,
                edad: edad,
                nivelActividad: nivelActividad,
                meta: meta,
                genero: genero,
                firstLoginStatus: true
            }

            await this.storageService.set('user',userStatsUpdate)
            return {success: true, message: 'Registro existoso!'}
        }catch(error: any){
            return { success: false, message: `Error al guardar stats: ${error.message}` };
        }
    }
}