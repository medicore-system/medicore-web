 /**
  * Archivo de configuración de entorno (environment)
  *
  * Angular utiliza este archivo para definir variables globales
  * que cambian según el entorno de ejecución:
  * - desarrollo (development)
  * - producción (production)
  *
  * Este archivo corresponde al entorno de desarrollo.
  */

export const environment = {

  /**
   * Indica si la aplicación está en modo producción.
   * - false: entorno de desarrollo (local)
   * - true: entorno productivo (deploy)
   */
  production: false,

  /**
   * URL base del backend (API REST).
   *
   * Todas las peticiones HTTP deben construirse a partir de esta URL.
   * Ejemplo de uso:
   * `${environment.apiUrl}/auth/login`
   */
  apiUrl: 'http://localhost:8080'
};