import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DeviceProperties, ReceivedDeviceProperties } from './DataTypes/DeviceProperties';
import { Storage, ReceivedStorage } from './DataTypes/Storage';
import { Entity, ReceivedEntities } from './DataTypes/Entity';
import { Error } from './DataTypes/Error';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  url = 'http://localhost:8090/api/BackupAnalyser';    // IP ist aktuelle Server-Adresse von Hamachi 25.20.222.23

  getDeviceProperties(): Observable<ReceivedDeviceProperties> {
  // DeviceProperties - Daten von Server holen
    const url = this.url + '/DeviceDescription';

    console.log('Recieving Device Properties');

    return this.http.get<ReceivedDeviceProperties>(url);
  }

  getDevicePropertiesMock(): Observable<ReceivedDeviceProperties> {

    console.log('Recieving Device Properties');

    const data: ReceivedDeviceProperties = {
      applicationVersion: '0.0.4570.develop.3b1ac96ff',
      imageVersion: '01.07.01',
      deviceType: 'device.type.ws311vcmda',
      os: 'Linux',
      javaVersion: '1.8.0_121',
      applicationName: 'SIP Station'
    };

    return Observable.of(data);
  }


  getStorage(): Observable<ReceivedStorage> {
  // Storage - Daten von Server holen
    const url = this.url + '/storage';
    console.log('Recieving Storage Information');
    return this.http.get<ReceivedStorage>(url);
  }

  getStorageMock(): Observable<Storage> {
    console.log('Recieving Storage Information');
    const storage = { MediaUsed: 90, MediaMax: 100, AudioUsed: 25, AudioMax: 100 };

    return Observable.of(storage);
  }

  getEntities(): Observable<ReceivedEntities> {
  // Entity - Daten von Server holen
    const url = this.url + '/entities';
    console.log('Recieving Entities');
    return this.http.get<ReceivedEntities>(url);
  }

  getErrors(): Observable<Error[]> {
  // Error - Daten von Server holen
    const url = this.url + '/Errors';
    console.log('Recieving Errors');
    return this.http.get<Error[]>(url);
  }

  /*
  Zu uploadenes File wird übergeben und hochgeladen
  Um das File hochladen zu können, wird es in FormData gewandelt
   */
  uploadFile(fileToUpload: File) {
    const fd = new FormData();
    const urlSend = this.url + '/upload';

    fd.append('datei', fileToUpload, fileToUpload.name);

    console.log('Dateiname = ' + fileToUpload.name);   // Dateiname in der Konsole anzeigen

    this.http.post<File>(urlSend, fd).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
        this.router.navigate(['/overview']); // Wird File erfolgreich hochgeladen -> automatisch zu Overview wechseln
      },
      response => {
        console.log('POST call in error', response);
        console.error(response.error);
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
