import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertControllerService } from '../service/AlertController.service';
import { UserRegistratonUseCase } from '../use-cases/user-registration.use-case';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertControllerService, private userRegistration: UserRegistratonUseCase) { } // Inyectar AlertController

  ngOnInit() {}

  // Método para registrar un nuevo usuario
  async onRegisterButtonPressed() {

    //ojo si no trabaja en segundo plano no puedes acceder a la información del resultado
    const result = await this.userRegistration.performRegistration(this.email, this.password);

    if (result.success){
      
      this.alertController.showAlert(result.message, '¡Bienvenido!')
      this.router.navigate(['/login-form']);
     
    }else {

      this.alertController.showAlert(result.message, '¡Error!')
    }
  }

  
}
