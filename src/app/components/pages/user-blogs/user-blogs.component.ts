import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { blog } from 'src/app/models/blog.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.css'],
})
export class UserBlogsComponent implements OnInit {
  public blogs: blog[] = [];
  userId: any;
  username: any;
  userIsToSend: testModel = {
    name: '',
  };

  user: any;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router:Router
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.userIsToSend.name = this.userId.toString();
    console.log(this.userIsToSend);
    this.username = localStorage.getItem('username');

    this.blogService.getBlogsByUser(this.userIsToSend).subscribe(
      (res) => {
        console.log(res.Message);

        this.blogs = res;
      },
      (err) => {
        console.log('erreur' + err.message);
      }
    );
  }

  navigateBlogAuthor() {
    localStorage.setItem('modify', 'false');
    this.router.navigate(['profile']);
  }
}
