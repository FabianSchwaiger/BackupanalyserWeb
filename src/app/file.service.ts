import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {DeviceProperties} from './DeviceProperties';
import { Entity } from './Entity';

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  url: string;
  results: Observable<X>;

  getData2(): Observable<X> {
    this.url = 'https://swapi.co/api/planets';
    this.results = this.http.get<X>(this.url);

    return this.results;
  }

  getDeviceProperties(): Observable<DeviceProperties> {
    this.url = this.url + '/properties';
    return this.http.get<DeviceProperties>(this.url);
  }

  /*
  Zu uploadenes File und wird übergeben und hochgeladen
  Um File hochladen zu können, wird es in FormData gewandelt
   */
  uploadFile(fileToUpload: File) {
    const fd = new FormData();
    fd.append('file', fileToUpload, fileToUpload.name);
    this.http.post(this.url, fd)
      .subscribe((response: any) => {
          alert('Erfolgreich hochgeladen!');
          return response;
        }
        , (error: any) => {
          alert('Fehler bei Upload!\n' + error.toString());
        });
    this.router.navigate(['/overview']); // Wird File hochgeladen -> automatisch zu Overview wechselns
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
