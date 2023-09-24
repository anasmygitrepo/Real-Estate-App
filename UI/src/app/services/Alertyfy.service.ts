import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AlertyfyService {
  constructor() {}

  success(message) {
    alertyfy.success(message);
  }
  error(message) {
    alertyfy.error(message);
  }
  warning(message) {
    alertyfy.warning(message);
  }
}
