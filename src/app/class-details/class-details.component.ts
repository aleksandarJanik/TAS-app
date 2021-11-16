import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { StringLiteralLike } from "typescript";
import { Class } from "../models/class";
import { Student } from "../models/student";
import { ClassService } from "../services/class.service";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-class-details",
  templateUrl: "./class-details.component.html",
  styleUrls: ["./class-details.component.scss"],
})
export class ClassDetailsComponent implements OnInit {
  classId: string;
  classes: Class[];
  students: Student[];
  currentClass: Class;
  studentNameSurname: string;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get("id");
    if (this.classId) {
      this.students = await this.studentService.getStudentsByClass(this.classId);
      console.log("test" + JSON.stringify(this.students));
    }
  }

  async addStudent() {
    await this.studentService.createStudent(this.studentNameSurname, this.classId);
    this.students = await this.studentService.getStudentsByClass(this.classId);
    this.studentNameSurname = '';
  }
}
