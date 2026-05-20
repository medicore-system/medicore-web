/**
 * Componente SolicitarCita
 *
 * Vista para que el paciente solicite una nueva cita médica.
 * Actualmente actúa como contenedor visual del formulario definido en el template.
 */
import { Component } from '@angular/core';
import { HeaderCitas } from "../header-citas/header-citas";

@Component({
  selector: 'app-solicitar-cita',
  imports: [HeaderCitas],
  templateUrl: './solicitar-cita.html',
  styleUrl: './solicitar-cita.css',
})
export class SolicitarCita {}
