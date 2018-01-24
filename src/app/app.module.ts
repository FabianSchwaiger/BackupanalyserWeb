import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatListModule, MatButtonModule, MatDialogModule, MatIconModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { OverviewComponent } from './overview/overview.component';
import { ErrorDialogComponent } from './error-dialog/error.dialog.component';
import { EntityService } from './entity-service'
import { DataService } from './data.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: [ AppComponent, StartComponent, OverviewComponent, ErrorDialogComponent],
  entryComponents: [ ErrorDialogComponent ],
  providers:    [ DataService, EntityService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
