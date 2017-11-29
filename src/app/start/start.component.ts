import { Component } from '@angular/core';

import { FileService } from '../file.service';

@Component ({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['../overall-style.css', './start.component.css']
})

export class StartComponent {

  constructor (
    private fileService: FileService
  ) {}

  public fileEvent($event: any) {
    const fileSelected: File = $event.target.files[0];
    this.fileService.uploadFile(fileSelected);
  }
}
