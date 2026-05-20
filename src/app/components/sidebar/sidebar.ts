/**
 * Componente Sidebar
 *
 * Barra lateral de navegación de la sección autenticada.
 * Contiene los enlaces a las rutas principales: Solicitar Cita,
 * Mis Citas e Historial Clínico, con resaltado de ruta activa via routerLinkActive.
 */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {}
