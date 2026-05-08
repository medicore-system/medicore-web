import { Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';

export const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.routes').then(m => m.HOME_ROUTES) 
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];