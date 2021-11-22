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
import { StartLecturing } from "../models/startLecturing";
import { ExportCsvStudentDto, Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { ElectronService } from "../core/services/electron/electron.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ClassService } from "../class/class.service";
import { Angular2Csv } from "angular2-csv/Angular2-csv";
import { FormControl, FormGroup } from "@angular/forms";

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
  pickedStudentId: string;
  studentNameSurname: string;
  counter: number = 0;
  public show: boolean = true;
  messageForLecturing: string = "";
  isLecturingStarted: boolean = false;
  answerTypes: string[] = ["test", "usno", "pismeno"];
  gradeForAnswer: string = "";
  selectedAnswerType: string = "";
  searchText;
  openStudentForEdit: StartLecturing;
  email;
  classesToExport: ExportCsvStudentDto[];
  profileName: string;
  profileEmail: string;
  profileTypeAnswer: string;
  messageSelected$ = this.studentService.messageSelectedAction$.pipe(
    tap((product) => console.log("selectedProduct", product))
  );
  options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalseparator: ".",
    showLabels: false,
    headers: [],
    showTitle: true,
    title: "",
    useBom: false,
    removeNewLines: true,
    keys: ["className", "studentName", "typeAnswer", "email"],
  };

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private logInService: LogInService,
    private _router: Router,
    private el: ElementRef,
    private electronService: ElectronService,
    private classService: ClassService
  ) {}

  async ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get("id");
    if (this.classId) {
      this.students = await this.studentService.getStudentsByClass(
        this.classId
      );
      this.startLecturing = this.students.map(
        (s) =>
          ({
            student: s,
            isPresent: true,
            isPicked: false,
          } as StartLecturing)
      );
      // console.log("start lecturing Object " + JSON.stringify(this.startLecturing));
      this.prepareForExport();
    }
  }

  downloadFile() {
    new Angular2Csv(this.classesToExport, "test", this.options);
  }

  async prepareForExport() {
    let classFull = await this.classService.getClassById(this.classId);
    let studentsForEx = await this.studentService.getStudentsByClass(
      this.classId
    );
    this.classesToExport = studentsForEx.map((s) => {
      let newS: ExportCsvStudentDto = {
        className: classFull.name,
        email: s.email,
        studentName: s.name,
        typeAnswer: s.typeAnswer,
      };
      return newS;
    });
    let title: ExportCsvStudentDto = {
      className: "Class",
      studentName: "Student",
      typeAnswer: "Аctivities",
      email: "Email",
    };
    this.classesToExport.unshift(title);
  }

  async renderStudent() {
    this.students = await this.studentService.getStudentsByClass(this.classId);
    this.startLecturing = this.students.map(
      (s) =>
        ({
          student: s,
          isPresent: true,
          isPicked: false,
        } as StartLecturing)
    );
  }

  async addStudent() {
    await this.studentService.createStudent(
      this.studentNameSurname,
      this.classId,
      this.email
    );
    this.renderStudent();
    this.studentNameSurname = "";
    this.email = "";
    let swal = Swal.fire({
      text: `The student ${this.studentNameSurname} successfully added!!`,
      icon: "success",
    });
    this.prepareForExport();
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
    this.renderStudent();
    let swal = Swal.fire({
      text: "The student successfully removed!!",
      icon: "success",
    });
    this.prepareForExport();
  }

  checkValue(student: StartLecturing): void {
    student.isPresent = !!student.isPresent;
  }

  startClassLecturing(): void {
    this.presentStudents = this.startLecturing.filter(
      (s) => s.isPresent === true
    );
    this.studentService.presentStudents = this.presentStudents;
    localStorage.setItem(
      "presentStudents",
      JSON.stringify(this.presentStudents)
    );
    // console.log(JSON.stringify(this.presentStudents));
    // let childWindow = window.open("http://localhost:4200/pick", "_blank");
    const BrowserWindow = this.electronService.remote.BrowserWindow;
    let childWindow = new BrowserWindow({
      resizable: false,
      alwaysOnTop: true,
      minimizable: false,
    });
    childWindow.loadURL("http://localhost:4200/pick");
  }

  pickStudent(): void {
    if (this.counter === 0) {
      this.presentStudents = this.startLecturing.filter(
        (s) => s.isPresent === true
      );
      this.copyPresentStudents = [...this.presentStudents];
      this.counter++;
    }
    if (this.presentStudents.length >= 1) {
      const rndInt =
        Math.floor(Math.random() * this.presentStudents.length) + 1;
      this.pickedStudent = this.presentStudents[rndInt - 1];
      this.pickedStudentName = this.pickedStudent.student.name;
      this.pickedStudentId = this.pickedStudent.student.studentId;
      if (this.presentStudents.length === 1) {
        this.presentStudents = [];
      } else {
        this.presentStudents.splice(rndInt - 1, 1);
      }
    } else {
      this.messageForLecturing = "All students are asked !!!";
      this.pickedStudentName = "";
      this.pickedStudentId = "";
    }
  }

  onSelected(answerType: string): void {
    this.selectedAnswerType = answerType;
  }

  addGrade(): void {
    // let studentAnswered: Answer = {
    //   typeAnswer: this.selectedAnswerType,
    //   gradeAnswer: this.gradeForAnswer,
    //   dateAnswered: new Date(),
    //   answerId: "123455o0sd",
    // };
    // console.log("Answe for student " + JSON.stringify(studentAnswered));
    // this.gradeForAnswer = "";
  }
  addInfoToModal(studentId) {
    this.openStudentForEdit = this.startLecturing.find(s => s.student.studentId === studentId);
    this.profileName = this.openStudentForEdit.student.name;
    this.profileEmail = this.openStudentForEdit.student.email;
    this.profileTypeAnswer = this.openStudentForEdit.student.typeAnswer;
  }
  async updateStudent() {
    try {
      let updatedStudent = await this.studentService.updateStudentInModal(
        this.openStudentForEdit.student.studentId, this.profileName, this.profileEmail, this.profileTypeAnswer
      );
      this.students = await this.studentService.getStudentsByClass(
        this.classId
      );
      this.startLecturing = this.students.map(
        (s) =>
          ({
            student: s,
            isPresent: true,
            isPicked: false,
          } as StartLecturing)
      );
      let swal = Swal.fire({
        text: "The student successfully updated!!",
        icon: "success",
      });
      this.prepareForExport();
    } catch (e) {
      console.log(e);
    }
  }
}
