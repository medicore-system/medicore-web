/**
 * Configuración principal de rutas de la aplicación Angular.
 *
 * Este archivo define cómo se navega entre las diferentes vistas
 * de la aplicación utilizando el Router de Angular.
 *
 * IMPORTANTE:
 * Actualmente existen múltiples componentes usados como "layouts"
 * (Home, MainPage, Skeleton), lo cual puede generar inconsistencias
 * en la arquitectura si no se controla correctamente.
 */

import { Routes } from '@angular/router';

/**
 * Página principal tipo Home.
 * Actualmente se está utilizando como posible layout inicial.
 * No contiene rutas hijas.
 */
import { Home } from './pages/home/home';

/**
 * Página principal del sistema.
 * Contiene funcionalidades internas relacionadas con citas.
 */
import { MainPage } from './pages/main-page/main-page';

/**
 * Componentes funcionales dentro del módulo de citas.
 */
import { SolicitarCita } from './components/solicitar-cita/solicitar-cita';
import { MisCitas } from './components/mis-citas/mis-citas';
import { Historial } from './components/historial/historial';
import { Notificaciones } from './components/notificaciones/notificaciones';

/**
 * Componentes de autenticación y registro.
 */
import { Register } from './components/register/register';

/**
 * Skeleton o layout principal alternativo.
 * Actualmente parece usarse como contenedor visual global.
 */
import { Skeleton } from './components/skeleton/skeleton';

/**
 * Definición de rutas de la aplicación.
 */
export const routes: Routes = [

    /**
     * Ruta raíz.
     * Actualmente carga el componente Home.
     * No tiene rutas hijas definidas.
     */
    {
        path: '',
        component: Home,
        children: []
    },

    /**
     * Ruta principal del módulo de citas.
     * Contiene subrutas internas para la gestión de citas.
     */
    {
        path: 'main-page',
        component: MainPage,
        children: [

            /**
             * Subruta: solicitar una cita médica.
             */
            { path: 'solicitar-cita', component: SolicitarCita },

            /**
             * Subruta: ver citas del usuario.
             */
            { path: 'mis-citas', component: MisCitas },

            /**
             * Subruta: historial médico o de citas.
             */
            { path: 'historial', component: Historial },

            /**
             * Subruta: notificaciones del sistema.
             */
            { path: 'notificaciones', component: Notificaciones },

            /**
             * Redirección por defecto dentro de main-page.
             * Si no se especifica subruta, redirige a solicitar-cita.
             */
            { path: '', redirectTo: 'solicitar-cita', pathMatch: 'full' },
        ]
    },

    /**
     * Ruta independiente de notificaciones.
     * Nota: también está incluida dentro de main-page,
     * lo cual puede generar duplicidad de rutas.
     */
    {
        path: 'notificaciones',
        component: Notificaciones
    },

    /**
     * Ruta de registro de usuarios.
     */
    {
        path: 'register',
        component: Register
    },

    /**
     * Ruta del layout Skeleton.
     * Actualmente funciona como contenedor visual alternativo.
     * No tiene rutas hijas definidas.
     *
     * RECOMENDACIÓN:
     * Si Skeleton es un layout, debería manejar children con router-outlet.
     */
    {
        path: 'skeleton',
        component: Skeleton
    }
];