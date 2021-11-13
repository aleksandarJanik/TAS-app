import { Component, OnInit } from "@angular/core";
import { Class } from "../models/class";
import { Router, ActivatedRoute } from "@angular/router";
import { ClassService } from "./class.service";
import { User } from "../models/user";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.scss"],
})
export class ClassComponent implements OnInit {
  classes: Class[];
  nameClass: string;
  createdClass: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private classService: ClassService
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

  addClass(): void {
    console.log(this.nameClass + "NAME OF CLASS");
    this.createdClass = this.nameClass;
    this.nameClass = "";
  }

  // addUser(user: User) {
  //   this.classService.getUsers();
  //   // this.classService.createUser(user);
  // }
}
