import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StorageService } from "../service/Storage.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class userProfilePhotoUpdateUseCase{

    constructor(private firestore: AngularFirestore, private storageService: StorageService){}

    async updateProfileImage(photoUrl: string): Promise<{success: Boolean, message: string}>{

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
                photoURL: photoUrl,
                nickname: currentUser.nickname,
                altura: currentUser.altura,
                peso: currentUser.peso,
                edad: currentUser.edad,
                nivelActividad: currentUser.nivelActividad,
                meta: currentUser.meta,
                genero: currentUser.genero,
                firstLoginStatus: true
            })
            
            const userProfilePhotoUpdate = {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: photoUrl,
                nickname: currentUser.nickname,
                altura: currentUser.altura,
                peso: currentUser.peso,
                edad: currentUser.edad,
                nivelActividad: currentUser.nivelActividad,
                meta: currentUser.meta,
                genero: currentUser.genero,
                firstLoginStatus: true
            }

            await this.storageService.set('user',userProfilePhotoUpdate)
            return {success: true, message: 'Perfil actualizado!'}
        }catch(error: any){
            return { success: false, message: `Error al actualizar foto de perfil: ${error.message}` };
        }
    }
}