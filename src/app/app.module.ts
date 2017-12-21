import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MatTableModule, MatListModule, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { OverviewComponent } from './overview/overview.component';
import { ErrorDialogComponent } from './error-dialog/error.dialog.component';
import { EntityService } from './entity-service'
import { FileService } from './file.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [ AppComponent, StartComponent, OverviewComponent, ErrorDialogComponent],
  entryComponents: [ ErrorDialogComponent ],
  providers:    [ FileService, EntityService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
