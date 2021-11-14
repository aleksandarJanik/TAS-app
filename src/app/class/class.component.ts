import { Component, ElementRef, OnInit } from "@angular/core";
import { Class } from "../models/class";
import { Router, ActivatedRoute } from "@angular/router";
import { ClassService } from "./class.service";
import { User } from "../models/user";
import { LogInService } from "../login/components/login/LogIn.service";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.scss"],
})
export class ClassComponent implements OnInit {
  classes: Class[];
  nameClass: string;
  public show: boolean = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private classService: ClassService,
    private logInService: LogInService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.classesService.getClasses().subscribe((data) => (this.classes = data));
    // this.addUser({
    //   userName: "exfled",
    //   password: "testing",
    // });
  }

  navigateToFirst(id: number) {
    this._router.navigate([id + ""], { relativeTo: this._activatedRoute });
  }

  async addClass() {
    await this.classService.createClass(this.nameClass, this.logInService.user);
  }

  collapsingAddClass() {
    let container = this.el.nativeElement.querySelector(
      "#addClassFormCardBody"
    );

    let icon = this.el.nativeElement.querySelector(
      "#btnForCollapsingAddClass i"
    );

    this.show = !this.show;

    if (this.show) {
      container.classList.add("collapse");
      icon.classList.add("bi-dash");
      icon.classList.remove("bi-plus");
    } else {
      container.classList.remove("collapse");
      icon.classList.remove("bi-dash");
      icon.classList.add("bi-plus");
    }
  }

  logOut() {
    this._router.navigateByUrl("/create-account/login");
  }
}
