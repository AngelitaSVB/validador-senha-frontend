import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ValidadorSenhaComponent } from './components/validador-senha/validador-senha.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ValidadorSenhaComponent }
    ])
  ]
};
