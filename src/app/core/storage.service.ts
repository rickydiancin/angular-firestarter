import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserID(id) {
    return localStorage.setItem('userLoggedInID', id);
  }
  getUserID() {
    return localStorage.getItem('userLoggedInID');
  }
  removeUser() {
    return localStorage.removeItem('user');
  }

}
