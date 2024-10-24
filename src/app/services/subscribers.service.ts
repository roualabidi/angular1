import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData , deleteDoc , doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs : Firestore , private toats :ToastrService) { }

  loadData (){
    return collectionData(collection(this.afs , 'subscribers'), { idField: 'id'})
  }

  deleteDAta (id){
    deleteDoc(doc(this.afs , 'subscribers', id )).then(() =>{
      this.toats.warning ('Data deleted Successfully ..! ');
    })
  }

}
