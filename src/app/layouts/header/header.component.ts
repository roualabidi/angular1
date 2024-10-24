import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import {Observable} from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor (private auths : AuthService){}

  userEmail :string 
  isloggedIn : Observable <boolean>

  ngOnInit(): void {
    this.userEmail= JSON.parse(localStorage.getItem ('user')).email

    this.isloggedIn = this.auths.isLogged()
  }

  onLogOut(){
    this.auths.logOut() 
  }


}
