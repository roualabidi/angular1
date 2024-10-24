import { Component, OnInit ,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  permalink :string ; 
  imgSrc : any  = 'src/assets/jk-placeholder-image.jpg';

  selectedImg :any

  categories : Observable<any>

  postForm : FormGroup
  post :any
  url : string ; 
  formStatus = 'Add New'

  valId :string ; 

  constructor (private postS : PostsService ,
    private category : CategoriesService , 
    private fb : FormBuilder,
    private route : ActivatedRoute
    ){

      this.route.queryParams.subscribe (val =>{

        this.valId = val['id']
        this.postS.loadData().subscribe ( all=>{

          for (let i = 0 ; i< all.length ; i++ ){
            if (all[i]['id'] === val['id']){
              this.post = all[i]

              console.log (all[i])
              this.postForm = this.fb.group ({
                title : [this.post.title, [Validators.required , Validators.minLength(10)]] , 
                perma : [this.post.permalink , Validators.required],
                excerpt : [this.post.excerpt,[Validators.required , Validators.minLength(15)]],
                category : [`${this.post.category.categoryId}-${this.post.category.category}`],
                postimg : ['', Validators.required],
                content : [this.post.content, Validators.required],
              })
              this.imgSrc =this.post.postImgPath
              this.formStatus = 'Edit'


            }
          }
        })

        
      })

      
    this.postForm = this.fb.group ({
      title : ['', [Validators.required , Validators.minLength(10)]] , 
      perma : ['' , Validators.required],
      excerpt : ['',[Validators.required , Validators.minLength(15)]],
      category : [''],
      postimg : ['' , Validators.required],
      content : ['' , Validators.required],

    })
  }

  ngOnInit () :void {
    this.categories = this.category.loadData()
  }

  get title(){
    return this.postForm.get('title')
  }

  
  get perma(){
    return this.postForm.get('perma')
  }

  
  get excerpt(){
    return this.postForm.get('excerpt')
  }

  
  get categ(){
    return this.postForm.get('category')
  }
  
  get content(){
    return this.postForm.get('content')
  }

  
  get postimg(){
    return this.postForm.get('postimg')
  }

  onTitleChanged ($event){
    const title = $event.target.value ; 
    this.permalink = title.replace (/\s/g , '-')

  }

  showPreview ($event) {
    const reader = new FileReader ()
    reader.onload = (e) =>{
      this.imgSrc = e.target.result
    }

    reader.readAsDataURL($event.target.files[0])
    this.selectedImg = $event.target.files[0]
  }


  onSubmit(){
    console.log(this.postForm.value)

    let splitted = this.postForm.value.category.split('-')

    const postData : Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.perma.concat(this.postForm.value.content ),  
      category : {
        categoryId : splitted[0],
        category : splitted[1]
      },
      postImgPath : '',
      excerpt : this.postForm.value.excerpt , 
      content : this.postForm.value.content , 
      isFeatured : false , 
      views : 0 , 
      status : 'new' , 
      createAt : new Date ()

    } 
    this.postS.uploadImage (this.selectedImg , postData ,this.formStatus , this.valId )
    this.postForm.reset();


  }

}
