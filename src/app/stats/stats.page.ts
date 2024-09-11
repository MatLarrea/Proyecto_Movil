import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  statsForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.statsForm = this.formBuilder.group({
      nickname: ['', [Validators.required]],
      height: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      age: ['', [Validators.required, Validators.min(1)]],
      activityLevel: ['', [Validators.required]],
      goal: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.statsForm.valid) {
      console.log(this.statsForm.value);
      // Aquí puedes manejar el envío del formulario
    } else {
      console.log('Form not valid');
    }
  }
}
