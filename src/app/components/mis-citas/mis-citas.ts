import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-citas',
  imports: [CommonModule],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas {
    citas = [
      {
        tipo: 'Consulta de medicina general',
        centro: 'Clínica Central',
        ciudad: 'Manizales',
        fecha: '12 mayo 2026 - 11:30',
        estado: 'Confirmada'
      },
      {
        tipo: 'Odontología',
        centro: 'Clínica Dental Sonrisa',
        ciudad: 'Medellín',
        fecha: '',
        estado: 'Pendiente'
      }
    ];
}
