import { Injectable } from '@angular/core';
import { Firestore , collection ,addDoc, collectionData ,  doc  , updateDoc , setDoc  , deleteDoc} from '@angular/fire/firestore';

import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fire : Firestore , private toastr : ToastrService) {
   }


  saveData(data){
    
    const collcetionInstance =  collection(this.fire, 'categories');


    addDoc(collcetionInstance , data).then((docref) =>{
      this.toastr.info ('Data Insert Successfully ..! ');
    })
    .catch((err)=>{
      console.log (err)
    })
  }

  

  updateData (id : string , data : Category ){
    const docInstance =  doc(this.fire , 'categories'  , id )
    const  updateData = data

    setDoc(docInstance , updateData).then (() => {
      this.toastr.info ('Data updated Successfully ..! ');
      console.log (docInstance , updateData)
    })
    .catch((err)=>{
      console.log (err)
    })
  }


  
  loadData(){

    return collectionData(collection(this.fire, 'categories'), { idField: 'id'});
  }


 deleteData (id : string ){
  const docInstance =  doc(this.fire , 'categories'  , id )
   

  deleteDoc (docInstance)
  .then(() =>{
    this.toastr.warning ('Data deleted Successfully ..! ');
    console.log ('Data Deleted')
  })
 }
}
