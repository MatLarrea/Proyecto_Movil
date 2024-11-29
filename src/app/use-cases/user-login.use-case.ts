import { Injectable } from "@angular/core";
import { StorageService } from "../service/Storage.service";
import { AngularFirestore, DocumentData  } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { docData } from "@angular/fire/firestore";
import { firstValueFrom, lastValueFrom, Observable } from "rxjs";
import {User} from "../service/modelos/User"
import { alertOutline } from "ionicons/icons";

@Injectable({
    providedIn: 'root'
})



export class userLoginUseCase {

    
    constructor (private firestore: AngularFirestore, private storageService: StorageService, private fireAuth: AngularFireAuth){}

    //userData: userData | undefined;

    async performeLogin(email: string, password: string): Promise<{success: boolean; message: string, firsLoginStatus: boolean}>{

        try {
            
            const userCredential = await this.fireAuth. signInWithEmailAndPassword(email, password)

            const user = userCredential.user;

            if (user){

                const uid = user.uid;
                const userRef = this.firestore.collection('Users').doc(uid);
                const userSnapshot  = await firstValueFrom(userRef.get());
                const userData = userSnapshot.data() as User;
                console.log('UserData: ',userData);

                if (userData){
                    const displayName = userData.displayName || '';
                    const photoURL = userData.photoURL || '';
                    
                    await this.storageService.set('user', {
                        uid: uid,
                        email: userData.email,
                        photoURL: photoURL,
                        displayName: displayName,
                        nickname: userData.nickname,
                        edad: userData.edad,
                        altura: userData.altura,
                        peso: userData.peso,
                        nivelActividad: userData.nivelActividad,
                        meta: userData.meta,
                        genero: userData.genero,
                        firstLoginStatus: userData.firstLoginStatus
                    })
                    console.log("Datos login storage: ", this.storageService.get('user'))
                }
                return {success: true, message: 'Login exitoso!', firsLoginStatus: userData.firstLoginStatus}
            }else {
                return { success: false, message: "Error de autentificación, usuario no encontrado",firsLoginStatus: false };
            }
        }catch(error: any) {
            let errorMessage = 'Error during login';
      
            switch (error.code) {
              case 'auth/user-not-found':
                errorMessage = 'Usuario no encontrado. Por favor verifíca las credenciales.';
                break;
              case 'auth/wrong-password':
                errorMessage = 'Contraseña incorrecta. Intentalo de nuevo.';
                break;
              case 'auth/invalid-email':
                errorMessage = 'Email no válido';
                break;
              default:
                errorMessage += ': ' + error.message;
                break;
            }
      
            return { success: false, message: errorMessage, firsLoginStatus: false  };
        }
    }
}









