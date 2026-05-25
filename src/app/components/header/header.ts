/**
 * Componente Header
 *
 * Barra de navegación superior de la pantalla pública (home/login).
 * Muestra el logo y los enlaces de navegación hacia login y registro.
 */
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
