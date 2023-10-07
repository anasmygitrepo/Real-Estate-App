import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AlertyfyService } from 'src/app/services/Alertyfy.service';
import {
  Observable,
  catchError,
  concatMap,
  of,
  retry,
  retryWhen,
  throwError,
} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private AlertyfyService: AlertyfyService) {}

  //check the request have any error
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('http request started');
    return next.handle(request).pipe(
      retryWhen((error) => this.RetrayRequest(error, 10)),
      catchError((error: HttpErrorResponse) => {
        const Error = this.setError(error);
        this.AlertyfyService.error(Error);
        return throwError(Error);
      })
    );
  }

  //retry the request in case of error it will retray 10 times after throw the error
  RetrayRequest(
    error: Observable<unknown>,
    retrycount: number
  ): Observable<unknown> {
    return error.pipe(
      concatMap((checkerr: HttpErrorResponse, count) => {
        if (checkerr.status === 0 && count <= retrycount) {
          return of(checkerr);
        }
        return throwError(checkerr);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let ErrorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      //front-end error
      ErrorMessage = error.error.message;
    } else {
      if (error.status !== 0) {
        //backend error
        ErrorMessage = error.error.errorMessage;
        console.log(ErrorMessage);
      }
    }
    return ErrorMessage;
  }
}
