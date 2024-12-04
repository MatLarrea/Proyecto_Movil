import { StorageService } from "../service/Storage.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class userLogoutUseCase{

    constructor(private storageService: StorageService, private fireAuth: AngularFireAuth){

    }

    async performLogout(): Promise<{ success: boolean; message: string }>{
    
        try{

            //Cerrar sesión de firebase
            await this.fireAuth.signOut();

            //Limpiar datos de ionic storage
            await this.storageService.clear();
            console.log('Logout: ' + this.storageService.get('user'))
            return {success: true, message: "Sesión finalizada"}
        }catch(error: any){
            let ErrorMessage: "Error al cerrar sesión"

            if(error.message){
                ErrorMessage += ' ' + error.message;
            }
            
            return {success: false, message: ErrorMessage}
        }
    }
}