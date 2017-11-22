import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FileService {

  constructor(private http: Http) {}
  url: string;

  /*
  Zu uploadenes File und wird übergeben und hochgeladen
  Um File hochladen zu könned,  wird wird es in FormData gewandelt
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
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ' + error.status + ' ' + error.statusText, error);
    return Promise.reject(error.message || error);
  }
}
