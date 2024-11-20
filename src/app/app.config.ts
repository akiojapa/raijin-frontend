import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoggingInterceptor } from './app.interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { enviroment } from '../enviroments/enviroments'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center', // Classe personalizada para centralizar o toast
      timeOut: 5000, // Tempo de exibição do toast
      extendedTimeOut: 1000, // Tempo adicional de exibição do toast
      closeButton: true, // Adiciona um botão de fechar
      progressBar: true, // Adiciona uma barra de progresso
      tapToDismiss: true, // Permite fechar o toast ao clicar nele
    }),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: APP_INITIALIZER, useFactory: resolveEnviroment, deps: [ConfigService, DOCUMENT], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
};

function resolveEnviroment(httpService: ConfigService, document: Document) {

  return () => new Promise((resolve) => {
    if (enviroment.ambience === "STAGE") {
      httpService.baseUrl = `http://${enviroment.baseUrl}`;
    }

    if (enviroment.ambience === "DEV") {
      const url = document.location.hostname
      const domains = url.split('.')
      const path = domains.length > 1 ? `${domains[0]}.` : ''

      httpService.baseUrl = `http://${path}${enviroment.baseUrl}`;
    }

    resolve(true)
  });
}
