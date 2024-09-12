import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener parámetros


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  nickname: string = '';
  altura: number = 0;
  peso: number = 0;
  edad: number = 0;
  nivelActividad: string = '';
  meta: string = '';
  genero: string= '';
  caloriasDiarias: number = 0;
  caloriasConsumidas: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.nickname = params['nickname'] || '';
        this.altura = params['altura'] || 0;
        this.peso = params['peso'] || 0;
        this.edad = params['edad'] || 0;
        this.nivelActividad = params['nivelActividad'] || '';
        this.meta = params['meta'] || '';
        this.genero = params['genero'] || '';
        this.caloriasDiarias = this.calcularCaloriasDiarias();
      }
    });
  }
  
  calcularCaloriasDiarias(): number {
    // Aquí puedes implementar la lógica para calcular las calorías diarias
    return 2300; // Valor por defecto o según fórmula
  }
  
  
}
