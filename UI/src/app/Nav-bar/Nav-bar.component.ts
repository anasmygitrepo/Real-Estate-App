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
    this.CurrentUser = localStorage.getItem('userName');
    return this.CurrentUser;
  }
  UserLogOut() {
    localStorage.removeItem('Token');
    localStorage.removeItem('userName');
    this.AlertyfyService.success('Loged out successfully');
  }
}
