import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserLoginDto } from '../Models/UserLoginDto';
import { UserRegisterDto } from '../Models/UserRegisterDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) {}

  AuthUser(user: UserLoginDto) {
    return this.http.post(this.BaseUrl + '/Account/login', user);

    // let userArray = [];
    // if (localStorage.getItem('Users')) {
    //   userArray = JSON.parse(localStorage.getItem('Users'));
    // }
    // return userArray.find(
    //   (usr) => usr.userName === user.userName && usr.password === user.password
    // );
  }
    AddUser(user:UserRegisterDto) {

         return this.http.post(this.BaseUrl + '/Account/register', user);


    // let users = [];
    // if (localStorage.getItem('Users')) {
    //   users = JSON.parse(localStorage.getItem('Users'));
    //   users = [user, ...users];
    // } else {
    //   users = [user];
    // }
    // localStorage.setItem('Users', JSON.stringify(users));
  }
}
