import { Component, OnInit } from "@angular/core";
import { Answer } from "../models/answer";
import { StartLecturing } from "../models/startLecturing";

@Component({
  selector: "app-pick-student",
  templateUrl: "./pick-student.component.html",
  styleUrls: ["./pick-student.component.scss"],
})
export class PickStudentComponent implements OnInit {
  presentStudents: StartLecturing[];
  pickedStudent: StartLecturing;
  pickedStudentName: string;
  messageForLecturing: string = '';
  gradeForAnswer: string = '';
  selectedAnswerType: string = '';
  answerTypes: string[] = ['test', 'usno', 'pismeno'];

  constructor() {}

  ngOnInit(): void {
    this.presentStudents = JSON.parse(localStorage.getItem("presentStudents") || "[]");
    console.log(JSON.stringify(this.presentStudents));
  }

  pickStudent(): void {
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
