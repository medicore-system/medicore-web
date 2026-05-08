import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optimización de detección de cambios (Angular 18)
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // Configuración de rutas con soporte para transiciones y parámetros
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()), 
    
    // Cliente HTTP configurado para usar fetch (más moderno y rápido)
    provideHttpClient(withFetch()), 
    
    // Soporte para animaciones del navegador (requerido por muchos componentes de UI)
    provideAnimations()
  ]
};