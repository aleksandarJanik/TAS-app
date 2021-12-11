import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  confirmNewPassword = "";
  newPassword = "";
  currentPassword = "";
  userName;
  user;
  constructor(public userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.userName;
  }

  async changePassword() {
    let userFromDb = await this.userService.getUserByUsername(this.userName);
    let isExistingPw = this.currentPassword === userFromDb.password;
    let areEqual = this.newPassword === this.confirmNewPassword;
    if (
      this.newPassword !== "" ||
      this.currentPassword !== "" ||
      this.confirmNewPassword !== ""
    ) {
      if (isExistingPw) {
        if (areEqual) {
          await this.userService.updateUserPassword(
            this.newPassword,
            userFromDb
          );
          let swal = Swal.fire({
            text: `Your password was successfully changed!!`,
            icon: "success",
          });
          this._router.navigateByUrl("/class");
        } else {
          let swal = Swal.fire({
            text: `Your confirm password not match with new password!!`,
            icon: "warning",
          });
        }
      } else {
        let swal = Swal.fire({
          text: `This is not your previous password!!`,
          icon: "error",
        });
      }
    }
  }
}
