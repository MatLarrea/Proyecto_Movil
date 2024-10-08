import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'Managers/sessionManager';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  constructor(private router: Router, private sessionManager: SessionManager){ }
  
  user: string = '';
  password: string = '';
    
  ngOnInit() {

  }

  onLoginButtonPressed() {
    if(this.sessionManager.performLogin(this.user, this.password)) {
      this.router.navigate(['/stats']);
    } else {
      this.user=''
      this.password=''
      alert('Las credenciales ingresadas son inválidas.')
    }
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/register'])
  }
}
