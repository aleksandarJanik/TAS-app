import { Component, ElementRef, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import Swal from "sweetalert2";
import { StringLiteralLike } from "typescript";
import { LogInService } from "../login/components/login/LogIn.service";
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
  public show: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private logInService: LogInService,
    private _router: Router,
    private el: ElementRef
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get("id");
    if (this.classId) {
      this.students = await this.studentService.getStudentsByClass(
        this.classId
      );
      console.log("test" + JSON.stringify(this.students));
    }
  }

  async addStudent() {
    await this.studentService.createStudent(
      this.studentNameSurname,
      this.classId
    );
    this.students = await this.studentService.getStudentsByClass(this.classId);
    this.studentNameSurname = "";
    let swal = Swal.fire({
      text: `The student ${this.studentNameSurname} successfully added!!`,
      icon: "success",
    });
  }
  async logOut() {
    await this.logInService.logout();
    this._router.navigateByUrl("/create-account/login");
  }
  collapsingAddStudent() {
    let container = this.el.nativeElement.querySelector(
      "#addStudentFormCardBody"
    );

    let icon = this.el.nativeElement.querySelector(
      "#btnForCollapsingAddStudent i"
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

  redirectToClasses() {
    this._router.navigateByUrl("/class");
  }

  async removeStudent(studentId) {
    await this.studentService.deleteStudent(studentId);
    this.students = await this.studentService.getStudentsByClass(this.classId);
    let swal = Swal.fire({
      text: "The student successfully removed!!",
      icon: "success",
    });
  }
}
