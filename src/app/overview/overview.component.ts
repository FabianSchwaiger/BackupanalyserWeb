import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatDialog} from '@angular/material';

import { ErrorDialogComponent } from '../error-dialog/error.dialog.component';
import { DataService } from '../data.service';
import { EntityService } from '../entity.service';

import { DeviceProperties, ReceivedDeviceProperties} from '../DataTypes/DeviceProperties';
import { Storage, ReceivedStorage } from '../DataTypes/Storage';
import { Entity } from '../DataTypes/Entity';
import { Error } from '../DataTypes/Error';

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
  MediaHigh = 0;
  MediaLow = 0;
  // Audio-Werte
  AudioHigh = 0;
  AudioLow = 0;

  // Entity Table
  displayedEntityColumns = ['name', 'status'];
  EntityDataSource: Entity[];

  // Device-Properties Table
  displayedDeviceColumns = ['eigenschaften', 'aktStatus'];
  DeviceDataSource: DeviceProperties[];

  constructor(
    public dialog: MatDialog,
    public dataService: DataService,
    private entityService: EntityService
  ) {}


  ngOnInit(): void {
  // ngOnInit wird bei laden der Component aufgerufen -> Alle Werte setzen


    this.setDeviceProperties();
    this.setMediaStorage();

    this.setEntities();
    this.setErrors();
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

  openDialog(errorName: string, errorDescription: string): void {
  // Dialog zum Anzeigen eines Fehlers öffnen
    // Für Dialog zu ladende Component sowie Breite und evtl. benötigte Daten angeben
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '450px',
      data: { name: errorName, description: errorDescription }
    });

    dialogRef.afterClosed();
  }

  getError(errorName: string): string {
  // Fehlermeldung für speziellen Fehler finden und zurückgeben (für Anzeige)
    if (this.errors != null) {
      for (let i = 0; i < this.errors.length && this.errors[i] != null; i++) {
        if ( this.errors[i] != null) {
          if (errorName === this.errors[i].name) {
            return this.errors[i].description;
          }
        }
      }
    }
    // Keine Fehler-Beschreibung gefunden
    return 'Keine Fehlerbeschreibung gefunden!';
  }

  setDeviceProperties() {
    // Für volle Funktion das Mock entfernen
    this.dataService.getDevicePropertiesMock().subscribe(data => {
      this.DeviceDataSource = [
        { eigenschaft: 'Device-Name', aktStatus: data.applicationName },
        { eigenschaft: 'Application-Version', aktStatus: data.applicationVersion },
        { eigenschaft: 'Image-Version', aktStatus: data.imageVersion },
        { eigenschaft: 'OS', aktStatus: data.os },
        { eigenschaft: 'Java-Version', aktStatus: data.javaVersion },
        { eigenschaft: 'Device-Type', aktStatus: data.deviceType }
      ];
    });
  }

  setMediaStorage() {
    // Für volle Funktion Mock entfernen
    // Daten vom Server holen
    this.dataService.getStorageMock().subscribe(data => {
      // genaue Namen einfügen
      this.storage = {
        MediaUsed: Math.round(data.snapshots_usedSpace / 10000) / 10,
        MediaMax:  Math.round(data.snapshots_maxSpace / 10000) / 10,
        AudioUsed:  Math.round(data.sounds_usedSpace / 10000) / 10,
        AudioMax:  Math.round(data.sounds_maxSpace / 10000) / 10
      };
      // Werte der Balken setzten bei > Low -> gelb, bei > High -> rot
      this.MediaHigh = this.storage.MediaMax * 0.90;
      this.MediaLow = this.storage.MediaMax * 0.75;
      this.AudioHigh = this.storage.AudioMax * 0.85;
      this.AudioLow = this.storage.AudioMax * 0.75;
    });
  }

  setEntities() {
    this.dataService.getEntitiesMock().subscribe(data => {
        const dataSplit: string[] = data.split(',');      // Alle einzelnen Meldungen aufsplitten
        this.entities = new Array<Entity>(dataSplit.length);

        for ( let i = 0; i < dataSplit.length; i++) {

          const temp = dataSplit[i].split(': ');
          const name = this.entityService.getShortName( temp[0].slice(1, -1));
          let status = false;
          if (temp[1] === 'true') {
            status = true;
          }

          this.entities[i] = {
            'name': name,     // Den genauen Namen durch den verkuerzten ersetzen
            'status': status    // Hochkomma wegschneiden
          };
        }

        this.EntityDataSource = this.entities;
      });
  }

  setErrors() {
    this.dataService.getErrorsMock().subscribe(data => {

      const dataSplit: string[] = data.split(',');      // Alle einzelnen Meldungen aufsplitten
      this.errors = new Array<Error>(dataSplit.length);

      for ( let i = 0; i < dataSplit.length; i++) {
        // console.log(dataSplit[i]);

        /*
        const temp = dataSplit[i].split(': ');
        console.log(temp);
        this.errors[i] = {
          'name': this.entityService.getShortName( temp[0].slice(1, -1)),     // Den genauen Namen durch den verkuerzten ersetzen
          'description':  temp[1].slice(1, -1)    // Hochkomma wegschneiden
        };
        */
        const temp = dataSplit[i].split('\"');
        this.errors[i] = {
          // temp[0] erstes ", temp[1] name, temp[2} 2. ", temp[3] beschreibung, temp[5] letztes "
          'name': this.entityService.getShortName(temp[1]),     // Den genauen Namen durch den verkuerzten ersetzen
          'description':  temp[3]    // Hochkomma wegschneiden
        };

      }
    });
  }

  repair() {
    for ( let i = 0; i < this.entities.length; i++) {
      this.entities[i].status = true;
    }
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
  constructor (private dataService: DataService) { super(); }
  deviceProperties: DeviceProperties[];


  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<DeviceProperties[]> {
    // Daten vom Server abfragen
     this.deviceProperties = DEVICEPROPERTIES;       // Mocking

    // Daten an Tabelle übergeben

    // Funktioniert nicht!
    this.dataService.getDeviceProperties().subscribe(data => {
      this.deviceProperties  = [
        { eigenschaft: 'Device-Name', aktStatus: data.applicationName },
        { eigenschaft: 'Application-Version', aktStatus: data.applicationVersion },
        { eigenschaft: 'Image-Version', aktStatus: data.imageVersion },
        { eigenschaft: 'OS', aktStatus: data.os },
        { eigenschaft: 'Java-Version', aktStatus: data.javaVersion },
        { eigenschaft: 'Device-Type', aktStatus: data.deviceType }
      ];
    });

    return Observable.of(this.deviceProperties);
  }

  disconnect() {}
}
/*
// Werte für Device-Property Tabelle bekommen
export class DeviceDataSource extends DataSource<any> {
  private dataService = new DataService(null, null);
  deviceProperties: DeviceProperties[];

  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<DeviceProperties[]> {
    // Daten vom Server abfragen
    this.deviceProperties = DEVICEPROPERTIES;       // Mocking

    // Daten an Tabelle übergeben
    return Observable.of(this.deviceProperties);

    // return this.dataService.getDeviceProperties();
  }

  disconnect() {}
}
 */
