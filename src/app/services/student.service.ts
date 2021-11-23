import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { StartLecturing } from "../models/startLecturing";
import { Student } from "../models/student";
import {
  catchError,
  filter,
  map,
  mergeMap,
  scan,
  shareReplay,
  tap,
  toArray,
  switchMap,
} from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private studentCollection: AngularFirestoreCollection<Student>;
  public presentStudents: StartLecturing[];
  public errorMessage: string;

  private messageSelectedSubject = new BehaviorSubject<string>("");
  messageSelectedAction$ = this.messageSelectedSubject.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.studentCollection = this.firestore.collection<Student>("Student");
  }

  async getStudentsByClass(classId: string): Promise<Student[]> {
    let repsonse = await this.studentCollection.ref.get();
    let students = repsonse.docs
      .map((doc) => doc.data())
      .filter((c) => c.classId === classId);
    return students;
  }

  async getNumberOfStudentsPerClass(classId: string) {
    let repsonseSt = await this.studentCollection.ref.get();
    return repsonseSt.docs
      .map((doc) => doc.data())
      .filter((c) => c.classId === classId).length;
  }

  async getStudentById(studentId) {
    let repsonse = await this.studentCollection.ref.get();
    let student = repsonse.docs
      .map((doc) => doc.data())
      .find((st) => st.studentId == studentId);
    return student;
  }

  async getStudents(): Promise<Student[]> {
    let repsonse = await this.studentCollection.ref.get();
    let students = repsonse.docs.map((doc) => doc.data());
    return students;
  }

  async deleteStudent(studentId) {
    let res = await this.studentCollection.ref.get();
    res.docs.find((c) => c.data().studentId === studentId).ref.delete();
  }

  async createStudent(studentName: string, classId: string, email: string) {
    let studentId = await this.generateRandomId();

    let studentObj: Student = {
      classId: classId,
      name: studentName,
      studentId: studentId,
      typeAnswer: "",
      email,
    };

    let repsonse = await this.studentCollection.add(studentObj);
  }

  async generateRandomId(): Promise<string> {
    let id = Math.random().toString(36).slice(2);
    let students = await this.getStudents();
    let idExist = students.some((c) => c.studentId === id);
    if (idExist) {
      this.generateRandomId();
    } else {
      return id;
    }
  }

  async uploadStudentAnswer(studentId, answer: string) {
    let res = await this.studentCollection.ref.get();
    let student = await this.getStudentById(studentId);
    console.log(student);
    const updatedTypeAnswer = student.typeAnswer + answer;
    console.log("updatedTypeAnswer: ", student.typeAnswer, answer);
    console.log(student);
    res.docs
      .find((c) => c.data().studentId === studentId)
      .ref.update({ typeAnswer: updatedTypeAnswer });
  }

  selectedMessageChanged(selectedMessage: string): void {
    this.messageSelectedSubject.next(selectedMessage);
  }

  async deleteAllStudentsByClassId(classId: string) {
    let res = await this.studentCollection.ref.get();
    let studentsToDel = res.docs.filter((c) => c.data().classId === classId);
    studentsToDel.forEach((s) => s.ref.delete());
  }

  async updateStudentInModal(
    studentId: string,
    profileName: string,
    profileEmail: string,
    profileTypeAnswer: string
  ) {
    let studentFormModal: Student = {
      studentId: studentId,
      name: profileName,
      email: profileEmail,
      typeAnswer: profileTypeAnswer,
    };
    let res = await this.studentCollection.ref.get();
    let student = await this.getStudentById(studentFormModal.studentId);
    return res.docs
      .find((c) => c.data().studentId === studentFormModal.studentId)
      .ref.update({
        typeAnswer: studentFormModal.typeAnswer,
        name: studentFormModal.name,
        email: studentFormModal.email,
      });
  }
}
