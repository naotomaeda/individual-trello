import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key, obj, stringify = true) {
    if (stringify) {
      localStorage.setItem(key, JSON.stringify(obj));
    } else {
      localStorage.setItem(key, obj);
    }
  }

  load(key, parse = true) {
    if (parse) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return localStorage.getItem(key);
    }
  }
}
