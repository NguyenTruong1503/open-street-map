import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: DashboardComponent
  }, {
    path: 'map',
    component: MapComponent
  }
];
