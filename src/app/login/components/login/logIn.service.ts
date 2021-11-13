import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { User } from "../../../models/user";

@Injectable({
  providedIn: "root",
})
export class LogInService {
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>("Users");
  }

  async getUsers(): Promise<User[]> {
    let repsonse = await this.usersCollection.ref.get();
    let users = repsonse.docs.map((doc) => doc.data());
    return users;
  }

  async loginUser() {
    console.log(123);
    // let users = await this.getUsers();
    // let isUserInDb = users.some((u) => {
    //   return u.userName === username && u.password === password;
    // });
    // console.log(isUserInDb);
  }
}
