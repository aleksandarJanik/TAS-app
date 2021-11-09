import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";

export interface User {
  fullName: string;
  password: string;
  username: string;
}

@Injectable({
  providedIn: "root",
})
export class ClassService {
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
    console.log(repsonse);
    return repsonse;
  }
}
