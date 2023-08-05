import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";
import {User} from "../../../common/user";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-code-validation',
  templateUrl: './code-validation.component.html',
  styleUrls: ['./code-validation.component.css']
})
export class CodeValidationComponent implements OnInit{

  user: User; //variable to hold user data
  userForm!: FormGroup; //variable  to hold the user form

  constructor(private activatedRoute: ActivatedRoute, //inject ActivatedRoute to access query parameters
              private router: Router, //Inject Router
              private cognitoService: CognitoService, //Inject CognitoService
              private formBuilder: FormBuilder //Inject FormBuilder
  ) {
    // Initialize user object
    this.user = {} as User;
  }


   ngOnInit(): void{

    //Initialize userForm
     this.userForm = this.formBuilder.group({
       code: ['', [Validators.required]],
     });


     // Subscribe to the query parameters from the activated route
    this.activatedRoute.queryParams.subscribe(params =>{
      // Get the 'email' parameter from the URL and store it in the user object
      let email = params['email'];
        this.user.email = email;
        // Call the resendSignUp method from the Cognito service to send a code for sign-up confirmation
        this.cognitoService.resendSignUp(this.user).then(() => {
          console.log("Code Sent....");
          });
      })


  }


  // Method to confirm the sign-up using the code provided by the user
  public confirmSignUp(): void {
    if (this.userForm.valid) {
      this.user.code = this.userForm.value.code;
      // Call the confirmSignUp method from the Cognito service to confirm the sign-up
      this.cognitoService.confirmSignUp(this.user).then(() => {
        // After successful confirmation, navigate to the login page
        this.router.navigate(['/login']);
      })
    }
  }
}
