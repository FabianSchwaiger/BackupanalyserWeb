import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReceivedDeviceProperties } from './DataTypes/DeviceProperties';
import { ReceivedStorage } from './DataTypes/Storage';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  url = 'http://25.20.222.23:8090/api/BackupAnalyser';    // IP ist aktuelle Server-Adresse von Hamachi 25.20.222.23
                                                       // IP auch beim Repair Field nötig in overview html
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
    const url = this.url + '/Space';
    console.log('Recieving Storage Information');
    return this.http.get<ReceivedStorage>(url);
  }

  getStorageMock(): Observable<ReceivedStorage> {
    console.log('Recieving Storage Information');
    const storage = { snapshots_usedSpace: 11992, snapshots_maxSpace: 30000000, sounds_usedSpace: 2532831, sounds_maxSpace: 15000000 };

    return Observable.of(storage);
  }

  getEntities(): Observable<string> {
  // Entity - Daten von Server holen
    const url = this.url + '/CheckResults';
    console.log('Recieving Entities');
    return this.http.get<string>(url);
  }

  getEntitiesMock(): Observable<string> {
    // Entity - Daten von Server holen
    console.log('Recieving Entities');

    const entitiesRec = '"DeviceDescription": false,' +
      '"com.commend.iss.activity.ActionSet.json": true,' +
      '"BackupFileContents": true,' +
      '"JsonFileSanityCheck": true,' +
      '"com.commend.iss.activity.ActivityCard.json": true,' +
      '"com.commend.platform.db.MigrationScript.json": true,' +
      '"com.commend.platform.mediastore.Media.json": false,' +
      '"com.commend.platform.mediastore.MediaCategory.json": false';
    return Observable.of(entitiesRec);
  }

  getErrors(): Observable<string> {
  // Error - Daten von Server holen
    const url = this.url + '/Errors';
    console.log('Recieving Errors');
    return this.http.get<string>(url);
  }

  getErrorsMock(): Observable<string> {
    // Error - Daten von Server holen
    const errorsRec = '"com.commend.activity.http.HttpAction.json": "_type does not exist",' +
      '"com.commend.platform.mediastore.Media.json": "Entity[1] in the directory...",' +
      '"com.commend.platform.mediastore.MediaCategory.json": "Entity[2]: usedSpace...",' +
      '"com.commend.device.config.Led.json": "Wrong deviceDescription"';
    console.log('Recieving Errors');
    return Observable.of(errorsRec);
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

    this.router.navigate(['/overview']); // Nach langer Nacht der Forschung löschen

    this.http.post<File>(urlSend, fd).subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);
        this.router.navigate(['/overview']); // Wird File erfolgreich hochgeladen -> automatisch zu Overview wechseln
      },
      response => {
        console.log('POST call in error', response);
        console.error(response.error);
        // alert('Fehler beim Upload aufgetreten');
        // Bei Fehler nicht zur Übersicht navigieren
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
