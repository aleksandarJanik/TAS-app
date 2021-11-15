import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Sessions } from "../../../models/sessions";
import { User } from "../../../models/user";

@Injectable({
  providedIn: "root",
})
export class LogInService {
  private usersCollection: AngularFirestoreCollection<User>;
  private usersSession: AngularFirestoreCollection<Sessions>;
  public user;
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.usersCollection = this.firestore.collection<User>("Users");
    this.usersSession = this.firestore.collection<Sessions>("session");
  }

  async getUsers(): Promise<User[]> {
    let repsonse = await this.usersCollection.ref.get();

    let users = repsonse.docs.map((doc) => doc.data());
    return users;
  }

  async getSessions(): Promise<Sessions[]> {
    let repsonse = await this.usersSession.ref.get();
    let sessions = repsonse.docs.map((doc) => doc.data());
    return sessions;
  }

  async createSession(session: Sessions) {
    let sessions = await this.getSessions();
    let sessionExist = sessions.some((u) => u.sessionId === session.sessionId);
    if (!sessionExist) {
      let repsonse = await this.usersSession.add(session);
    }
  }

  async loginUser(userName, password) {
    let users = await this.getUsers();
    let userFromDb = users.find((u) => {
      return u.userName === userName && u.password === password;
    });
    if (userFromDb) {
      this.user = userFromDb;
      let sessionId: Sessions = { sessionId: userName + password };
      await this.createSession(sessionId);
      this.router.navigateByUrl("/class");
    } else {
      Swal.fire({
        text: "The username and password are incorrect!!",
        icon: "info",
      });
    }
  }
}
