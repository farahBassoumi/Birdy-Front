import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addCommentModel } from 'src/app/models/addComment.model';
import { blog } from 'src/app/models/blog.model';
import { comment } from 'src/app/models/comment.model';
import { likingRequest } from 'src/app/models/likingRequest.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  blog: blog;
  blogAuthor: string="";
  thumbsup: boolean = false;
  thumbsdown: boolean = false;
  likingRequest:likingRequest={
    EntityId:'',
    UserId:''
  }
  addCommentRequest: addCommentModel = {
    content: '',
    blogId: '',
    userId: '',
  };
  getUserByIdRequest:testModel={
  name:''
}
  comments: comment[] = [];

  blogId: any;
  blogidRequest: testModel = {
    name: '',
  };
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private commentService: CommentService,
    private userService:UserService
  ) {
    this.blog = {
      id: '',
      title: '',
      content: '',
      categorieId: '',
      likes: 0,
      dislikes: 0,
      userId: '',
      views: 0,
      image:''
    };

    const blogid = localStorage.getItem('blogId');

    this.addCommentRequest.blogId = blogid!;
    this.addCommentRequest.userId = localStorage.getItem('userId')!;
  }
  ngOnInit() {

    this.blogidRequest.name = localStorage.getItem('blogId')!;
    this.blogId = localStorage.getItem('blogId');
    this.getBlogById();
this.likingRequest.UserId=localStorage.getItem('userId')!;
this.likingRequest.EntityId=this.blogId;

   
this.getBlogLikes();
 this.getComments();


  }


getBlogById(){

  this.blogService.getBlogsById(this.blogidRequest).subscribe(
    (res) => {
      this.blog = res;
      this.getUserByIdRequest.name=res.userId;
      this.getUserById();
    },
    (err) => {}
  );


}


getBlogLikes(){
this.blogService.getLikes(this.likingRequest).subscribe(
  (res) => {
    this.thumbsup = res.likes;
    this.thumbsdown = res.dislikes;
  }
);}


  getUserById(){
    //console.log(this.getUserByIdRequest.name);
    this.userService.getUser(this.getUserByIdRequest).subscribe(
      (res) => {
       
   this.blogAuthor=res.userName;
      },
      (err) => {}
    );
  }



  getComments(){

    this.commentService.getCommentsByBlogId(this.blogidRequest).subscribe(
      (res) => {
       
        this.comments = res;
        this.comments.forEach((item) => {
          
          // Do something with each item
          console.log(item.id);
        });
      },
      (err) => {}
    );
  }
  thumbsUp() {
    if (!this.thumbsup) {
      console.log('thumbs up');
      this.likeBlog();

      this.thumbsup = true;
      if (this.thumbsdown) {
        this.thumbsdown = false;
      this.dislikeBlog();
      }
    } else {
      this.likeBlog();

      this.thumbsup = false;
    }
    //this.likeBlog();
  }

  thumbsDown() {
    if (!this.thumbsdown) {
      this.dislikeBlog();
 



      this.thumbsdown = true;

      if (this.thumbsup) {
        this.thumbsup = false;
     this.likeBlog();
      }
    } else {
  
      this.thumbsdown = false;
      this.dislikeBlog();
    }
  
  }


dislikeBlog(){
  this.blogService.dislikeBlog(this.likingRequest).subscribe(
    (res) => {
      console.log(res);
      this.getBlogById();
    },
    (err) => {
      console.log(err);
    }
  );
}


likeBlog(){


  this.blogService.likeBlog(this.likingRequest).subscribe(
    (res) => {
      console.log(res);
      this.getBlogById();

    },
    (err) => {
      console.log(err);
    }
  );
}









  updateBlog() {
    this.blogService.updateBlog(this.blog).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigateBlogAuthor() {
    localStorage.setItem('modify', 'false');
    this.router.navigate(['profile']);
  }

  addComment() {
    if(this.addCommentRequest.content!=""){

      this.commentService.CreateComment(this.addCommentRequest).subscribe(
        (res) => {
          console.log(res);
          this.addCommentRequest.content="";
          this.getComments();
          
        },
        (err) => {
          console.log(err);
        }
      );


    }
  
  }



}
