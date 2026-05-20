import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas implements OnInit {

  private authService = inject(AuthService);

  citas: any[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    const documento = localStorage.getItem('mc_documento');

    if (!documento) {
      this.error = 'No hay usuario logueado';
      this.cargando = false;
      return;
    }

    this.authService.get<any[]>(`Citas/${documento}`)
      .subscribe({
        next: (data) => {
          this.citas = data;
          this.cargando = false;
        },
        error: () => {
          this.error = 'Error al cargar citas';
          this.cargando = false;
        }
      });
  }
}