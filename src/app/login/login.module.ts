import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateAccountComponent } from "./components/create-account/create-account.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { LoginRoutingModule } from "./login-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [CreateAccountComponent, LoginComponent, SignUpComponent, ChangePasswordComponent],
  imports: [CommonModule, SharedModule, LoginRoutingModule],
})
export class LoginModule {}
