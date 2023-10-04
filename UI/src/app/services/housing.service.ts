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

  GetCitys(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5075/api/City');
  }

  GetPropertyData(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/property.json').pipe(
      map((data) => {
        const PropertyArray: Array<Property> = [];
        if (localStorage.getItem('Newprop')) {
          const LocalStrData = JSON.parse(localStorage.getItem('Newprop'));
          for (const id in LocalStrData) {
            if (SellRent) {
              if (
                LocalStrData.hasOwnProperty(id) &&
                LocalStrData[id].SellRent === SellRent
              ) {
                PropertyArray.push(LocalStrData[id]);
              }
            } else {
              PropertyArray.push(LocalStrData[id]);
            }
          }
        }
        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              PropertyArray.push(data[id]);
            }
          } else {
            PropertyArray.push(data[id]);
          }
        }
        return PropertyArray;
      })
    );
  }

  //Getting A single property

  GetProperty(Proid: number) {
    return this.GetPropertyData().pipe(
      map((prop) => {
        return prop.find((p) => p.Id === Proid);
      })
    );
  }

  //Adding multiple property arrays  in local storage.....................
  AddProperty(property: Property) {
    let newprop = [property];
    if (localStorage.getItem('Newprop')) {
      newprop = [property, ...JSON.parse(localStorage.getItem('Newprop'))];
    }
    localStorage.setItem('Newprop', JSON.stringify(newprop));
  }
  //generating ID for each property...............
  PropIdGeneratore() {
    if (localStorage.getItem('PROPID')) {
      localStorage.setItem(
        'PROPID',
        String(+localStorage.getItem('PROPID') + 1)
      );
      return +localStorage.getItem('PROPID');
    } else {
      localStorage.setItem('PROPID', '101');
      return 101;
    }
  }
}
