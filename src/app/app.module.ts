// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { MatProgressSpinnerModule, MatProgressBarModule, MatTabsModule } from '@angular/material';

import { AppComponent } from './app.component';
import { StartComponent} from './start/start.component';
import { OverviewComponent } from './overview/overview.component';
import { FileService } from './file.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, AppRoutingModule ],
  declarations: [ AppComponent, StartComponent, OverviewComponent ],     // FileDropDirective, FileSelectDirective
  providers:    [ FileService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
