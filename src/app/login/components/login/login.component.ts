import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LogInService } from "./LogIn.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userName: string;
  userPassword: string;
  constructor(private logInService: LogInService) {}

  ngOnInit(): void {}

  async loginSubmit() {
    console.log(312);
    await this.logInService.loginUser();
    // console.log(this.userName, this.userPassword);
  }
}
