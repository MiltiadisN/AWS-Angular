import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";
import {User} from "../../../common/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit{

  user: User; //variable to hold user data
  userForm!: FormGroup; //variable to hold the user form

  constructor(private router: Router, // inject Router
              private cognitoService: CognitoService, //inject CognitoService
              private formBuilder: FormBuilder //inject FormBuilder
  ) {
    // Initialize the user object
    this.user = {} as User;
  }

  ngOnInit(): void {

    //initialize userForm
    this.userForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    })
  }


  // Method to navigate to the forgot password page and pass the email as a query parameter
  public toForgotPassword():void{
    if (this.userForm.valid) {
      this.user.email = this.userForm.value.email;
      // Check if the email field is not empty
      if (this.user.email && this.user.email.length > 0) {
        // Navigate to the 'forgot-password' path and pass the email as a query parameter
        this.router.navigate(['/forgot-password'],
          {queryParams: {'email': this.user.email}})// The query params will be available in the component on the other side

      }
    }
  }


}
