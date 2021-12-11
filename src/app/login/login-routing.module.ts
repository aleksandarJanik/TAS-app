import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "../guards/auth-guard.service";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { CreateAccountComponent } from "./components/create-account/create-account.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "create-account",
    component: CreateAccountComponent,
    canActivateChild: [AuthGuardService],
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "sign-up", component: SignUpComponent },
      { path: "change-password", component: ChangePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
