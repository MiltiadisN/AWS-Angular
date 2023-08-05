import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../services/cognito.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  userEmail: string=''; //variable to store the email

  constructor(private cognitoService: CognitoService,
              ) {}

  ngOnInit(): void {
    //store the email from cognitoService
    this.userEmail=this.cognitoService.getUserEmail();
  }


  // Method to check if the user is authenticated
  public isAuthenticated(): boolean{
    return this.cognitoService.isAuthenticated();
  }

}
