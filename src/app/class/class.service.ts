import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { LogInService } from "../login/components/login/LogIn.service";
import { Class } from "../models/class";
import { User } from "../models/user";
import { ClassComponent } from "./class.component";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  private classCollection: AngularFirestoreCollection<Class>;
  constructor(
    private firestore: AngularFirestore,
    private logInService: LogInService
  ) {
    this.classCollection = this.firestore.collection<Class>("Class");
  }

  async getClasses(): Promise<Class[]> {
    let repsonse = await this.classCollection.ref.get();
    console.log(this.logInService.user);
    let classes = repsonse.docs
      .map((doc) => doc.data())
      .filter((c) => c.userId === this.logInService.user.id);
    return classes;
  }

  async createClass(className: string, user: User) {
    let classId = await this.generateRandomId();
    let classes = await this.getClasses();
    let classExist = classes.some((c) => c.name === className);
    if (classExist) {
      return false;
    } else {
      let classObj: Class = {
        userId: user.id,
        name: className,
        classId: classId,
      };
      await this.classCollection.add(classObj);
      return true;
    }
  }
  async generateRandomId(): Promise<string> {
    let id = Math.random().toString(36).slice(2);
    let classes = await this.getClasses();
    let idExist = classes.some((c) => c.classId === id);
    if (idExist) {
      this.generateRandomId();
    } else {
      return id;
    }
  }
}
