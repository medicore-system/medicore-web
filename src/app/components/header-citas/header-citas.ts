/**
 * Componente HeaderCitas
 *
 * Header interno de la sección autenticada (main-page).
 * Recibe el título y subtítulo de la vista activa vía @Input
 * y los muestra de forma dinámica según la ruta seleccionada.
 */
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-citas.html',
  styleUrl: './header-citas.css',
})
export class HeaderCitas {
  /** Título principal de la sección activa (ej. "Mis Citas"). */
  @Input() titulo: string = '';

  /** Subtítulo descriptivo de la sección activa. */
  @Input() subtitulo: string = '';
}
