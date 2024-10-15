import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) { } // Inyectar AlertController

  ngOnInit() {}

  // Método para registrar un nuevo usuario
  async onRegisterButtonPressed() {
    if (this.email && this.password) { // Validación para que no esté vacío
      try {
        const auth = getAuth(); // Obtener la instancia de autenticación
        // Crear el usuario con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        console.log('Registro exitoso:', userCredential);
        
        // Redirigir al usuario a la página de inicio de sesión o a otra página
        this.router.navigate(['/login-form']);
        this.showAlert('Usuario registrado con éxito.');
      } catch (error: any) {
        // Manejar errores de registro
        console.error('Error en el registro:', error);
        if (error.code === 'auth/email-already-in-use') {
          this.showAlert('El correo ya está en uso.');
        } else if (error.code === 'auth/invalid-email') {
          this.showAlert('El correo no es válido.');
        } else if (error.code === 'auth/weak-password') {
          this.showAlert('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
        } else {
          this.showAlert('Error en el registro. Inténtalo de nuevo.');
        }
      }
    } else {
      this.showAlert('Por favor ingresa un correo y una contraseña.');
    }
  }

  // Método para mostrar alertas usando Ionic
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
