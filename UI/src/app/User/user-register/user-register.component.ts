import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth.service';
import * as intlTelInput from 'intl-tel-input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRegisterDto } from 'src/app/Models/UserRegisterDto';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  User: UserRegisterDto;
  RegistrationForm: FormGroup;
  UserSubmited: boolean;

  constructor(
    private FB: FormBuilder,
    private UserService: AuthService,
    private Alertyfy: AlertyfyService
  ) {}

  ngOnInit() {
    const mob = document.getElementById('mob');
    if (mob) {
      intlTelInput(mob, {
        initialCountry: 'US',
        separateDialCode: true,
        utilsScript:
          'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js',
      });
    }

    this.CreateRegistrationForm();
  }

  CreateRegistrationForm() {
    this.RegistrationForm = this.FB.group(
      {
        UserName: [null, Validators.required],
        Email: [null, [Validators.required, Validators.email]],
        Password: [null, [Validators.required, Validators.minLength(8)]],
        ConfirmPassword: [null, [Validators.required]],
        Mobaile: [
          null,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      { Validators: this.PasswordMatchingVlidatore }
    );
  }

  PasswordMatchingVlidatore(FG: FormGroup): Validators {
    return FG.get('Password').value === FG.get('ConfirmPassword').value
      ? null
      : { notmatched: true };
  }

  //geting fields for validation........

  get GetUsername() {
    return this.RegistrationForm.get('UserName') as FormControl;
  }

  get GetPassword() {
    return this.RegistrationForm.get('Password') as FormControl;
  }
  get GetEmail() {
    return this.RegistrationForm.get('Email') as FormControl;
  }
  get GetMobail() {
    return this.RegistrationForm.get('Mobaile') as FormControl;
  }
  get GetConfirmPassword() {
    return this.RegistrationForm.get('ConfirmPassword') as FormControl;
  }

  UserData(): UserRegisterDto {
    return (this.User = {
      userName: this.GetUsername.value,
      email: this.GetEmail.value,
      password: this.GetPassword.value,
      mobail: this.GetPassword.value,
    });
  }

  Onsubmit() {
    this.UserSubmited = true;
    if (this.RegistrationForm.valid) {
      this.UserService.AddUser(this.UserData()).subscribe(
        (res: UserRegisterDto) => {
          this.RegistrationForm.reset();
          this.UserSubmited = false;
          this.Alertyfy.success('you are sucessfully registerd');
        }
      );

      //errors are handled by httperror-interceptore
    }
  }
}
