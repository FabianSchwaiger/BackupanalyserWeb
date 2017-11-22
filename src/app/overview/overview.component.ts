import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';

import { ENTITIES } from '../mock-Entities';

@Component ({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.css']
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
  entities = ENTITIES;

  /* für mat-table (funktioniert leider nicht)
  *displayedColumns = ['name', 'status'];
  *dataSource = new EntityDataSource();
  */

  ngOnInit(): void {
    this.varyValue();
  }

  // Hiermit wird ständig der Wert der beiden -speicherbalken variiert
  varyValue() {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j <= this.MaxMediaValue; j++) {
        setTimeout(() => { this.setValue(j); }, j * 50 + 10000 * i);
      }
      for (let j = 0; j <= this.MaxAudioValue; j++) {
        setTimeout(() => { this.setValue(100 - j); }, j * 50 + 10000 * i + 5000);
      }
    }
  }

  setValue(i: number): void {
    this.MediaValue = i;
    this.AudioValue = 100 - i;
  }
}

/*
export class EntityDataSource extends DataSource<any> {

  connect(): Observable<Entity[]> {
    return Observable.of(ENTITIES);
  }

  disconnect() {}
}
*/


