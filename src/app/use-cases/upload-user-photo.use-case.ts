import { Injectable } from "@angular/core";
import { StorageService } from "../service/Storage.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";


@Injectable({
    providedIn: 'root',
})


export class uploadUserPhotoUseCase {

   
    constructor (
        private storageService: StorageService,
        private firestore: AngularFirestore
    ){}

    async uploadUserPhoto(imageUrl: string): Promise<{success: boolean, message: string}> {
        try{
                
                const currentUser = await this.storageService.get('user')

                if (currentUser && currentUser.uid){
                const uid = currentUser.uid
                
                //Actualizacimos la photo en firestore
                
                //console.log('imageParts: ', imageParts)    
                currentUser.photoURL = imageUrl
                console.log(currentUser.photoURL)  
                //Actualizamos la photo en el storage
                await this.storageService.set('user', currentUser)

                return { success: true, message: 'Imagen de usuario actualizada con éxito.' };

            } else {
                return { success: false, message: 'No se encontró el UID del usuario.' };
            }
      
        } catch (error) {
            return { success: false, message: `Error al subir la imagen: ${error.message}` };
        }
    }

}


