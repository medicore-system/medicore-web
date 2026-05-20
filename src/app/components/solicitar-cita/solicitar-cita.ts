import { Component, inject, OnInit } from '@angular/core';
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

  //FORM DATA
  fecha: string = '';
  costo: number = 0;
  id_especialidad: number = 0;
  id_tipo: number = 0;
  documento_paciente = documento_Paciente;
  documento_medico: string = '';
  codigo_hospital: string = '';
  
  tiposCitas: any[] = [];
  especialidades: any[] = [];
  slots: any[] = [];

  ngOnInit() {
    this.cargarTiposCitas();
    this.cargarEspecialidades();
  }

  cargarTiposCitas() {
    this.authService.get<any[]>('tipoCita').subscribe({
      next: (res) => {
        this.tiposCitas = res;
      },
      error: err => console.error('Error tipos de cita', err)
    });
  }

  cargarEspecialidades() {
    this.authService.get<any[]>('especialidad').subscribe({
      next: (res) => {
        this.especialidades = res;
      },
      error: err => console.error('Error especialidades', err)
    });
  }

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
        console.log('Slots API:', res);
      },
      error: err => console.error('Error al cargar slots', err)
    });
  }

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
      }
    });
  }
}
