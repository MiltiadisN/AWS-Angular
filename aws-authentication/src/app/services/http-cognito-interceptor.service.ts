import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {CognitoService} from "./cognito.service";

@Injectable({
  providedIn: 'root'
})
export class HttpCognitoInterceptorService implements HttpInterceptor{

  constructor(private cognitoService: CognitoService) { }

  // Http Interceptor for adding authorization header to HTTP requests
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use from and mergeMap to handle the response from getCurrentSession
    return from(
      this.cognitoService.getCurrentSession()).pipe(mergeMap(resp => {
      // Retrieve the JWT token from the response and set it as the Authorization header
      let token = resp.getIdToken().getJwtToken();
      req= req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      //console.log("req = ", req)
      return next.handle(req);
    }));
  }
}
