import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooteComponent } from "./layout/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SkeletonComponent,HeaderComponent,FooteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('medicore-web');
}
