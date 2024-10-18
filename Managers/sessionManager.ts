import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})

export class SessionManager {

    constructor(private fireAuth: AngularFireAuth){

    }

    async signOut(){
        return await this.fireAuth.signOut();
    }
}