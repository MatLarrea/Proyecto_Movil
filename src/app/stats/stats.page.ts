import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  statsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  onSubmit() {
    if (this.statsForm.valid) {
      // Navegación a la página 'home', pasando los datos del formulario
      this.router.navigate(['/home'], {
        queryParams: { ...this.statsForm.value }
      });
    }
  }
}
