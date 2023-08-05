import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";
import {User} from "../../../common/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{



  userForm!: FormGroup; //variable to hold the user form
  user: User; //variable to hold the user data
  errorMessage: string = ''; // Variable to hold the error message

  //variable for password visibility
  showPassword: boolean=false;


  constructor(private router: Router, //inject Router
              private cognitoService: CognitoService, //inject CognitoService
              private formBuilder: FormBuilder //inject FormBuilder
  ) {
    this.user = {} as User; //initialize object user
  }

  ngOnInit(): void {

    //initialize userForm and adding validators
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required ]],
    });

  }


  // Method to Login (Sign in) the user
  public login() {
    if (this.userForm.valid) {
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      //console.log(this.user);
      // Call the signIn method from the CognitoService to sign in the user
      this.cognitoService.signIn(this.user).then(() => {
        // After successful login, navigate to the 'home' page
        this.router.navigate(['/home']);
        this.cognitoService.setUserEmail(this.user.email);
      }).catch((error) => {
        switch (error.code) {
          case 'UserNotConfirmedException':
            // If the user is not confirmed, navigate to the 'code-validation' page and pass the email as a query parameter
            this.router.navigate(['code-validation'], { queryParams: { 'email': this.user.email } });
            break;
          case 'NotAuthorizedException':
            //console.log("Not authorized!");
            // If the user types wrong email or password, show the errorMessage
            this.errorMessage = 'Wrong email or password. Please try again.';
            break;
        }
      });
    }
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



}
