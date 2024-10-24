import { Injectable } from '@angular/core';
import { Firestore  , collection , collectionData , orderBy , query , deleteDoc,doc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  constructor(private afs : Firestore , private toast : ToastrService) { }

  loadData (){
    return collectionData(query (collection(this.afs, 'contact'), orderBy("sendAt", "desc")), { idField: 'id'});
  }

  deleteData (id){
    deleteDoc(doc(this.afs , 'contact', id )).then(() =>{
      this.toast.warning ('Data deleted Successfully ..! ');
    })
  }


}
