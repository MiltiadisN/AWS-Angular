import {Component, OnInit} from '@angular/core';
import {User} from "../../../common/user";
import {ActivatedRoute, Router} from "@angular/router";
import {CognitoService} from "../../../services/cognito.service";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  user : User;//variable to store the user data
  userForm!: FormGroup; //variable to hold the user form

  //variables for password and confirm password visibility
  showNewPassword: boolean=false;
  showConfirmPassword: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, //inject ActivatedRoute to get the parameters
              private router: Router, //inject Router
              private cognitoService: CognitoService, //inject CognitoService
              private formBuilder: FormBuilder //inject FormBuilder
  ) {
    // Initialize the user object
    this.user = {} as User;
  }

  public ngOnInit(){

    // Subscribe to the query parameters from the activated route
    this.activatedRoute.queryParams.subscribe(params => {
      // Get the 'email' parameter from the URL and store it in the user object
      let email = params['email'];
      this.user.email = email;
      // Call the forgotPassword method from the Cognito service to initiate the password reset process
      this.cognitoService.forgotPassword(this.user).then(()=>{
        console.log("reset sent...");
      }).catch(error => {
        console.log("Default error: ", error.code);
      })
    })


    //Initialize userForm and adding Validators
    this.userForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
  }, {validators: this.passwordMatchValidator});

  }


  // Method to reset the password
  public resetPassword(): void{
    if (this.userForm.valid) {
      this.user.code = this.userForm.value.code;
      this.user.password = this.userForm.value.password;
      // Call the forgotPasswordSubmit method from the Cognito service to submit the new password
      this.cognitoService.forgotPasswordSubmit(this.user).then((resp) => {
        // After successful password reset, navigate to the login page
        this.router.navigate(['/login']);
      });
    }
  }


  //method for match password and confirm password
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    //console.log(confirmPassword, password);

    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  // Method to toggle confirm password visibility
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }



}
