import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-citas',
  standalone: true,
  imports: [],
  templateUrl: './header-citas.html',
  styleUrl: './header-citas.css',
})
export class HeaderCitas {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
}
