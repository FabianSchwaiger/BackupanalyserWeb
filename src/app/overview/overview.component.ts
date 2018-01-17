import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatDialog} from '@angular/material';

import { ErrorDialogComponent } from '../error-dialog/error.dialog.component';
import { DataService } from '../data.service';

import { DeviceProperties} from '../DeviceProperties';
import { Storage } from '../Storage';
import { Entity } from '../Entity';
import { Error } from '../Error';

// Zu Mocking-Zwecken
import { ENTITIES } from '../mock-Entities';
import { DEVICEPROPERTIES } from '../mock-DeviceProperies';

@Component ({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['../overall-style.css', './overview.component.css']
})

export class OverviewComponent implements OnInit {
  deviceProperties: DeviceProperties[];
  storage: Storage;
  entities: Entity[];
  errors: Error[];

  // Werte für Balken
  MediaHigh: number;
  MediaLow: number;
  // Audio-Werte
  AudioHigh: number;
  AudioLow: number;

  // Entity Table
  displayedEntityColumns = ['name', 'status'];
  EntityDataSource = new EntityDataSource();

  // Entity Table
  displayedDeviceColumns = ['eigenschaften', 'aktueller status'];
  DeviceDataSource = new DeviceDataSource();

  results: X;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService
  ) {}


  ngOnInit(): void {
  // ngOnInit wird bei laden der Component aufgerufen -> Alle Werte setzen

    // this.setValue(150, 75);

    // this.showData();
/*
    // Daten vom Server bekommen
    this.dataService.getDeviceProperties().subscribe( result => { this.deviceProperties = result; });
    this.dataService.getStorage().subscribe( result => { this.storage = result; });
    this.dataService.getEntities().subscribe( result => { this.entities = result; });
    this.dataService.getErrors().subscribe( result => { this.errors = result; });
*/
    this.deviceProperties = DEVICEPROPERTIES;
    this.storage = { MediaUsed: 90, MediaMax: 100, AudioUsed: 25, AudioMax: 100 };
    this.entities = ENTITIES;
    this.errors = [{ name: 'Media Store', description: 'File nicht vohanden' }];

    // Werte der Balken setzten bei > Low -> gelb, bei > High -> rot
    this.MediaHigh = this.storage.MediaMax * 0.90;
    this.MediaLow = this.storage.MediaMax * 0.75;
    this.AudioHigh = this.storage.AudioMax * 0.85;
    this.AudioLow = this.storage.AudioMax * 0.75;
  }

  showData(): void {
  // Daten der SW-API zum Testen des HTTP-Clients anzeigen

    this.dataService.getData2().subscribe( result => {
      this.results = result;
      console.log(this.results.results[0]);
      console.log(this.results.next);
    });
    console.log('Test');
  }

  /*
  varyValue() {
  // Hiermit wird ständig der Wert der beiden Speicherbalken variiert (nur für Veranschaulichung, kein Nutzen)
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j <= this.storage.MediaMax; j++) {
        setTimeout(() => { this.setValue(j, 100 - j); }, j * 50 + 10000 * i);
      }
      for (let j = 0; j <= this.storage.AudioMax; j++) {
        setTimeout(() => { this.setValue(100 - j, j); }, j * 50 + 10000 * i + 5000);
      }
    }
  }

  setValue(media: number, audio: number): void {
  // Wert der beiden Speicherbalken setzten
    this.storage.MediaUsed = media;
    this.storage.AudioUsed = audio;
  }
  */

  showError(errorName: string): void {
  // Fehlerdialog eines gewählten, fehlerhaften Entities anzeigen
    const errorDescription: string = this.getError(errorName);    // Fehler-Beschreibung suchen
    this.openDialog(errorName, errorDescription);
  }

  openDialog(errorName: string, errorDescription: string ): void {
  // Dialog zum Anzeigen eines Fehlers öffnen
    // Für Dialog zu ladende Component sowie Breite und evtl. benötigte Daten angeben
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '32%',
      data: { name: errorName, description: errorDescription }
    });

    dialogRef.afterClosed();
  }

  getError(errorName: string): string {
  // Fehlermeldung für speziellen Fehler finden und zurückgeben (für Anzeige)
    if (this.errors != null) {
      for (let i = 0; i < this.errors.length; i++) {
        if (errorName === this.errors[i].name) {
          return this.errors[i].description;

        }
      }
    }
    // Kein Fehler gefunden
    return 'No Error Description Found!';
  }
}

// Werte für Entity-Tabelle bekommen
export class EntityDataSource extends DataSource<any> {
  private dataService: DataService;
  entities: Entity[];

  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<Entity[]> {
    // Daten vom Server abfragen
    // this.dataService.getEntities().subscribe( result => { this.entities = result; });

    this.entities = ENTITIES;         // Mocking
    // Daten an Tabelle übergeben
    return Observable.of(this.entities);
  }

  disconnect() {}
}

// Werte für Device-Property Tabelle bekommen
export class DeviceDataSource extends DataSource<any> {
  private dataService: DataService;
  deviceProperties: DeviceProperties[];

  // deviceProperties = DEVICEPROPERTIES;    // Von Server abfragen

  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<DeviceProperties[]> {
    // Daten vom Server abfragen
    // this.dataService.getDeviceProperties().subscribe( result => { this.deviceProperties = result; });

    this.deviceProperties = DEVICEPROPERTIES;       // Mocking
    // Daten an Tabelle übergeben
    return Observable.of(this.deviceProperties);
  }

  disconnect() {}
}

// Test-Interface
interface X {
  count: number;
  next: string;
  previous: string;
  results: JSON[];
}
