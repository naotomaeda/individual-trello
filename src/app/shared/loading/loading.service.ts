import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: boolean = false;
  public message: string = '';

  constructor() { }

  show(message: string = '') {
    this.loading = true;
    this.message = message;
  }

  hide() {
    this.loading = false;
    this.message = '';
  }
}
