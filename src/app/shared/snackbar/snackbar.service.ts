import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string, action: string = 'OK', duration: number = 2000) {
    this.snackBar.open(message, action, { duration });
  }
}
