import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial {
    prioridades = ['PRIORIDAD I', 'PRIORIDAD II', 'PRIORIDAD III', 'PRIORIDAD IV', 'PRIORIDAD V'];

    registros = [
      {
        centro: 'Hospital Central Bogota',
        fecha: '12 marzo - 2025',
        medico: 'Dr. Miguel Garcia',
        motivo: 'El paciente se presenta con dolor torácico agudo y dificultad para respirar que comenzó hace aproximadamente cuatro horas. Los síntomas han empeorado progresivamente, y debido a su historial de hipertensión y tabaquismo, se decide su ingreso para una evaluación más exhaustiva y tratamiento inmediato',
        triage: 'PRIORIDAD III',
        incapacidad: 'NO',
        origen: 'Comun',
        tipoIncapacidad: 'AMBULATORIA',
        codigoServicio: '890301 - CONSULTA DE CONTROL O DE SEGUIMIENTO POR MEDICINA GENERAL'
      },
      {
        centro: 'Hospital Central Bogota',
        fecha: '12 junio - 2025',
        medico: 'Dr. Cristian Peñuela',
        motivo: '',
        triage: 'PRIORIDAD II',
        incapacidad: 'NO',
        origen: 'Comun',
        tipoIncapacidad: 'AMBULATORIA',
        codigoServicio: ''
      }
    ];
}
