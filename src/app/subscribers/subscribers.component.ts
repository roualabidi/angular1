import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit{

  subsribers : Observable<any>

  constructor (private subs : SubscribersService){}


  ngOnInit(): void {
    this.subsribers = this.subs.loadData()
  }

  onDelete (id) {
    console.log(id);
    
    this.subs.deleteDAta(id)
  }



}
