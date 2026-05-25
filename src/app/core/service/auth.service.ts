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
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
          this.saveAuth(response.token, response.correo, response.role, response.documento);
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

  crearCita(body: any): Observable<any> {
    const token = localStorage.getItem('mc_token');
    const header = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.post(
      `${this.apiUrl}/Citas`, body,
      { headers: header }
    );
  }

  marcarNotificacionLeida(codigo: number): Observable<any> {
    const token = localStorage.getItem('mc_token');
    const header = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.delete(
      `${this.apiUrl}/notificacion/${codigo}`,
      { headers: header }
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
    const token = localStorage.getItem('mc_token');
    const header = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.get<T>(
      `${this.apiUrl}/${path.replace(/^\//, '')}`,
      { headers: header }
    );
  }

  /**
   * Persiste las credenciales del usuario en localStorage tras un login exitoso.
   *
   * @param token - JWT recibido del backend
   * @param correo - correo electrónico del usuario autenticado
   * @param role - rol del usuario (ej. PACIENTE, MEDICO)
   * @param documento - número de documento de identidad del usuario
   */
  saveAuth(token: string, correo: string, role: string, documento: string): void {
    localStorage.setItem('mc_token', token);
    localStorage.setItem('mc_correo', correo);
    localStorage.setItem('mc_role', role);
    localStorage.setItem('mc_documento', documento);
  }

  /**
   * Recupera el token JWT almacenado en localStorage.
   *
   * @returns El token JWT o `null` si el usuario no está autenticado.
   */
  getToken(): string | null {
    return localStorage.getItem('mc_token');
  }

  /**
   * Recupera el correo del usuario autenticado desde localStorage.
   *
   * @returns El correo o `null` si no existe sesión activa.
   */
  getCorreo(): string | null {
    return localStorage.getItem('mc_correo');
  }

  /**
   * Elimina todas las credenciales del usuario del localStorage.
   * Equivale a cerrar sesión en el lado del cliente.
   */
  clearAuth(): void {
    localStorage.removeItem('mc_token');
    localStorage.removeItem('mc_correo');
    localStorage.removeItem('mc_role');
    localStorage.removeItem('mc_documento');
  }
}