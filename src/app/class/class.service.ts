import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { Class } from "../models/class";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  private classCollection: AngularFirestoreCollection<Class>;
  constructor(private firestore: AngularFirestore) {
    this.classCollection = this.firestore.collection<Class>("Class");
  }

  async getClasses(): Promise<Class[]> {
    let repsonse = await this.classCollection.ref.get();
    let classes = repsonse.docs.map((doc) => doc.data());
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
