import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Property } from '../Models/Property';
import { IdTextDto } from 'src/app/Models/IdTextDto';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HousingService implements OnInit {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  GetCitys(): Observable<string[]> {
    return this.http.get<string[]>(this.BaseUrl + '/City/cities');
  }

  GetPropertyData(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(
      this.BaseUrl + '/Property/type/' + SellRent.toString()
    );

    //for .....................local storage.............
    // return this.http.get('data/property.json').pipe(
    //   map((data) => {
    //     const PropertyArray: Array<Property> = [];
    //     if (localStorage.getItem('Newprop')) {
    //       const LocalStrData = JSON.parse(localStorage.getItem('Newprop'));
    //       for (const id in LocalStrData) {
    //         if (SellRent) {
    //           if (
    //             LocalStrData.hasOwnProperty(id) &&
    //             LocalStrData[id].SellRent === SellRent
    //           ) {
    //             PropertyArray.push(LocalStrData[id]);
    //           }
    //         } else {
    //           PropertyArray.push(LocalStrData[id]);
    //         }
    //       }
    //     }
    //     for (const id in data) {
    //       if (SellRent) {
    //         if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
    //           PropertyArray.push(data[id]);
    //         }
    //       } else {
    //         PropertyArray.push(data[id]);
    //       }
    //     }
    //     return PropertyArray;
    //   })
    // );
  }

  //Getting A single property

  GetProperty(id: number) {
    return this.http.get<Property>(
      this.BaseUrl + '/Property/detail/' + id.toString()
    );
  }

  //Adding multiple property arrays  in local storage.....................
  AddProperty(property: Property) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('Token'),
      }),
    };
    return this.http.post(
      this.BaseUrl + '/Property/add/',
      property,
      httpOptions
    );
    // let newprop = [property];
    // if (localStorage.getItem('Newprop')) {
    //   newprop = [property, ...JSON.parse(localStorage.getItem('Newprop'))];
    // }
    // localStorage.setItem('Newprop', JSON.stringify(newprop));
  }

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

  GetPropertyAge(PropertyEstablishmentDate: Date): string {
    const Today = new Date();
    const EstablishMentdate = new Date(PropertyEstablishmentDate);
    let age = Today.getFullYear() - EstablishMentdate.getFullYear();
    let month = Today.getMonth() - EstablishMentdate.getMonth();

    if (
      month < 0 ||
      (month === 0 && Today.getDate() < EstablishMentdate.getDate())
    ) {
      age--;
    }
    if (Today < EstablishMentdate) {
      return '0';
    }
    if (age === 0) {
      return 'Lesthan a year';
    }
    return age.toString();
  }

  GetPropertyTypes(): Observable<IdTextDto[]> {
    return this.http.get<IdTextDto[]>(
      this.BaseUrl + '/PropertyType/propertytype'
    );
  }
  GetPropertyFurnishTypes(): Observable<IdTextDto[]> {
    return this.http.get<IdTextDto[]>(
      this.BaseUrl + '/PropertyFurnishType/furnishtype'
    );
  }
}
