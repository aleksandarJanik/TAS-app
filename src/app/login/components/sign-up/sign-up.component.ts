import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ClassService } from "../../../class/class.service";
import { User } from "../../../models/user";
import { SignUpService } from "./sign-up.service";
import { Router } from "@angular/router";
import { LogInService } from "../login/LogIn.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  userName: string;
  userPassword: string;
  email: string;

  constructor(
    private signUpService: SignUpService,
    private logInService: LogInService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async generateRandomId(): Promise<string> {
    let id = Math.random().toString(36).slice(2);
    let users = await this.logInService.getUsers();
    let idExist = users.some((user) => user.id === id);
    if (idExist) {
      this.generateRandomId();
    } else {
      return id;
    }
  }

  async addUser() {
    let userId = await this.generateRandomId();
    let createUser: User = {
      id: userId,
      password: this.userPassword,
      userName: this.userName,
      email: this.email,
    };
    let response = await this.signUpService.createUser(createUser);
    if (response == false) {
      Swal.fire({ text: "The username already exist!!", icon: "info" });
    } else {
      this.router.navigateByUrl("/create-account/login");
    }
  }
}
