import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/service/auth.service';

interface HistorialInfo {
  codigo: string;
  fecha: any;
  tipo: string;
  descripcion: string;
  documentoPaciente: string;
  nombrePaciente: string;
  documentoMedico: string;
  nombreMedico: string;
}

interface Registro {
  codigo: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  procedimiento: string;
  resultados: string;
  codigoHistorial: string;
  historialClinico: HistorialInfo | null;
}

interface UsuarioInfo {
  documento: string;
  nombre: string;
  apellido: string;
  correo: string;
  eps: string;
  ciudad: string;
  telefono: string;
}

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {
  registros: Registro[] = [];
  usuario: UsuarioInfo | null = null;
  cargando = true;
  error = false;
  fechaGeneracion = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  seleccionados = new Set<string>();

  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarHistorial();
  }

  private cargarHistorial(): void {
    const correo = this.authService.getCorreo();
    if (!correo) {
      this.error = true;
      this.cargando = false;
      return;
    }

    this.authService.get<any[]>('Usuarios').pipe(
      switchMap((usuarios: any[]) => {
        const usuario = usuarios.find((u: any) => u.correo === correo);
        if (!usuario) {
          this.error = true;
          this.cargando = false;
          return of([]);
        }
        this.usuario = usuario;

        return this.authService.get<any[]>('services').pipe(
          switchMap((servicios: any[]) => {
            const conHistorial = servicios.filter((s: any) => s.codigoHistorial);
            if (conHistorial.length === 0) return of([]);

            const llamadas = conHistorial.map((s: any) =>
              this.authService.get<Registro>(`services/${s.codigo}`).pipe(
                catchError(() => of(null))
              )
            );

            return forkJoin(llamadas).pipe(
              catchError(() => of([]))
            );
          }),
          catchError(() => of([]))
        );
      }),
      catchError(() => {
        this.error = true;
        return of([]);
      })
    ).subscribe((detalles: any[]) => {
      if (this.usuario) {
        this.registros = detalles
          .filter(d => d !== null && d?.historialClinico?.documentoPaciente === this.usuario!.documento)
          .map(d => d as Registro);
      }
      this.cargando = false;
      this.seleccionados = new Set(this.registros.map(r => r.codigoHistorial));
      this.cdr.detectChanges();
    });
  }

  formatFecha(fecha: any): string {
    if (!fecha) return '—';
    if (Array.isArray(fecha)) {
      return new Date(fecha[0], fecha[1] - 1, fecha[2]).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    }
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  toggleSeleccion(codigo: string): void {
    if (this.seleccionados.has(codigo)) {
      this.seleccionados.delete(codigo);
    } else {
      this.seleccionados.add(codigo);
    }
    this.seleccionados = new Set(this.seleccionados);
  }

  estaSeleccionado(codigo: string): boolean {
    return this.seleccionados.has(codigo);
  }

  get todosSeleccionados(): boolean {
    return this.registros.length > 0 && this.seleccionados.size === this.registros.length;
  }

  toggleTodos(): void {
    if (this.todosSeleccionados) {
      this.seleccionados = new Set();
    } else {
      this.seleccionados = new Set(this.registros.map(r => r.codigoHistorial));
    }
  }

  exportarPDF(): void {
    window.print();
  }
}
