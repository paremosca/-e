// import { Injectable } from '@angular/core';
// //import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, switchMap } from 'rxjs/operators';
// import { StorageService } from '../_services/storage.service';
// import { AuthService } from '../_services/auth.service';
// import { EventBusService } from '../_shared/event-bus.service';
// import { EventData } from '../_shared/event.class';

// @Injectable()
// export class HttpRequestInterceptor implements HttpInterceptor {

//     private isRefreshing = false;

//     constructor(
//       private storageService: StorageService,
//       private authService: AuthService,
//       private eventBusService: EventBusService
//     ) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     req = req.clone({
//       withCredentials: true,
//     });

//     return next.handle(req).pipe(
//         catchError((error) => {
//           if (
//             error instanceof HttpErrorResponse &&
//             !req.url.includes('auth/IniciarSesion') &&
//             error.status === 401
//           ) {
//             return this.handle401Error(req, next);
//           }

//           return throwError(() => error);
//         })
//       );

//   }

//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;

//       if (this.storageService.isLoggedIn()) {
//         return this.authService.refreshToken(this.storageService.getRefreshToken()).pipe(
//           switchMap((val) => {
//             this.isRefreshing = false;
//             console.log(val);
//             this.storageService.saveUser(val);
//             return next.handle(request);
//           }),
//           catchError((error) => {
//             this.isRefreshing = false;

//             if (error.status == '403') {
//               this.eventBusService.emit(new EventData('logout', null));
//             }

//             return throwError(() => error);
//           })
//         );
//       }
//     }

//     return next.handle(request);
//   }

// }

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
// ];
