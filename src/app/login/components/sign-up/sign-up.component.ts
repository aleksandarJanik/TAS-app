import { Component, OnInit } from "@angular/core";
import { ClassService } from "../../../class/class.service";
import { User } from "../../../models/user";
import { SignUpService } from "./sign-up.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  userName: string;
  userPassword: string;

  constructor(private signUpService: SignUpService) {}

  ngOnInit(): void {}

  addUser(): void {
    let createUser: User = {
      password: this.userPassword,
      userName: this.userName,
    };
    this.signUpService.createUser(createUser);
  }
}
