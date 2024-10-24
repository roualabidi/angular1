import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData ,collection, doc , setDoc , deleteDoc, updateDoc  ,query , orderBy} from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable , deleteObject} from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private outer : Router,
     private storage : Storage,
     private toastr : ToastrService , 
     private afs : Firestore) { }

  uploadImage (selectedImage , postData , formStatus , id){
    const filePath= `postIMG/${Date.now()}`

    const storageref = ref(this.storage, filePath)
    uploadBytesResumable (storageref , selectedImage).then (() =>{
      console.log ('image added succesfully ')
      getDownloadURL(storageref).then ((url =>{

        postData.postImgPath = url

        if (formStatus == 'Edit'){
          this.updateData(id, postData)
        }else{
          this.savaData (postData)       
        }
      }))
  

    } )
  }

  savaData (postData){
    addDoc (collection (this.afs , 'posts') , postData).then (() =>{
      this.toastr.info ('Data Insert Successfully ..! ');
      this.outer.navigate(['/posts'])
    })
  }


  loadData(){
    return collectionData(collection(this.afs, 'posts'), { idField: 'id'});
  }

  loadOneData (id ){
    return doc (this.afs , 'posts' , id)
  }

  updateData (id , postData){
    const docInstance =  doc(this.afs , 'posts' , id )
    const  updateData = postData

    setDoc(docInstance , updateData).then (() => {
      this.toastr.info ('Data updated Successfully ..! ');

      this.outer.navigate (['/posts'])
    })
    .catch((err)=>{
      console.log (err)
    })
  }


  deleteImg (postImgPath ,id ){
    const storageref = ref(this.storage, postImgPath)
    deleteObject (storageref).then (() => {
      this.deleteData (id) 
    })
  }

  deleteData (id){
    const docInstance =  doc(this.afs , 'posts'  , id )
   

    deleteDoc (docInstance)
    .then(() =>{
      this.toastr.warning ('Data deleted Successfully ..! ');
      console.log ('Data Deleted')
    })
  }


  MarkFeatured (id , markfeatuerd){
    const docInstance =  doc(this.afs , 'posts'  , id )

    updateDoc(docInstance, {
      isFeatured : markfeatuerd
    });
    this.toastr.info ('Faetured Status updated ..! ');
  }


  loadComments (){
    return collectionData(query(collection(this.afs, 'comments'), orderBy("createAt", "desc")), { idField: 'id'});
  }

  deletecomment(id){
    deleteDoc(doc(this.afs , 'comments', id )).then(() =>{
      this.toastr.warning ('Data deleted Successfully ..! ');
    })
  }

}
 