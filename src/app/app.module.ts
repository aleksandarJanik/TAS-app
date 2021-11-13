import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { HomeModule } from "./home/home.module";
import { DetailModule } from "./detail/detail.module";

import { AppComponent } from "./app.component";
import { ClassComponent } from "./class/class.component";
import { ClassDetailsComponent } from "./class-details/class-details.component";
import { AngularFireModule } from "@angular/fire/compat";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { LoginModule } from "./login/login.module";

const firebaseConfig = {
  apiKey: "AIzaSyCdyowCTstNAf4GYM9J1C2IHlHok8QdfUk",
  authDomain: "tas-project-9e7e7.firebaseapp.com",
  projectId: "tas-project-9e7e7",
  storageBucket: "tas-project-9e7e7.appspot.com",
  messagingSenderId: "871945708594",
  appId: "1:871945708594:web:c7d082d2155831001a482b",
  measurementId: "G-CF57HN58J1",
};

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http, "./assets/i18n/", ".json");

@NgModule({
  declarations: [AppComponent, ClassComponent, ClassDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    LoginModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
