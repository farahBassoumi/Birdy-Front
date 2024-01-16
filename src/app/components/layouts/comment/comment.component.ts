import { Component, Input, OnInit } from '@angular/core';
import { comment } from 'src/app/models/comment.model';
import { likingRequest } from 'src/app/models/likingRequest.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  likingRequest:likingRequest={
    EntityId:'',
    UserId:''
  }
  thumbsup: boolean = false;
  thumbsdown: boolean = false;


  constructor(private commentService:CommentService) {
  this.comment={
      id:'',
      blogId:'',
      userId:'',
      likes:0,
      dislikes:0,
      content:'',
      date:'',
      author: {
        
          id :'',
          userName :''
        }
  
    }
  }
  @Input() comment: comment ;


ngOnInit(){
  this.likingRequest.EntityId=this.comment.id;
  this.likingRequest.UserId=localStorage.getItem('userId')!;
  this.getCommentLikes();
  console.log(this.likingRequest.EntityId);
  console.log(this.likingRequest.UserId);

//this.getCommentLikes();
}


likeComment(){
  this.commentService.likeComment(this.likingRequest).subscribe(
    (res) => {
      console.log(res);
      this.getCommentLikes();
    },
    (err) => {
      console.log(err);
    }
  );
}


  dislikeComment(){
    this.commentService.dislikeComment(this.likingRequest).subscribe(
      (res) => {
        console.log(res);
        this.getCommentLikes();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  

  getCommentLikes(){//send comment id and userid
    this.commentService.getCommentLikes(this.likingRequest).subscribe(
      (res) => {
        console.log(res);
        this.thumbsup = res.likes;
        this.thumbsdown = res.dislikes;
      }
    );
}

}
