import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertControllerService } from '../service/AlertController.service';
import { userLoginUseCase } from '../use-cases/user-login.use-case';
import { StorageService } from '../service/Storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertControllerService: AlertControllerService, private userLogin: userLoginUseCase,private storageService: StorageService) { } 

  ngOnInit() {}

  async onLoginButtonPressed() {

    const result = await this.userLogin.performeLogin(this.email, this.password);
        
    if(result.success){
      
      this.alertControllerService.showAlert(result.message, '¡Bienvenido!');
      if(result.firsLoginStatus){
        this.router.navigate(['/tab'])
      }else{
        this.router.navigate(['/stats'])
      }
 
    }else{
      
      this.alertControllerService.showAlert(result.message, '¡Error!')
    }     
        

        
  

  }
  // Método para redirigir al registro
  onRegisterButtonPressed() {
    this.router.navigate(['/register']);
  }
}
