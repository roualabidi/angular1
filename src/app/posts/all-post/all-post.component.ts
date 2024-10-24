import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray : Observable <any>
  post : any ;

  constructor (private postS : PostsService){}


  ngOnInit(): void {
      this.postArray  =  this.postS.loadData()
      
      this.postArray.subscribe (val =>{
        console.log (val)
      })
  }

  onDelete (postIMG , id){
    this.postS.deleteImg(postIMG , id)
  }

  onFeatured (id , slm){
    this.postS.MarkFeatured(id , slm)
  }

}
