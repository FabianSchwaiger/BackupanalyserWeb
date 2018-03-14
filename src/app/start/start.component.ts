import { Component } from '@angular/core';

import { DataService } from '../data.service';
import {Router} from '@angular/router';

@Component ({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['../overall-style.css', './start.component.css']
})

export class StartComponent {
selected: File;
  constructor (
    private fileService: DataService,
    private router: Router
  ) {}

  // Wenn File gewählt wurde, dieses an Webserver senden
  public fileEvent($event: any) {
    const fileSelected: File = $event.target.files[0];
    console.log('Uploading');
    this.fileService.uploadFile(fileSelected);
  }

}
