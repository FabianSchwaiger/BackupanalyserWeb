import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DeviceProperties } from '../DeviceProperties';
import { Entity} from '../Entity';
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

  // bei Start Balken setzen ( später empfangene Werte einsetzen )
  ngOnInit(): void {
    this.setValue(150, 75);
    this.varyValue();
  }

  // Hiermit wird ständig der Wert der beiden Speicherbalken variiert
  varyValue() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j <= this.MaxMediaValue; j++) {
        setTimeout(() => { this.setValue(j, 100-j); }, j * 50 + 10000 * i);
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
}

// Werte für Entity-Tabelle bekommen
export class EntityDataSource extends DataSource<any> {
  // Connect, damit Tabelle Daten bekommt
  connect(): Observable<Entity[]> {
    return Observable.of(ENTITIES);
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


