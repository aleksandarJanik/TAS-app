import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ClassService } from "../../../class/class.service";
import { User } from "../../../models/user";
import { SignUpService } from "./sign-up.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  userName: string;
  userPassword: string;

  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit(): void {}

  async addUser() {
    let createUser: User = {
      password: this.userPassword,
      userName: this.userName,
    };
    let response = await this.signUpService.createUser(createUser);
    if (response == false) {
      Swal.fire({ text: "The username already exist!!", icon: "info" });
    } else {
      this.router.navigateByUrl("/create-account/login");
    }
  }
}
