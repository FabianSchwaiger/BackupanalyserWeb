import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Entity} from './entity';
import {FileService} from './file.service';

@Component({
  selector: 'app-component',       // kein Fehler
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})

export class AppComponent implements OnInit {

  private url = 'http://110.2.254.12:8090/api/BackupAnalyser/AllEntities';
  private urlTest = 'https://swapi.co/api/planets/3/';

  fileName: string;
  dataJSON: JSON;
  dataEntities: Entity[];
  htlLogo = './commendlogo.png';

  constructor(
    private http: Http,
    private fileService: FileService
    ) {}
  /*
  Daten von Server holen (Entities) und als Entity- Array zurückgeben
  --> AllEntities
   */
  getData(): Promise<Entity[]> {   // Promise, damit während der Wartezeit etwas anderes geschehen kann
    return this.http.get(this.url )
      .toPromise()
      .then(response => response.json() as Entity[])
      .catch(this.handleError);      // response.json() as Entity[] -> in Entity-Array umwandeln
  }

  /*
  Daten von Server holen (Entities) und als JSON zurückgeben
  nur zum Test Daten von SWAPI holen (funktioniert meistens)
   */
  getDataTest(): Promise<JSON> {   // Promise, damit während der Wartezeit etwas anderes geschehen kann
    return this.http.get(this.urlTest )
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);      // response.json() -> in JSON-Format umwandeln
  }

  /*
  wurde ein File gewählt, wird dieses der UploadFile-Funktion übergeben
   */
  public fileEvent($event: any) {
    const fileSelected: File = $event.target.files[0];
    this.fileName = fileSelected.name;
    // File hochladen
    this.fileService.uploadFile(fileSelected, this.urlTest)
      .subscribe( (response: any) => {
        alert('Erfolgreich hochgeladen!');
        return response;
      }
      , (error: any) => {
      alert('Fehler bei Upload!\n' + error.toString());
    });
  }

  ngOnInit(): void {

    this.getData()
      .then(data => this.dataEntities = data)
      .catch(this.handleError);

    this.getDataTest()
      .then(data => this.dataJSON = data)
      .catch(this.handleError);
    document.querySelector('ProgressBar');

  }

  /*
  falls ein Fehler auftritt wird dieser in der Konsole (des Browsers) angezeigt
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ' + error.status + ' ' + error.statusText, error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
