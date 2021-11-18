import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { StartLecturing } from "../models/startLecturing";
import { Student } from "../models/student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private studentCollection: AngularFirestoreCollection<Student>;
  public presentStudents: StartLecturing[];

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

  async getStudents(): Promise<Student[]> {
    let repsonse = await this.studentCollection.ref.get();
    let students = repsonse.docs.map((doc) => doc.data());
    return students;
  }

  async deleteStudent(studentId) {
    let res = await this.studentCollection.ref.get();
    res.docs.find((c) => c.data().studentId === studentId).ref.delete();
  }

  async createStudent(studentName: string, classId: string) {
    let studentId = await this.generateRandomId();

    let studentObj: Student = {
      classId: classId,
      name: studentName,
      studentId: studentId,
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
}
