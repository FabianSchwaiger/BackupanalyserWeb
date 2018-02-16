import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DeviceProperties } from './DataTypes/DeviceProperties';
import { Storage } from './DataTypes/Storage';
import { Entity } from './DataTypes/Entity';
import { Error } from './DataTypes/Error';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  url = 'http://25.20.222.23:8090/api/BackupAnalyser';    // Addresse von Vici einfügen 10.13.243.18

  // Daten von der SWAPI (StarWars-API) holen - Testen
  results: Observable<X>;

  getData2(): Observable<X> {
    this.url = 'https://swapi.co/api/planets';
    this.results = this.http.get<X>(this.url);

    return this.results;
  }

  getDeviceProperties(): Observable<DeviceProperties[]> {
  // DeviceProperties - Daten von Server holen
    this.url = this.url + '/properties';
    console.log('Recieving Device Properties');
    return this.http.get<DeviceProperties[]>(this.url);
  }

  getStorage(): Observable<Storage> {
  // Storage - Daten von Server holen
    this.url = this.url + '/storage';
    console.log('Recieving Storage Information');
    return this.http.get<Storage>(this.url);
  }

  getCheckedEntities(): Observable<Entity[]> {
  // Entity - Daten von Server holen
    this.url = this.url + '/entities';
    console.log('Recieving Entities');
    return this.http.get<Entity[]>(this.url);
  }

  getErrors(): Observable<Error[]> {
  // Error - Daten von Server holen
    this.url = this.url + '/Errors';
    console.log('Recieving Errors');
    return this.http.get<Error[]>(this.url);
  }

  // Upload funktioniert bereits
  /*
  Zu uploadenes File wird übergeben und hochgeladen
  Um das File hochladen zu können, wird es in FormData gewandelt
   */
  uploadFile(fileToUpload: File) {
    const fd = new FormData();
    const urlSend = this.url + '/upload';
    alert(urlSend);

    fd.append('datei', fileToUpload, fileToUpload.name);

    console.log('Dateiname = ' + fileToUpload.name);   // Dateiname in der Konsole anzeigen

    this.http.post<File>(urlSend, fd).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
        this.router.navigate(['/overview']); // Wird File erfolgreich hochgeladen -> automatisch zu Overview wechseln
      },
      response => {
        console.log('POST call in error', response);
        alert(response.error);
        this.router.navigate(['/overview']); // Bei Fehler nicht unbedingt wechseln
      },
      () => {
        console.log('The POST observable is now completed.');
        this.router.navigate(['/overview']); // Wird File erfolgreich hochgeladen -> automatisch zu Overview wechseln
      });

  }

  // Falls ein Fehler auftritt, diesen auf der Konsole anzeigen
  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ' + error.status + ' ' + error.statusText, error);
    return Promise.reject(error.message || error);
  }
}

interface X {
  count: number;
  next: string;
  previous: string;
  results: JSON[];
}
