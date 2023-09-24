import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  AuthUser(user) {
    let userArray = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse(localStorage.getItem('Users'));
    }
    return userArray.find(
      (usr) => usr.userName === user.userName && usr.password === user.password
    );
  }
}
