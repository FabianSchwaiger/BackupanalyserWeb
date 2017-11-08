import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StartComponent} from './start/start.component';
import {OverviewComponent} from './overview/overview.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  { path: 'overview', component: OverviewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
