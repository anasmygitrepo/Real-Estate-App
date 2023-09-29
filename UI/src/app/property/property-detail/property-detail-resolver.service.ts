import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Property } from 'src/app/Models/Property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailResolverService implements Resolve<Property> {
  constructor(private service: HousingService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property> | Property {
    const PropId = route.params['Id'];
    return this.service.GetProperty(+PropId).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
