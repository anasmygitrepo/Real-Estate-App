import { Component, OnInit } from '@angular/core';
import { AlertyfyService } from '../services/Alertyfy.service';

@Component({
  selector: 'app-Nav-bar',
  templateUrl: './Nav-bar.component.html',
  styleUrls: ['./Nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  CurrentUser: string;

  constructor(private AlertyfyService: AlertyfyService) {}

  ngOnInit() {}

  UserLogin() {
    this.CurrentUser = localStorage.getItem('Token');
    return this.CurrentUser;
  }
  UserLogOut() {
    localStorage.removeItem('Token');
    this.AlertyfyService.success('Loged out successfully');
  }
}
