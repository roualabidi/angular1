import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AhmedComponent } from './categories/ahmed.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { ContactComponent } from './contact/contact.component';
import { CommentsComponent } from './comments/comments.component';


const routes: Routes = [
  {path :"" , component:DashboardComponent , canActivate :[AuthGuard]},
  {path :"login" , component:LoginComponent},
  {path :"ahmed" , component: AhmedComponent ,canActivate :[AuthGuard]},
  {path :"posts" , component: AllPostComponent, canActivate :[AuthGuard] },
  {path :"posts/new" , component: NewPostComponent ,  canActivate :[AuthGuard]},
  {path :"subscribers" , component: SubscribersComponent ,canActivate :[AuthGuard] },
  {path :"contact" , component: ContactComponent ,canActivate :[AuthGuard]},
  {path :"comments" , component: CommentsComponent ,canActivate :[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
