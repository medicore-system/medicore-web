import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  notificaciones: any[] = [];

  ngOnInit() {
    this.cargarNotificaciones();
  }

  cargarNotificaciones() {
    this.authService.get<any[]>(`notificacion/${correo_Paciente}`).subscribe({
      next: (res) => {
        this.notificaciones = res;
      },
      error: err => console.log('Error notificaciones', err)
    });
  }

  marcarLeido(index: number){
    const notificacion = this.notificaciones[index];
    const codigo = notificacion.codigo;
    this.authService.marcarNotificacionLeida(codigo).subscribe({
      next: (res) => {
        this.cargarNotificaciones();
        window.location.reload();
      },
      error: err => console.error('Error al marcar notificación como leída', err)
    });
  }
}
