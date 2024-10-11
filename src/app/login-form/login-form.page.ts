import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Importar métodos de autenticación de Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  user: string = '';
  password: string = '';

  constructor(private router: Router) { }

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
          alert('Usuario no encontrado.');
        } else if (error.code === 'auth/wrong-password') {
          alert('Contraseña incorrecta.');
        } else {
          alert('Las credenciales ingresadas son inválidas.');
        }
      }
    } else {
      alert('Por favor ingresa un usuario y una contraseña.');
    }
  }

  // Método para redirigir al registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }
}
