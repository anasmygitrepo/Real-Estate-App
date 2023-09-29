import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IpropertyBase } from 'src/app/Models/IpropertyBase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SearchCity = '';
  City = '';
  SortParams = '';
  SortDirection = 'asc';
  Today = new Date();
  propertes: Array<IpropertyBase>;

  //SELLRENT=1  is listing all the propertys for buying
  SellRent = 1;

  constructor(
    private router: ActivatedRoute,
    private service: HousingService
  ) {}

  ngOnInit() {
    if (this.router.snapshot.url.toString()) {
      //SELLRENT=2  is listing all the propertys for Rend
      this.SellRent = 2;
    }
    this.service.GetPropertyData(this.SellRent).subscribe((data) => {
      this.propertes = data;
    });
  }
  SerchCity() {
    this.SearchCity = this.City;
  }
  ClearFilter() {
    this.City = '';
    this.SearchCity = '';
  }
  changeSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
