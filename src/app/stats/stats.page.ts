import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../service/Storage.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {

  statsForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router, private storageService: StorageService) {
    
    this.statsForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      altura: ['', Validators.required],
      peso: ['', Validators.required],
      edad: ['', Validators.required],
      nivelActividad: ['', Validators.required],
      meta: ['', Validators.required],
      genero: ['', Validators.required],

    });

    
  }

  async onSubmit() {

    const userStats = {
      nickname: this.statsForm.get('nickname')?.value,
      altura: this.statsForm.get('altura')?.value,
      peso: this.statsForm.get('peso')?.value,
      edad: this.statsForm.get('edad')?.value,
      nivelActividad: this.statsForm.get('nivelActividad')?.value,
      meta: this.statsForm.get('meta')?.value,
      genero: this.statsForm.get('genero')?.value,
    }
   

    if (this.statsForm.valid) {
      // Navegación a la página 'home', pasando los datos del formulario
      try{
        this.storageService.set('userStats', userStats)
        console.log('User Stats', this.storageService.get('userStats'))
        this.router.navigate(['/home'], {
        //queryParams: { ...this.statsForm.value }
      });
      }catch (error) {
        console.error('Error al cargar stats en la persistencia')
      }
      
    }
  }
}
