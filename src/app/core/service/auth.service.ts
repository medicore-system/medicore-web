/**
 * Servicio de autenticación (AuthService)
 *
 * Este servicio centraliza todas las peticiones HTTP relacionadas con:
 * - Login de usuarios
 * - Registro de usuarios
 * - Consultas GET genéricas hacia la API
 *
 * Se utiliza `providedIn: 'root'` para que sea un servicio singleton
 * disponible en toda la aplicación sin necesidad de registrarlo en módulos.
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * HttpClient inyectado para realizar peticiones HTTP
   */
  private http = inject(HttpClient);

  /**
   * URL base del backend obtenida desde environment
   */
  private apiUrl = environment.apiUrl;

  /**
   * Realiza login de usuario.
   *
   * @param correo - correo del usuario
   * @param contrasena - contraseña del usuario
   * @returns Observable con respuesta del backend (token, usuario, etc.)
   */
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/login`,
      { correo, contrasena }
    ).pipe(
      tap(response => {
        if (response?.token) {
          this.saveAuth(response.token, response.correo, response.role);
        }
      })
    );
  }

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param body - objeto con los datos del usuario
   * @returns Observable con respuesta del backend
   */
  register(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/register`,
      body
    );
  }

  

  /**
   * Petición GET genérica reutilizable.
   *
   * Permite consumir cualquier endpoint sin crear métodos adicionales.
   * Ejemplo:
   * - get<City[]>('cities')
   * - get<Eps[]>('eps')
   *
   * IMPORTANTE:
   * - Elimina automáticamente "/" inicial para evitar URLs duplicadas
   * - Asegura consistencia en la construcción de la URL
   *
   * @param path - ruta del endpoint (con o sin "/")
   * @returns Observable tipado
   */
  get<T>(path: string): Observable<T> {
    return this.http.get<T>(
      `${this.apiUrl}/${path.replace(/^\//, '')}`
    );
  }

  saveAuth(token: string, correo: string, role: string): void {
    localStorage.setItem('mc_token', token);
    localStorage.setItem('mc_correo', correo);
    localStorage.setItem('mc_role', role);
  }

  getToken(): string | null {
    return localStorage.getItem('mc_token');
  }

  getCorreo(): string | null {
    return localStorage.getItem('mc_correo');
  }

  clearAuth(): void {
    localStorage.removeItem('mc_token');
    localStorage.removeItem('mc_correo');
    localStorage.removeItem('mc_role');
  }
}