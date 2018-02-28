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
  url = 'http://25.20.222.23:8090/api/BackupAnalyser';    // IP ist aktuelle Adresse von Hamachi

  // Daten von der SWAPI (StarWars-API) holen - Testen
  results: Observable<X>;

  getData2(): Observable<X> {
    const url = 'https://swapi.co/api/planets';
    this.results = this.http.get<X>(url);
    return this.results;
  }










  getDeviceProperties(): Observable<RecievedDeviceProperties> {
  // DeviceProperties - Daten von Server holen
    const url = this.url + '/DeviceDescription';
    // this.url = 'https://swapi.co/api/planets/';
    console.log('Recieving Device Properties');

    let temp;
    console.log(JSON.stringify(this.http.get<string[]>(url)));

    return this.http.get<RecievedDeviceProperties>(url);
  }

  extractDeviceProperties(data: RecievedDeviceProperties):  Observable<DeviceProperties[]> {
    // let data: RecievedDeviceProperties;
    console.log('Transforming Device Properties');

    // dataObs.subscribe( results => { data = results; });
    const result: DeviceProperties[] = [
      { eigenschaft: 'Device-Name', aktStatus: data.applicationName },
      { eigenschaft: 'Application-Version', aktStatus: data.applicationVersion },
      { eigenschaft: 'Image-Version', aktStatus: data.imageVersion },
      { eigenschaft: 'OS', aktStatus: data.os },
      { eigenschaft: 'Java-Version', aktStatus: data.javaVersion },
      { eigenschaft: 'Device-Type', aktStatus: data.deviceType }
    ];

  return  Observable.of(result);
}

  extractDeviceProperties2(dataObs: Observable<RecievedDeviceProperties>):  Observable<DeviceProperties[]> {
    // let data: RecievedDeviceProperties;
    console.log('Transforming Device Properties');
    let data;
    console.log(dataObs);

    dataObs.subscribe(result => {data = result; } );

    console.log(data.os);
    const result: DeviceProperties[] = [
      { eigenschaft: 'Device-Name', aktStatus: data.applicationName },
      { eigenschaft: 'Application-Version', aktStatus: data.applicationVersion },
      { eigenschaft: 'Image-Version', aktStatus: data.imageVersion },
      { eigenschaft: 'OS', aktStatus: data.os },
      { eigenschaft: 'Java-Version', aktStatus: data.javaVersion },
      { eigenschaft: 'Device-Type', aktStatus: data.deviceType }
    ];

    return  Observable.of(result);
  }






  getStorage(): Observable<Storage> {
  // Storage - Daten von Server holen
    const url = this.url + '/storage';
    console.log('Recieving Storage Information');
    return this.http.get<Storage>(url);
  }

  getCheckedEntities(): Observable<Entity[]> {
  // Entity - Daten von Server holen
    const url = this.url + '/entities';
    console.log('Recieving Entities');
    return this.http.get<Entity[]>(url);
  }

  getErrors(): Observable<Error[]> {
  // Error - Daten von Server holen
    const url = this.url + '/Errors';
    console.log('Recieving Errors');
    return this.http.get<Error[]>(url);
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

interface RecievedDeviceProperties {
  applicationVersion: string;
  imageVersion: string;
  deviceType: string;
  os: string;
  javaVersion: string;
  applicationName: string;
}
