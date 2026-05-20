/**
 * Componente Notificaciones
 *
 * Muestra las notificaciones del paciente (citas aprobadas, rechazadas, etc.)
 * con soporte de búsqueda en tiempo real por título o mensaje.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class Notificaciones {
    /** Texto ingresado por el usuario para filtrar notificaciones. */
    busqueda: string = '';

    /** Lista de notificaciones disponibles para el paciente. */
    notificaciones = [
      {
        titulo: 'Cita aprobada',
        mensaje: 'Tu cita de Consulta de medicina general fue confirmada',
        tiempo: 'Hace 2 min',
        accion: 'Ver cita',
        tipo: 'aprobada'
      }
    ];

    /**
     * Retorna las notificaciones que coincidan con el texto de búsqueda
     * en su título o mensaje. La comparación no distingue mayúsculas.
     */
    notificacionesFiltradas() {
      return this.notificaciones.filter(n =>
        n.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        n.mensaje.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
}
