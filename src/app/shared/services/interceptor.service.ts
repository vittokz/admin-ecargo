import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
  } from '@angular/common/http';
  
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
import { AuthFirebaseService } from './auth-firebase.service';

  
  @Injectable({
    providedIn: 'root',
  })
  export class InterceptorService {
    constructor(private router: Router, private authServiceFirebase: AuthFirebaseService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      //recogemos token del local storage
      const token: any = this.authServiceFirebase.getTokenGenerado();
      let request = req;
  
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`,
          },
        });
      }
  
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          //si peticion no fue ejecuta por credenciales
          if (err.status === 401) {
            this.router.navigateByUrl('/');
          }
  
          return throwError(err);
        })
      );
    }
  }