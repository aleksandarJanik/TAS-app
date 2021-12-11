import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.userCollection = this.firestore.collection<User>("Users");
  }
  async getUserByUsername(username: string): Promise<User> {
    let repsonse = await this.userCollection.ref.get();
    let user = repsonse.docs
      .map((doc) => doc.data())
      .find((c) => c.userName === username);
    return user;
  }

  async updateUserPassword(newPassword: string, user: User) {
    let res = await this.userCollection.ref.get();
    res.docs
      .find((c) => c.data().userName === user.userName)
      .ref.update({ password: newPassword });
  }
}
