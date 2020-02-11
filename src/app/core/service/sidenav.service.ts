import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

    opened: boolean;

    constructor() { }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    toggle() {
        this.opened = !this.opened;
    }
}
