import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { HomeRoutingModule } from "./home/home-routing.module";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { ClassComponent } from "./class/class.component";
import { ClassDetailsComponent } from "./class-details/class-details.component";

const routes: Routes = [
  {
    path: "class/:id",
    component: ClassDetailsComponent,
  },
  {
    path: "class",
    component: ClassComponent,
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
