import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MatTableModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { OverviewComponent } from './overview/overview.component';
import { FileService } from './file.service';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  imports:      [ BrowserModule, HttpModule, AppRoutingModule, BrowserAnimationsModule, MatTableModule, MatListModule ],
  declarations: [ AppComponent, StartComponent, OverviewComponent ],
  providers:    [ FileService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
