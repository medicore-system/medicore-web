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

  tituloActual: string = '';
  subtituloActual: string = '';

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

  private actualizarHeader(segmento: string) {
    const data = this.datos[segmento];
    if (data) {
      this.tituloActual    = data.titulo;
      this.subtituloActual = data.subtitulo;
    }
  }
}