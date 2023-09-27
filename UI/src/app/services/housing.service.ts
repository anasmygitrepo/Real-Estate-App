import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Iproperty } from '../property/property-list/Iproperty';
import { IpropertyBase } from '../Models/IpropertyBase';
import { Property } from '../Models/Property';

@Injectable({
  providedIn: 'root',
})
export class HousingService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  GetPropertyData(SellRent: number): Observable<Property[]> {
    return this.http.get('data/property.json').pipe(
      map((data) => {
        const PropertyArray: Array<Property> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            PropertyArray.push(data[id]);
          }
        }
        return PropertyArray;
      })
    );
  }
  AddProperty(property: Property) {
    localStorage.setItem('Newprop', JSON.stringify(property));
  }
}
