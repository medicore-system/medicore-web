/**
 * Componente MainPage
 *
 * Layout principal de la aplicación autenticada.
 * Contiene el Sidebar, el HeaderCitas y el RouterOutlet donde se renderizan
 * las subrutas de /main-page (solicitar-cita, mis-citas, historial, notificaciones).
 *
 * Actualiza dinámicamente el título y subtítulo del header según la ruta activa.
 */
import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../components/sidebar/sidebar";
import { HeaderCitas } from "../../components/header-citas/header-citas";
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-page',
  imports: [Sidebar, HeaderCitas, RouterOutlet],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage implements OnInit {

  /** Título principal que se muestra en el HeaderCitas según la ruta activa. */
  tituloActual: string = '';

  /** Subtítulo descriptivo que acompaña al título en el HeaderCitas. */
  subtituloActual: string = '';

  /**
   * Mapa de segmentos de ruta a su título y subtítulo correspondiente.
   * Se usa para actualizar el header al navegar entre subrutas.
   */
  private datos: Record<string, { titulo: string, subtitulo: string }> = {
    'solicitar-cita': {
      titulo: 'Solicitar cita médica',
      subtitulo: ''
    },
    'mis-citas': {
      titulo: 'Mis Citas',
      subtitulo: 'Consulta y gestiona tus citas médicas'
    },
    'historial': {
      titulo: 'Mis Historial Clinico',
      subtitulo: 'Consulta y verifica el estado de tu historial clinico de manera segura'
    },
    'notificaciones': {
      titulo: 'Notificaciones',
      subtitulo: 'Consulta el estado de tus solicitudes'
    }
  };

  constructor(private router: Router) {}

  /**
   * Suscribe al evento NavigationEnd del Router para actualizar el header
   * cada vez que el usuario navega entre subrutas.
   * También aplica el header correcto al cargar la página por primera vez.
   */
  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const segmento = e.urlAfterRedirects.split('/').pop();
        this.actualizarHeader(segmento);
      });

    const segmento = this.router.url.split('/').pop();
    this.actualizarHeader(segmento ?? '');
  }

  /**
   * Asigna título y subtítulo según el segmento final de la URL.
   *
   * @param segmento - Último segmento de la URL activa (ej. 'mis-citas')
   */
  private actualizarHeader(segmento: string) {
    const data = this.datos[segmento];
    if (data) {
      this.tituloActual    = data.titulo;
      this.subtituloActual = data.subtitulo;
    }
  }
}