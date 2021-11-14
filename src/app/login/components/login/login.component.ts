import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { timeEnd } from "console";
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
    await this.logInService.loginUser(this.userName, this.userPassword);
    // console.log(this.userName, this.userPassword);
  }
}
