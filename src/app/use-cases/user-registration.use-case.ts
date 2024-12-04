import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable({
    providedIn: 'root'
  })

export class UserRegistratonUseCase {

    constructor (private firestore: AngularFirestore, private fireAuth: AngularFireAuth){

    }

    async performRegistration(email: string, password: string): Promise<{ success: boolean; message: string }>{ 
    
        try {

            //Registro de usuario
            const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);

            // instancia del usuario creado
            const user = userCredential.user;
            
             if (user) {

                const uid = user.uid;
                const displayName = user.displayName || '';
                const photoURL = user.photoURL || '';

                //modelo del usuario para almacenar en la base de datos
                const userData = {

                    uid: uid,
                    displayName: displayName,
                    email: email,
                    photoURL: photoURL,
                    nickname: '',
                    altura: -1,
                    peso: -1,
                    edad: -1,
                    nivelActividad: '',
                    meta: '',
                    genero: '',
                    firstLoginStatus: false
                    
                };

    
                const collection = this.firestore.collection('Users');
                await collection.doc(uid).set(userData);

                //Leer una collección 
                this.firestore.collection('Users').valueChanges().subscribe( (res) => {
                    console.log('usuarios: ',res);
                  });

                
            
             }

            return { success: true, message: "Usuario registrado con éxito" };

        }catch (error: any) {
            // Manejar errores de registro
            let errorMessage = 'Ocurrió un error al registrar el usuario';

            switch (error.code) {

                case 'auth/email-already-in-use':
                    errorMessage = 'El correo ya está en uso.';
                    break;

                case 'auth/invalid-email':
                    errorMessage = 'El correo no es válido.'
                    break; 

                case 'auth/weak-password':
                    errorMessage = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.'
                    break;

                default:
                    errorMessage += ': ' + errorMessage;
                    break;
            }
    
            return {success: false, message: errorMessage};
        }
    }
}