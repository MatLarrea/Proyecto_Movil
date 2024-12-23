import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/Storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    
  }

  async ionViewDidEnter(){
    this.checkSession();
  }

  async checkSession(){
    const user = await this.storageService.get('user');
    if(user){
      this.router.navigate(['/tab']);
    }else{
      this.router.navigate(['/login-form']);
    }
  }
}
