import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
import { catchError, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private AlertyfyService: AlertyfyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('http request started');
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        const Error = this.setError(error);
        this.AlertyfyService.error(Error);
        return throwError(Error);
      })
    );
  }
  setError(error: HttpErrorResponse): string {
    let ErrorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      ErrorMessage = error.error.message;
    } else {
      if (error.status !== 0) {
        ErrorMessage = error.error.errorMessage;
        console.log(ErrorMessage);
      }
    }
    return ErrorMessage;
  }
}
