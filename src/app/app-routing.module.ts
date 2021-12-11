import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { HomeRoutingModule } from "./home/home-routing.module";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { ClassComponent } from "./class/class.component";
import { ClassDetailsComponent } from "./class-details/class-details.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { PickStudentComponent } from "./pick-student/pick-student.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: "pick",
    component: PickStudentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "class/:id",
    component: ClassDetailsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "class",
    component: ClassComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "",
    redirectTo: "class",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HomeRoutingModule,
    DetailRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
