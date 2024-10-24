import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AhmedComponent } from './categories/ahmed.component';
import { ToastrModule } from 'ngx-toastr';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ContactComponent } from './contact/contact.component';
import { CommentsComponent } from './comments/comments.component';

const firebase = {
  apiKey: "AIzaSyCPPRd8_aawMP3_Q1WZWZiKWDTpti13HrA",
  authDomain: "ang-blog-c9748.firebaseapp.com",
  projectId: "ang-blog-c9748",
  storageBucket: "ang-blog-c9748.appspot.com",
  messagingSenderId: "784208477371",
  appId: "1:784208477371:web:47290b46144606bd963d9e"
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AhmedComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    SubscribersComponent,
    ContactComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebase)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule, 
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
