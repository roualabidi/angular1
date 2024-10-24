import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacsArray : Observable<any>

  constructor (private contact: ContactService){}

  ngOnInit(): void {
    this.contacsArray = this.contact.loadData()
  }

  onDelete(id) {
    this.contact.deleteData(id)
  }
  

}
