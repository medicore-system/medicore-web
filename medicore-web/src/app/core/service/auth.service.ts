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
}