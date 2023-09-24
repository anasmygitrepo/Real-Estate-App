import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private Route: Router,
    private UserAuthService: AuthService,
    private AlertyfyService: AlertyfyService
  ) {}

  ngOnInit() {}

  OnLogin(FormData: NgForm) {
    const token = this.UserAuthService.AuthUser(FormData.value);
    if (token) {
      localStorage.setItem('Token', token.userName);
      this.AlertyfyService.success('Login sucessfull');
      this.Route.navigate(['/']);
    } else {
      this.AlertyfyService.error('Login faild');
    }
    FormData.reset();
  }
}
