import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatDialog} from '@angular/material';

import { DeviceProperties } from '../DeviceProperties';
import { Entity} from '../Entity';
import { ErrorDialogComponent } from '../error-dialog/error.dialog.component';
import { FileService } from '../file.service';

import { ENTITIES } from '../mock-Entities';
import { DEVICEPROPERTIES } from '../mock-DeviceProperies';

@Component ({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../overall-style.css', './overview.component.css']
})

export class OverviewComponent implements OnInit {
  // Media-Werte
  MediaValue = 0;
  MaxMediaValue = 100;
  MediaHigh = this.MaxMediaValue * 0.85;
  MediaLow = this.MaxMediaValue * 0.70;
  // Audio-Werte
  AudioValue = 0;
  MaxAudioValue = 100;
  AudioHigh = this.MaxAudioValue * 0.85;
  AudioLow = this.MaxAudioValue * 0.70;

  // Entity Table
  displayedEntityColumns = ['name', 'status'];
  EntityDataSource = new EntityDataSource();

  // Entity Table
  displayedDeviceColumns = ['eigenschaften', 'aktueller status'];
  DeviceDataSource = new DeviceDataSource();

  results: X;

  constructor(
    public dialog: MatDialog,
    private dataService: FileService
  ) {}

  // bei Start Balken setzen ( später empfangene Werte einsetzen )
  ngOnInit(): void {
    this.setValue(150, 75);

    this.showData();
  }

  showData(): void {

    this.dataService.getData2().subscribe( result => {
      this.results = result;
      console.log(this.results.results[0]);
      console.log(this.results.next);
    });
    console.log('Test');
  }

  // Hiermit wird ständig der Wert der beiden Speicherbalken variiert (nur für Veranschaulichung, kein Nutzen)
  varyValue() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j <= this.MaxMediaValue; j++) {
        setTimeout(() => { this.setValue(j, 100 - j); }, j * 50 + 10000 * i);
      }
      for (let j = 0; j <= this.MaxAudioValue; j++) {
        setTimeout(() => { this.setValue(100 - j, j); }, j * 50 + 10000 * i + 5000);
      }
    }
  }

  // Wert der beiden Speicherbalken setzten
  setValue(media: number, audio: number): void {
    this.MediaValue = media;
    this.AudioValue = audio;
  }

  // Fehler eines Entities anzeigen
  showError(errorName: string): void {
    this.openDialog(errorName, 'Missing');
  }

  // Dialog zum Anzeigen eines Fehlers öffnen
  openDialog(errorName: string, errorDescription: string ): void {
    // Für Dialog zu ladende Component sowie Breite und evtl. benötigte Daten angeben
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '30%',
      data: { name: errorName, description: errorDescription }
    });

    dialogRef.afterClosed();
  }

}

// Werte für Entity-Tabelle bekommen
export class EntityDataSource extends DataSource<any> {

  private fileService: FileService;
  entities: Entity[];

  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<Entity[]> {
    // this.fileService.getData().then(data => this.entities = data);
    this.entities = ENTITIES;
    return Observable.of(this.entities);
  }

  disconnect() {}
}

// Werte für Device-Property Tabelle bekommen
export class DeviceDataSource extends DataSource<any> {
  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<DeviceProperties[]> {
    return Observable.of(DEVICEPROPERTIES);
  }

  disconnect() {}
}

interface X {
  count: number;
  next: string;
  previous: string;
  results: JSON[];
}
