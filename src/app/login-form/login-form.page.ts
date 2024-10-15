import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  user: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) { } // Inyectar AlertController

  ngOnInit() {}

  // Método para iniciar sesión utilizando Firebase directamente
  async onLoginButtonPressed() {
    if (this.user && this.password) { // Validación para que no esté vacío
      try {
        const auth = getAuth(); // Obtener la instancia de autenticación
        
        // Intentamos hacer login con el método nativo de Firebase
        const userCredential = await signInWithEmailAndPassword(auth, this.user, this.password);
        console.log('Login exitoso:', userCredential);
        
        // Si el login es exitoso, redirigimos al usuario a la página de estadísticas
        this.router.navigate(['/stats']);
      } catch (error: any) {
        // Manejar errores de autenticación
        console.error('Error en la autenticación:', error);
        this.user = '';
        this.password = '';
        
        // Mostrar mensaje según el tipo de error de Firebase
        if (error.code === 'auth/user-not-found') {
          this.showAlert('Usuario no encontrado.');
        } else if (error.code === 'auth/wrong-password') {
          this.showAlert('Contraseña incorrecta.');
        } else {
          this.showAlert('Las credenciales ingresadas son inválidas.');
        }
      }
    } else {
      this.showAlert('Por favor ingresa un usuario y una contraseña.');
    }
  }

  // Método para mostrar alertas usando Ionic
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para redirigir al registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }
}
