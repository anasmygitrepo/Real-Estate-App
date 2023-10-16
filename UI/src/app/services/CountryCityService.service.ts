import { Injectable } from '@angular/core';

@Injectable()
export class CountryCityServiceService {
  constructor() {}

  Contrys = [
    {
      name: 'Afghanistan',
      topLevelDomain: Array(1),
      alpha2Code: 'AF',
      alpha3Code: 'AFG',
      callingCodes: Array(1),
    },

    {
      name: 'Åland Islands',
      topLevelDomain: Array(1),
      alpha2Code: 'AX',
      alpha3Code: 'ALA',
      callingCodes: Array(1),
    },
  ];
}
