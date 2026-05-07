import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './pages/home/home';

@NgModule({
	imports: [SharedModule, HomeRoutingModule, HomeComponent],
})
export class HomeModule {}