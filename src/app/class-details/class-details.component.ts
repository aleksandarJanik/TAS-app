import { Component, ElementRef, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
} from "@angular/router";
import Swal from "sweetalert2";
import { StringLiteralLike } from "typescript";
import { LogInService } from "../login/components/login/LogIn.service";
import { Answer } from "../models/answer";
import { Class } from "../models/class";
import { StartLecturing } from "../models/startLecturing";
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
  startLecturing: StartLecturing[];
  presentStudents: StartLecturing[];
  copyPresentStudents: StartLecturing[];
  pickedStudent: StartLecturing;
  pickedStudentName: string;
  studentNameSurname: string;
  counter: number = 0;
  public show: boolean = true;
  messageForLecturing: string = '';
  isLecturingStarted: boolean = false;
  answerTypes: string[] = ['test', 'usno', 'pismeno'];
  gradeForAnswer: string = '';
  selectedAnswerType: string = '';

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
      this.startLecturing = this.students.map( s => ({
        student: s,
        isPresent: true,
        isPicked: false
      }) as StartLecturing)
      // console.log("start lecturing Object " + JSON.stringify(this.startLecturing));
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

  checkValue(student: StartLecturing): void {
    student.isPresent = !!student.isPresent;
  }

  startClassLecturing(): void {
    this.isLecturingStarted = !this.isLecturingStarted;
  }

  pickStudent(): void {
    if (this.counter === 0) {
      this.presentStudents = this.startLecturing.filter( s => s.isPresent === true);
      this.copyPresentStudents = [...this.presentStudents];
      this.counter++;
    }
    if (this.presentStudents.length >= 1) {
      const rndInt = Math.floor(Math.random() * this.presentStudents.length) + 1;
      this.pickedStudent = this.presentStudents[rndInt - 1];
      this.pickedStudentName = this.pickedStudent.student.name;
      if (this.presentStudents.length === 1){
        this.presentStudents = [];
      } else {
        this.presentStudents.splice(rndInt - 1, 1);
      }
      console.log("arrayyyyyy " + JSON.stringify(this.presentStudents));
    }
    else {
      this.messageForLecturing = 'All students are asked !!!';
      this.pickedStudentName = '';
    }
  }

  onSelected(answerType: string): void {
    this.selectedAnswerType = answerType;
  }

  addGrade(): void{
    let studentAnswered: Answer = {
      typeAnswer: this.selectedAnswerType,
      gradeAnswer: this.gradeForAnswer,
      dateAnswered: new Date(),
      answerId: '123455o0sd'
    };
    console.log("Answe for student " + JSON.stringify(studentAnswered));
    this.gradeForAnswer = '';
  }
}
