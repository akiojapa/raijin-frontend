import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoggingInterceptor } from './app.interceptors';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: APP_INITIALIZER, useFactory: resolveEnviroment, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
};

function resolveEnviroment() {
  const httpService: ConfigService = inject(ConfigService);
  const document = inject(DOCUMENT);

  return () => new Promise((resolve) => {
    const url = document.location.hostname
    const domains = url.split('.')
    const path = domains.length > 1 ? `${domains[0]}.` : ''

    const environment = require('../assets/config.json');
    httpService.baseUrl = `http://${path}${environment.baseUrl}`;
    resolve(true)
  });
}
