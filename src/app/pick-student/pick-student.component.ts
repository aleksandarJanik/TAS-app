import { Component, OnInit } from "@angular/core";
import { StartLecturing } from "../models/startLecturing";
import Swal from "sweetalert2";
import { StudentService } from "../services/student.service";
import { TypeAnswer } from "../models/student";

@Component({
  selector: "app-pick-student",
  templateUrl: "./pick-student.component.html",
  styleUrls: ["./pick-student.component.scss"],
})
export class PickStudentComponent implements OnInit {
  presentStudents: StartLecturing[];
  pickedStudent: StartLecturing;
  pickedStudentName: string;
  messageForLecturing: string = "";
  gradeForAnswer: string = "";
  selectedAnswerType: string = "";
  showButtons: boolean = false;
  answerTypes: string[] = ["test", "usno", "pismeno"];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.presentStudents = JSON.parse(
      localStorage.getItem("presentStudents") || "[]"
    );
    console.log(JSON.stringify(this.presentStudents));
    window.resizeTo(320, 180);
  }

  async pickStudent() {
    if (this.presentStudents.length >= 1) {
      const rndInt =
        Math.floor(Math.random() * this.presentStudents.length) + 1;
      this.pickedStudent = this.presentStudents[rndInt - 1];
      this.pickedStudentName = this.pickedStudent.student.name;
      if (this.presentStudents.length === 1) {
        this.presentStudents = [];
      } else {
        this.presentStudents.splice(rndInt - 1, 1);
      }
      console.log("arrayyyyyy " + JSON.stringify(this.presentStudents));
      this.showButtons = true;
    } else {
      window.close();
      this.studentService.selectedMessageChanged("All students were asked once!!");
      let swal = Swal.fire({
        text: "All students were asked once!!",
        icon: "success",
      });
      // alert("All students were asked once!!");
    }
  }
  async positiveResponse() {
    let studentId = this.pickedStudent.student.studentId;
    await this.studentService.uploadStudentAnswer(studentId, TypeAnswer.PLUS);
    this.showButtons = false;
  }
  async negativeResponse() {
    let studentId = this.pickedStudent.student.studentId;
    await this.studentService.uploadStudentAnswer(studentId, TypeAnswer.MINUS);
    this.showButtons = false;
  }
}
