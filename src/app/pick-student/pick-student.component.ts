import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pick-student",
  templateUrl: "./pick-student.component.html",
  styleUrls: ["./pick-student.component.scss"],
})
export class PickStudentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // $(window).resize(function(){
    //     window.resizeTo(size[0],size[1]);
    // })
    window.resizeTo(300, 200);
  }
}
