import { Component, OnInit  } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Firestore , collection ,addDoc, collectionData  } from '@angular/fire/firestore';

import {Observable} from 'rxjs'



@Component({
  selector: 'app-ahmed',
  templateUrl: './ahmed.component.html',
  styleUrls: ['./ahmed.component.css']
})
export class AhmedComponent implements OnInit{


  categoriesArray : Observable<any>

  formCategory :  string 

  formStatus : string = 'Add'

  categoryId : string ;


  constructor(private categoryService : CategoriesService,private fire : Firestore){}

  ngOnInit(): void {
    
    this.categoriesArray = this.categoryService.loadData()


    this.categoriesArray.subscribe(val => {
      console.log (val)
    })
  }

  onSubmit(formData){
    let categoryData : Category = {
      category : formData.value.category
    }

    if (this.formStatus == 'Add'){
      
      this.categoryService.saveData(categoryData)

      formData.reset ()
 
    }
    else if (this.formStatus == 'Edit'){
       this.categoryService.updateData( this.categoryId, categoryData )

       formData.reset ()
       this.formStatus = 'Add'


    }
 } 


  onEdit(category , id) {
    this.formCategory =category

    this.formStatus = 'Edit'

    this.categoryId = id

  }

  onDelete (id){
    this.categoryService.deleteData (id)
  }


}
