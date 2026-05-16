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
    busqueda: string = '';

    notificaciones = [
      {
        titulo: 'Cita aprobada',
        mensaje: 'Tu cita de Consulta de medicina general fue confirmada',
        tiempo: 'Hace 2 min',
        accion: 'Ver cita',
        tipo: 'aprobada'
      }
    ];

    notificacionesFiltradas() {
      return this.notificaciones.filter(n =>
        n.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        n.mensaje.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
}
