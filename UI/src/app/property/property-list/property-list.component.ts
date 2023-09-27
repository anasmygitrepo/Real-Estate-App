import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { Iproperty } from './Iproperty';
import { ActivatedRoute, Router } from '@angular/router';
import { IpropertyBase } from 'src/app/Models/IpropertyBase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  propertes: Array<IpropertyBase>;

  SellRent = 1;
  constructor(
    private router: ActivatedRoute,
    private service: HousingService
  ) {}

  ngOnInit() {
    if (this.router.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.service.GetPropertyData(this.SellRent).subscribe((data) => {
      this.propertes = data;
      const new_propertys = JSON.parse(localStorage.getItem('Newprop'));
      if (new_propertys.SellRent === this.SellRent) {
        this.propertes = [new_propertys, ...this.propertes];
      }
    });
  }
}
