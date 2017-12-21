import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { EntityService } from '../entity-service';

@Component ({
  selector: 'app-error-dialog',
  templateUrl: './error.dialog.component.html',
  styleUrls: ['../overall-style.css', './error.dialog.component.css']
})

export class ErrorDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: EntityService
  ) { }

  // wird der Dialog geöffnet, kann aus dem Fehlername die Fehlermeldung herausgelesen werden
  ngOnInit(): void {
    this.data.description = this.entityService.getError(this.data.name);
  }

  // wird der Close-Button geklickt, soll der Dialog geschlossen werden
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
