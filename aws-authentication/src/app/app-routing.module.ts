import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/authentication/login/login.component";
import {RegisterComponent} from "./components/authentication/register/register.component";
import {LogoutComponent} from "./components/authentication/logout/logout.component";
import {RouteGuardService} from "./services/route-guard.service";
import {OrderComponent} from "./components/order/order.component";
import {CodeValidationComponent} from "./components/authentication/code-validation/code-validation.component";
import {EnterEmailComponent} from "./components/authentication/enter-email/enter-email.component";
import {ForgotPasswordComponent} from "./components/authentication/forgot-password/forgot-password.component";



const routes: Routes = [
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'enter-email',component:EnterEmailComponent},
  {path:'code-validation', component:CodeValidationComponent},
  {path: 'order', component:OrderComponent, canActivate:[RouteGuardService]},
  {path: 'logout', component:LogoutComponent, canActivate:[RouteGuardService]},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
