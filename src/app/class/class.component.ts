import { Component, OnInit } from "@angular/core";
import { Class } from "../models/class";
import { ClassService } from "../services/class.service";
import { Router, ActivatedRoute } from "@angular/router";

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
    private classesService: ClassService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.classesService.getClasses().subscribe((data) => (this.classes = data));
  }

  navigateToFirst(id: number) {
    this._router.navigate([id + ""], { relativeTo: this._activatedRoute });
  }

  addClass(): void {
    console.log(this.nameClass + "NAME OF CLASS");
    this.createdClass = this.nameClass;
    this.nameClass = "";
  }
}
