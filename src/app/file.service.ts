import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Entity } from './Entity';

@Injectable()
export class FileService {

  constructor(
    private http: Http,
    private router: Router
  ) {}
  url: string;

  getData(): Promise<Entity[]> {   // Promise, damit geringere Wartezeiten
    this.url = 'https://swapi.co/api/planets/3/';
    return this.http.get(this.url )
      .toPromise()
      .then(response => response.json() as Entity[])
      .catch(this.handleError);      // data.json() -> in JSON-Format umwandeln
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
