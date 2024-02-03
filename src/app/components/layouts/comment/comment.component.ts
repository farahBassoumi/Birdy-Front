import { Component, Input, OnInit } from '@angular/core';
import { comment } from 'src/app/models/comment.model';
import { likingRequest } from 'src/app/models/likingRequest.model';
import { testModel } from 'src/app/models/testModel.model';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

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
  commentatorImage:string='';
getcommentRequest:testModel={
  name:''
}
  constructor(private commentService:CommentService, private userService:UserService) {
  this.comment={
      id:'',
      blogId:'',
      userId:'',
      likes:0,
      dislikes:0,
      content:'',
      creationDate:'',
      author: {
          id :'',
          userName :''
        }
  
    }
  }
  @Input() comment: comment ;


ngOnInit(){
  this.getCommentator();
  this.likingRequest.EntityId=this.comment.id;
  this.likingRequest.UserId=localStorage.getItem('userId')!;
  this.getCommentLikes();
  console.log(this.likingRequest.EntityId);
  console.log(this.comment);
this.getcommentRequest.name=this.comment.id;
//this.getCommentLikes();
}


getCommentator(){
this.userService.getUser(this.comment.author.id).subscribe(
  (res) => {
    this.commentatorImage=res.image;
    
  },
  (err) => {}
);
}

likeComment(){
  this.commentService.likeComment(this.likingRequest).subscribe(
    (res) => {
      console.log(res);
      this.getCommentLikes();
      this.updateComment();

      console.log(this.comment);
    },
    (err) => {
      console.log(err);
    }
  );
}


getdate():string{
  let date: string = this.comment.creationDate.substring(0, 9);
  let time: string = this.comment.creationDate.substring(11, 16);
return(date+"    "+time);

}



  dislikeComment(){
    this.commentService.dislikeComment(this.likingRequest).subscribe(
      (res) => {
        console.log(res);
        this.getCommentLikes();
        this.updateComment();
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





thumbsUp() {
  if (!this.thumbsup) {
    console.log('thumbs up');
    this.likeComment();

    this.thumbsup = true;
    if (this.thumbsdown) {
      this.thumbsdown = false;
      this.dislikeComment();
    }
  } else {
    this.likeComment();

    this.thumbsup = false;
  }
  //this.likeBlog();
}

thumbsDown() {
  if (!this.thumbsdown) {
    this.dislikeComment();

    this.thumbsdown = true;

    if (this.thumbsup) {
      this.thumbsup = false;
   this.likeComment();
    }
  } else {

    this.thumbsdown = false;
   this.dislikeComment();

  }

}




updateComment(){//send comment id and userid
  console.log(this.getcommentRequest.name);
  this.commentService.getCommentById(this.getcommentRequest).subscribe(
    (res) => {
      console.log(res);
      this.comment = res;
    }
  );
}
}
