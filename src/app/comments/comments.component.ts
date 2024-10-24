import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import {Observable} from 'rxjs'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentsArray : Observable<any>

  constructor (private com :PostsService ){}

  ngOnInit(): void {
      this.commentsArray = this.com.loadComments()
  }

  onDelete(id){
    this.com.deletecomment(id)
  }

}
