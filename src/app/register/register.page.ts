import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Importar métodos de autenticación de Firebase
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

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
        alert('Usuario registrado con éxito.');
      } catch (error: any) {
        // Manejar errores de registro
        console.error('Error en el registro:', error);
        if (error.code === 'auth/email-already-in-use') {
          alert('El correo ya está en uso.');
        } else if (error.code === 'auth/invalid-email') {
          alert('El correo no es válido.');
        } else if (error.code === 'auth/weak-password') {
          alert('La contraseña es muy débil. Debe tener al menos 6 caracteres.');
        } else {
          alert('Error en el registro. Inténtalo de nuevo.');
        }
      }
    } else {
      alert('Por favor ingresa un correo y una contraseña.');
    }
  }
}
