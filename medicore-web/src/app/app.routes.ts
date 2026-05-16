import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MainPage } from './pages/main-page/main-page';
import { SolicitarCita } from './components/solicitar-cita/solicitar-cita';
import { MisCitas } from './components/mis-citas/mis-citas';
import { Historial } from './components/historial/historial';
import { Notificaciones } from './components/notificaciones/notificaciones';
import { Register } from './components/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        children: []
    },
    {
        path: 'main-page',
        component: MainPage,
            children: [
                { path: 'solicitar-cita', component: SolicitarCita },
                { path: 'mis-citas',      component: MisCitas },
                { path: 'historial',      component: Historial },
                { path: 'notificaciones', component: Notificaciones },
                { path: '',   redirectTo: 'solicitar-cita', pathMatch: 'full' },
                ]
    },
    { 
        path: 'notificaciones', 
        component: Notificaciones 
    },
    {
        path: 'register',
        component: Register        
    }
];