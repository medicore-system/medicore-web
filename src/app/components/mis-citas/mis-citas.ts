/**
 * Componente MisCitas
 *
 * Muestra el listado de citas médicas agendadas por el paciente autenticado.
 * Consume el endpoint `Citas/{documento}` usando el documento de identidad
 * almacenado en localStorage tras el login.
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef  } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  /** Lista de citas cargadas desde el backend. */
  citas: any[] = [];

  /** Indica si la petición al backend está en curso. */
  cargando = true;

  /** Mensaje de error a mostrar si la carga falla o no hay sesión. */
  error = '';

  /**
   * Ciclo de vida: inicia la carga de citas al montar el componente.
   */
  ngOnInit(): void {
    this.cargarCitas();
  }

  /**
   * Obtiene las citas del paciente autenticado desde el backend.
   * Usa el documento almacenado en localStorage (`mc_documento`) como identificador.
   */
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
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Error al cargar citas';
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
  }

  cancelarCita(index:number) {
    const cita = this.citas[index];
    const codigo = cita.codigo;
    this.authService.put(`Citas/denegar/${cita.codigo}`, { estado: 'CANCELADA' }).subscribe({
      next:(res)=>{
        this.cargarCitas();
        this.cdr.detectChanges();

      },
      error:err=> window.alert(err)
    });

  } 
}