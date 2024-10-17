import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth = getAuth();  // Inicializa el objeto de autenticación de Firebase

  constructor() {
    console.log('FirebaseService initialized with auth:', this.auth);
  }

  async signIn(email: string, password: string) {
    console.log('Attempting to sign in with email:', email);
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Sign in successful:', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;  // Lanza el error para manejarlo en el componente
    }
  }
}
