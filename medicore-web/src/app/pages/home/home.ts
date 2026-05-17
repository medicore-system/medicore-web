/**
 * Componente Home
 *
 * Este componente representa la página principal de la aplicación.
 * Actualmente actúa como contenedor visual, pero no maneja lógica interna.
 *
 * IMPORTANTE:
 * En una arquitectura Angular bien estructurada, Home no debería
 * mezclar layouts (Header, Footer, Skeleton) si ya existe un layout global
 * manejado por el Router (por ejemplo Skeleton o MainLayout).
 */

import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Skeleton } from "../../components/skeleton/skeleton";
import { Footer } from "../../components/footer/footer";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,

  /**
   * Componentes importados para uso en el template HTML.
   * - Header: barra superior de la aplicación
   * - Skeleton: posible layout principal (sidebar + router-outlet)
   * - Footer: pie de página
   * - RouterModule: permite navegación con router-outlet o routerLink
   */
  imports: [Header, Skeleton, Footer, RouterModule],

  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  /**
   * Actualmente este componente no contiene lógica.
   * Se mantiene como contenedor visual.
   */

}