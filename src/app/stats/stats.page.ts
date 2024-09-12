import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Para navegar entre páginas

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage {
  statsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
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
      this.navCtrl.navigateForward('/home', {
        queryParams: { ...this.statsForm.value }
      });
    }
  }
}
