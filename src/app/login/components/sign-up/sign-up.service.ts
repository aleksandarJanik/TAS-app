import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { User } from "../../../models/user";

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  private usersCollection: AngularFirestoreCollection<User>;
  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>("Users");
  }

  async getUsers(): Promise<User[]> {
    let repsonse = await this.usersCollection.ref.get();
    let users = repsonse.docs.map((doc) => doc.data());
    console.log(users);
    return users;
  }

  async createUser(user: User) {
    let repsonse = await this.usersCollection.add(user);
    return repsonse;
  }
}
