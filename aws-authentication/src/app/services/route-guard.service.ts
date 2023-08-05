import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate} from "@angular/router";
import {CognitoService} from "./cognito.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private cognitoService: CognitoService, //inject CognitoService
              private router: Router //inject Router
  ) { }


  // Method for route guard to check if the user is authenticated
  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
    if (this.cognitoService.isAuthenticated()){
      // If the user is authenticated, allow access to the requested route
      return true;
    } else {
      // If the user is not authenticated, redirect to the login page and deny access
      this.router.navigate(['/login']);
      return false;
    }
  }



}
