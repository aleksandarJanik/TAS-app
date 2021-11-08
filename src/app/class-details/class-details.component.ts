import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Class } from "../models/class";
import { Student } from "../models/student";
import { ClassService } from "../services/class.service";

@Component({
  selector: "app-class-details",
  templateUrl: "./class-details.component.html",
  styleUrls: ["./class-details.component.scss"],
})
export class ClassDetailsComponent implements OnInit {
  id: number;
  classes: Class[];
  students: Student[];
  currentClass: Class;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get("id");
    });
    this.classesService.getClasses().subscribe((data) => {
      if (data) {
        this.classes = data;
        this.currentClass = this.classes.find((c) => c.id === this.id);
        this.students = this.currentClass.listOfStudents;
      }
    });
  }
}
