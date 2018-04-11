import { Component } from '@angular/core';

import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['../overall-style.css', './start.component.css']
})

export class StartComponent {

  constructor (
    private dataService: DataService
  ) {}

  // Wenn File gewählt wurde, dieses an Webserver senden
  public fileEvent($event: any) {
    const fileSelected: File = $event.target.files[0];
    console.log('Uploading');
    this.dataService.uploadFile(fileSelected);
  }

}
