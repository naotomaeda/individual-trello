import { Injectable } from '@angular/core';

import { DialogComponent } from './dialog.component';

import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  description: string;

  constructor(public dialog: MatDialog) { }

  openDialog(message) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;
    });
  }
}
