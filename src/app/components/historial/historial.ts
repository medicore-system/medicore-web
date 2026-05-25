/**
 * Componente Historial
 *
 * Muestra el historial clínico del paciente autenticado.
 * Realiza tres llamadas encadenadas al backend:
 *   1. Obtiene la lista de usuarios para identificar al paciente por correo.
 *   2. Obtiene todos los servicios médicos con historial asociado.
 *   3. Por cada servicio, obtiene el detalle y filtra los del paciente.
 *
 * Permite seleccionar registros individualmente o en bloque, y exportar a PDF.
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/service/auth.service';

/** Datos del historial clínico asociado a un servicio médico. */
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

/** Detalle de un servicio médico con su historial clínico embebido. */
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

/** Información básica del paciente autenticado. */
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
  /** Registros del historial clínico del paciente filtrados desde el backend. */
  registros: Registro[] = [];

  /** Datos del usuario autenticado obtenidos desde el backend. */
  usuario: UsuarioInfo | null = null;

  /** Indica si la carga de datos está en progreso. */
  cargando = true;

  /** Indica si ocurrió un error durante la carga de datos. */
  error = false;

  /** Fecha formateada de generación del historial (usada en la exportación a PDF). */
  fechaGeneracion = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /** Conjunto de códigos de historial actualmente seleccionados para exportar. */
  seleccionados = new Set<string>();

  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  /**
   * Ciclo de vida: inicia la carga del historial clínico al montar el componente.
   */
  ngOnInit(): void {
    this.cargarHistorial();
  }

  /**
   * Carga el historial clínico del paciente autenticado.
   * Encadena tres peticiones: usuarios → servicios con historial → detalle de cada servicio.
   * Filtra solo los registros cuyo `documentoPaciente` coincide con el del usuario logueado.
   */
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

  /**
   * Formatea una fecha recibida del backend al formato largo en español (Colombia).
   * Admite tanto fechas en formato array `[año, mes, día]` como strings/Date.
   *
   * @param fecha - Valor de fecha (array, string o Date)
   * @returns Cadena formateada, ej. "12 de enero de 2025", o '—' si es nula.
   */
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

  /**
   * Alterna la selección de un registro por su código de historial.
   * Crea una nueva instancia del Set para forzar la detección de cambios en Angular.
   *
   * @param codigo - Código del historial clínico a seleccionar/deseleccionar
   */
  toggleSeleccion(codigo: string): void {
    if (this.seleccionados.has(codigo)) {
      this.seleccionados.delete(codigo);
    } else {
      this.seleccionados.add(codigo);
    }
    this.seleccionados = new Set(this.seleccionados);
  }

  /**
   * Comprueba si un registro está actualmente seleccionado.
   *
   * @param codigo - Código del historial a verificar
   * @returns `true` si el registro está seleccionado
   */
  estaSeleccionado(codigo: string): boolean {
    return this.seleccionados.has(codigo);
  }

  /** `true` cuando hay registros y todos están seleccionados. Usado para el checkbox "seleccionar todo". */
  get todosSeleccionados(): boolean {
    return this.registros.length > 0 && this.seleccionados.size === this.registros.length;
  }

  /**
   * Selecciona todos los registros si no están todos seleccionados; de lo contrario, los deselecciona todos.
   */
  toggleTodos(): void {
    if (this.todosSeleccionados) {
      this.seleccionados = new Set();
    } else {
      this.seleccionados = new Set(this.registros.map(r => r.codigoHistorial));
    }
  }

  /**
   * Exporta el historial clínico a PDF usando el diálogo de impresión del navegador.
   * El CSS de impresión del componente controla qué elementos se muestran en el PDF.
   */
  exportarPDF(): void {
    window.print();
  }
}
