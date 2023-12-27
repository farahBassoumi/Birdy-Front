import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addCommentModel } from 'src/app/models/addComment.model';
import { blog } from 'src/app/models/blog.model';
import { comment } from 'src/app/models/comment.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  blog: blog;
  thumbsup: boolean = false;
  thumbsdown: boolean = false;
  thumbsUpRating: number = 0;
  thumbsDownRating: number = 0;
  addCommentRequest: addCommentModel = {
    content: '',
    blogId: '',
    userId: '',
  };

  comments: comment[] = [];

  blogId: any;
  blogidRequest: testModel = {
    name: '',
  };
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private commentService: CommentService
  ) {
    this.blog = {
      id: '',
      title: '',
      content: '',
      category: '',
      likes: 0,
      dislikes: 0,
      userId: '',
      views: 0,
    };

    const blogid = localStorage.getItem('blogId');

    this.addCommentRequest.blogId = blogid!;
    this.addCommentRequest.userId = localStorage.getItem('userId')!;
  }
  ngOnInit() {
    this.blogidRequest.name = localStorage.getItem('blogId')!;
    this.blogId = localStorage.getItem('blogId');

    console.log(localStorage.getItem('blogId'));

    this.blogService.getBlogsById(this.blogidRequest).subscribe(
      (res) => {
        console.log(res);
        this.blog = res;
      },
      (err) => {}
    );
    //configure blog

 this.getComment();
  }



  getComment(){

    this.commentService.getCommentsByBlogId(this.blogidRequest).subscribe(
      (res) => {
        console.log('ress');
        console.log(res);
        this.comments = res;
        this.comments.forEach((item) => {
          // Do something with each item
          console.log(item.author.userName);
        });
      },
      (err) => {}
    );
  }
  thumbsUp() {
    if (!this.thumbsup) {
      console.log('thumbs up');
      this.blog.likes++;
      this.thumbsUpRating++;
      this.thumbsup = true;
      if (this.thumbsdown) {
        this.thumbsdown = false;
        this.thumbsDownRating--;
        this.blog.dislikes--;
      }
    } else {
      this.blog.likes--;
      this.thumbsUpRating--;
      this.thumbsup = false;
    }
    this.updateBlog();
  }

  thumbsDown() {
    if (!this.thumbsdown) {
      this.blog.dislikes++;
      this.thumbsDownRating++;
      this.thumbsdown = true;

      if (this.thumbsup) {
        this.thumbsup = false;
        this.thumbsUpRating--;
        this.blog.likes--;
      }
    } else {
      this.blog.dislikes--;
      this.thumbsDownRating--;
      this.thumbsdown = false;
    }
    this.updateBlog();
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
    this.commentService.CreateComment(this.addCommentRequest).subscribe(
      (res) => {
        console.log(res);
        this.getComment();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  likeComment(id:string){

  }


  dislikeComment(id:string){
    
  }
}
