import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword , createUserWithEmailAndPassword, authState, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggeIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false)

  isLoggedGuard : boolean = false

  constructor(private auth: Auth,private toastr : ToastrService, private router : Router) { }

  login (email , password){
    signInWithEmailAndPassword(this.auth, email , password).then (logref =>{
      this.toastr.info('Logged In successfully')
      this.loadUser()
      this.loggeIn.next (true)
      this.isLoggedGuard= true
      this.router.navigate(['/'])
    }).catch(e =>{
      this.toastr.warning(e)
    })
  }

  Register(email : string, password : string) {
    createUserWithEmailAndPassword(this.auth, email, password)
    .then((result) => {
     
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  loadUser(){
     authState(this.auth).subscribe (user =>{

      localStorage.setItem('user' , JSON.stringify(user))
     })
  }

  logOut(){
    signOut (this.auth).then (() => {
      this.toastr.info ('user Logged Out Successfully')
      localStorage.removeItem ('user')
      this.loggeIn.next(false)
      this.isLoggedGuard = false
    })
    
  }

  isLogged (){
    return this.loggeIn.asObservable()
  }

}
