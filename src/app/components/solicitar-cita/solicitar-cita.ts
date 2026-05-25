/**
 * Componente SolicitarCita
 *
 * Vista para que el paciente solicite una nueva cita médica.
 * Carga los catálogos de tipos de cita y especialidades desde el backend,
 * genera slots de disponibilidad y permite agendar una cita.
 */
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeaderCitas } from "../header-citas/header-citas";
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

const documento_Paciente = localStorage.getItem('mc_documento') || '';

@Component({
  selector: 'app-solicitar-cita',
  standalone: true,
  imports: [HeaderCitas, CommonModule, FormsModule],
  templateUrl: './solicitar-cita.html',
  styleUrl: './solicitar-cita.css',
})

export class SolicitarCita implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  //FORM DATA
  fecha: string = '';
  costo: number = 0;
  id_especialidad: number = 0;
  id_tipo: number = 0;
  documento_paciente = documento_Paciente;
  documento_medico: string = '';
  codigo_hospital: string = '';

  /** Lista de tipos de cita disponibles obtenida desde el backend. */
  tiposCitas: any[] = [];

  /** Lista de especialidades médicas obtenida desde el backend. */
  especialidades: any[] = [];

  /** Slots de disponibilidad generados según especialidad y tipo de cita seleccionados. */
  slots: any[] = [];

  /**
   * Ciclo de vida: carga los catálogos de tipos de cita y especialidades al montar el componente.
   */
  ngOnInit() {
    this.cargarTiposCitas();
    this.cargarEspecialidades();
  }

  /**
   * Obtiene los tipos de cita disponibles desde el endpoint `tipoCita`.
   */
  cargarTiposCitas() {
    this.authService.get<any[]>('tipoCita').subscribe({
      next: (res) => {
        this.tiposCitas = res;
        this.cdr.detectChanges();
      },
      error: err => console.error('Error tipos de cita', err)
    });
  }

  /**
   * Obtiene las especialidades médicas disponibles desde el endpoint `especialidad`.
   */
  cargarEspecialidades() {
    this.authService.get<any[]>('especialidad').subscribe({
      next: (res) => {
        this.especialidades = res;
        this.cdr.detectChanges();
      },
      error: err => console.error('Error especialidades', err)
    });
  }

  /**
   * Consulta los slots de disponibilidad según la especialidad y tipo de cita seleccionados.
   * Requiere que ambos campos estén seleccionados antes de hacer la petición.
   */
  generarSlots(){
    if (!this.id_especialidad || !this.id_tipo) {
      alert("Debes seleccionar especialidad y tipo de cita");
      return;
    }
    const idEspecialidad = this.id_especialidad;
    const idTipo = this.id_tipo;

    this.authService.get<any[]>('disponibilidad/slots/'+idEspecialidad+'/'+idTipo).subscribe({
      next: (res) => {
        this.slots = res;
        this.cdr.detectChanges();
        console.log('Slots API:', res);
      },
      error: err => console.error('Error al cargar slots', err)
    });
  }

  /**
   * Agenda la cita correspondiente al slot seleccionado.
   * Construye el body con los datos del slot y del paciente, y llama al endpoint de creación.
   * Si tiene éxito, redirige a `/main-page/mis-citas`.
   *
   * @param index - Índice del slot seleccionado en el arreglo `slots`
   */
  agendarCita(index: number) {
    const slot = this.slots[index];
    const body = {
      fecha: slot.fecha,
      costo: slot.costo,
      id_especialidad: this.id_especialidad,
      id_tipo: this.id_tipo,
      documento_paciente: this.documento_paciente,
      documento_medico: slot.documentoMedico,
      codigo_hospital: slot.codigoHospital
    }
    this.authService.crearCita(body).subscribe({
      next: (response) => {
        console.log('Cita creada', response);
        this.router.navigate(['/main-page/mis-citas']);
      },
      error: (error) => {
        console.error('Error Register', error);
        this.cdr.detectChanges();
      }
    });
  }
}
