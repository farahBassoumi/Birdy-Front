import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from 'src/app/models/blog.model';
import { testModel } from 'src/app/models/testModel.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent  {
  
  userIdRequest: testModel = {
    name: '',
  };
  getcategoryByIdRequest:testModel={
    name:''
  }
  authorName: string = '';
 

  constructor(private router: Router, private userService: UserService, private categoryService:CategoryService) {
    // Default value just to satisfy TypeScript
    this.blog = {
      id: '',
      title: '',
      content: '',
      categorieId: '',
      likes: 0,
      dislikes: 0,
      userId: '',
      views: 0,
      image: '',
    };
  }
  @Input() blog: blog;



  ngOnInit() {
    this.userIdRequest.name = this.blog.userId;
    this.getblogAuthor();
    console.log(this.blog);
    this.getcategoryByIdRequest.name=this.blog.categorieId;
   // this.getCategoryById();

  }
    redirectToSinglePost() {
    localStorage.setItem('blogId', this.blog.id);
    this.router.navigate(['/post']);
  }

  getblogAuthor() {
    console.log(this.blog.id);
    console.log(this.userIdRequest.name);
    this.userService.getUser(this.userIdRequest).subscribe(
      (next) => {
        console.log(next);
        this.authorName = next.userName;
      },
      (err) => {
        console.log(err);
        return '';
      }
    );
  }

  shortenTitle(title: string): string {
    const maxlength = 40;
    return title.length > maxlength ? title.substring(0, maxlength) : title;
  }

/*
  getCategoryById():string{
this.categoryService.getCategoryById(this.getcategoryByIdRequest).subscribe(
  (next) => {
    console.log(next);
    return(next.name);
      },
  (err) => {
    console.log(err);
    return ("");
  }
);
return "";
  }*/
}
