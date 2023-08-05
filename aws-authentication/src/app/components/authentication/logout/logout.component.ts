import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{


  constructor(private cognitoService: CognitoService) {
  }

  public ngOnInit(): void{

    //logout user
    this.cognitoService.signOut().then(() => {
      console.log("Logged out!");
    })
  }

}
