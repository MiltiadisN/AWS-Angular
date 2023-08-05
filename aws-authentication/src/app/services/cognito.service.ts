import { Injectable } from '@angular/core';
import {User} from "../common/user";
import {BehaviorSubject} from "rxjs";
import {Amplify, Auth} from "aws-amplify";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  user : User = new User();
  private userEmail: string = '';


  constructor() {

    // Configure Amplify with environment
    Amplify.configure({
      Auth: environment.cognito
    });

    // Initialize authenticationSubject as a BehaviorSubject with a value of false
    this.authenticationSubject = new BehaviorSubject<boolean>(false);

  }


  // Method for login (sign in) the user
  public signIn(user: User): Promise<any>{
    return Auth.signIn(user.email, user.password).then(() =>{
      this.authenticationSubject.next(true);
    });
  }


  // Method for logout (sign out) the user
  public signOut(): Promise<any>{
    return Auth.signOut().then(() =>{
      this.authenticationSubject.next(false);
    });
  }

  // Method for user registration (sign up)
  public signUp(user: User): Promise<any>{
    // Use Auth.signUp method to register the user with provided email and password
    return Auth.signUp({
      username: user.email,
      password: user.password
    })
  }

  // Method to confirm user registration (sign up)
  public confirmSignUp(user: User): Promise<any>{
    return Auth.confirmSignUp(user.email, user.code);
  }

  //Method to get information about the current user
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  // Method to determine whether the user is authenticated or not
  public isAuthenticated(): boolean{
    // Return the current value of the authenticationSubject
    return this.authenticationSubject.value
  }


  // Method to get the current user session
  public getCurrentSession(): Promise<any>{
    return Auth.currentSession();
  }


  // Method to resend the confirmation code for user registration
  public resendSignUp(user: User): Promise<any>{
    return Auth.resendSignUp(user.email);
  }

  // Method for forgot password
  public forgotPassword(user: User): Promise<any>{
    return Auth.forgotPassword(user.email);
  }

  // Method to submit the email, code, and new password for resetting the password
  public forgotPasswordSubmit(user: User): Promise<any>{
    return Auth.forgotPasswordSubmit(user.email, user.code, user.password);
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string {
    return this.userEmail;
  }


}
