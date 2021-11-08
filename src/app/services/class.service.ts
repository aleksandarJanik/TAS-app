import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Class } from "../models/class";

@Injectable({
  providedIn: "root",
})
export class ClassService {
  constructor(private http: HttpClient) {}

  public getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>("./assets/i18n/classes.json");
  }
}
