import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";
import {User} from "../../../common/user";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  isConfirm: boolean;  // Variable to show the section where we enter verification code
  user: User; //variable to hold the user data


  //variable for holding user form and user code form
  userForm!: FormGroup;
  userCodeForm!: FormGroup;

  //variables for password and confirm password visibility
  showPassword: boolean=false;
  showConfirmPassword: boolean = false;




  // Inject Router,CognitoService and formBuilder
  constructor(private router: Router,
              private cognitoService: CognitoService,
              private formBuilder: FormBuilder
  ) {
    this.isConfirm = false; // Initialize the isConfirm variable to false
    this.user = {} as User; // Initialize the user object
  }

  ngOnInit(): void {

    //initialize userForm and adding validators
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
    }, {validators: this.passwordMatchValidator});//adding passwordMatchValidator to form



    //initialize userCodeForm and adding validators
     this.userCodeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });


  }


  // Function to register the user
  public signUp(): void {
    if (this.userForm.valid) {
      this.user.email = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      // Call the signUp method from the Cognito service to register the user
      this.cognitoService.signUp(this.user).then(() => {
        // After successful registration, set isConfirm to true to show the verification section
        this.isConfirm = true;
      }).catch(() => {
        console.log("Something went wrong with signup!");
      })
    }
  }


  // Function to confirm the user after successful sign-up
  public confirmSignUp(): void {
    if (this.userCodeForm.valid){
      this.user.code = this.userCodeForm.value.code;
      // Call the confirmSignUp method from the Cognito service to confirm the sign-up
      this.cognitoService.confirmSignUp(this.user).then(() => {
        // After successful confirmation, navigate to the login page
        this.router.navigate(['/login']);//navigate to path 'login'
      }).catch(() => {
        console.log("Something went wrong with confirm signup!");
      })
    }
  }


  //checking if password and confirmPassword are the same
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    //console.log(confirmPassword, password);

    return password === confirmPassword ? null : { 'mismatch': true };
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Function to toggle confirm password visibility
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }




}
