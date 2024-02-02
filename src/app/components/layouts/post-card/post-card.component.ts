import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from 'src/app/models/blog.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent {
  userId: string = '';

  getcategoryByIdRequest: testModel = {
    name: '',
  };
  authorName: string = '';
  blogIdTestModel: testModel = {
    name: '',
  };
  constructor(
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private datePipe: DatePipe
  ) {
    // Default value just to satisfy TypeScript
    this.blog = {
      creationDate: '',
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
    this.userId = this.blog.userId;
    this.getblogAuthor();
    this.getcategoryByIdRequest.name = this.blog.categorieId;
    this.blogIdTestModel.name = this.blog.id;
    this.formatCreationDate();
    // this.getCategoryById();
  }
  redirectToSinglePost() {
    localStorage.setItem('blogId', this.blog.id);
    this.addView();
    this.router.navigate(['/post']);
  }

  addView() {
    this.blogService.addView(this.blogIdTestModel).subscribe(
      (next) => {
        console.log(next);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatCreationDate() {
    const timestamp = new Date(this.blog.creationDate);
    const formattedTimestamp = this.datePipe.transform(timestamp, 'yyyy-MM-dd');
    this.blog.creationDate = formattedTimestamp;
    console.log(formattedTimestamp);
  }

  getblogAuthor() {
    this.userService.getUser(this.userId).subscribe(
      (next) => {
        this.authorName = next.userName;
      },
      (err) => {
        console.log(err);
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
