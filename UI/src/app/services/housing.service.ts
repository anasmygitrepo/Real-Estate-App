import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Iproperty } from '../property/property-list/Iproperty';

@Injectable({
  providedIn: 'root',
})
export class HousingService implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  GetPropertyData(SellRent: number): Observable<Iproperty[]> {
    return this.http.get('data/property.json').pipe(
      map((data) => {
        const PropertyArray: Array<Iproperty> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            PropertyArray.push(data[id]);
          }
        }
        return PropertyArray;
      })
    );
  }
}
