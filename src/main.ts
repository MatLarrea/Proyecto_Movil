import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from './environments/environment';

import { enableProdMode } from '@angular/core';
if (environment.production) {
  enableProdMode();
}

// Inicializa Firebase con la configuración del entorno
const firebaseApp = initializeApp(environment.firebaseConfig);

// Configura la autenticación (opcional, ya que puedes obtener auth en tu componente)
const auth = getAuth(firebaseApp);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
