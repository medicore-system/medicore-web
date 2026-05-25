/**
 * Componente Notificaciones
 *
 * Muestra las notificaciones del paciente (citas aprobadas, rechazadas, etc.)
 * Consume el endpoint `notificacion/{correo}` para obtener las notificaciones
 * y permite marcarlas como leídas.
 */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

const correo_Paciente = localStorage.getItem('mc_correo') || '';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class Notificaciones implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  /** Lista de notificaciones del paciente obtenidas desde el backend. */
  notificaciones: any[] = [];

  /**
   * Ciclo de vida: carga las notificaciones al montar el componente.
   */
  ngOnInit() {
    this.cargarNotificaciones();
  }

  /**
   * Obtiene las notificaciones del paciente autenticado desde el backend.
   */
  cargarNotificaciones() {
    this.authService.get<any[]>(`notificacion/${correo_Paciente}`).subscribe({
      next: (res) => {
        this.notificaciones = res;
        this.cdr.detectChanges();
      },
      error: err => console.log('Error notificaciones', err)
    });
  }

  /**
   * Marca una notificación como leída por su índice en el arreglo.
   * Recarga las notificaciones y la página tras la operación.
   *
   * @param index - Índice de la notificación en el arreglo `notificaciones`
   */
  marcarLeido(index: number){
    const notificacion = this.notificaciones[index];
    const codigo = notificacion.codigo;
    this.authService.marcarNotificacionLeida(codigo).subscribe({
      next: (res) => {
        this.cargarNotificaciones();
        this.cdr.detectChanges();
      },
      error: err => console.error('Error al marcar notificación como leída', err)
    });
  }
}
