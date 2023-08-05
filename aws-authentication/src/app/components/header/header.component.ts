import { Component } from '@angular/core';
import {CognitoService} from "../../services/cognito.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private cognitoService: CognitoService //inject CognitoService
    ) {
  }


  // Method to check if the user is authenticated
  public isAuthenticated(): boolean{
    return this.cognitoService.isAuthenticated();
  }

}
