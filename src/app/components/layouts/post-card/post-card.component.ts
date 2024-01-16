import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from 'src/app/models/blog.model';
import { testModel } from 'src/app/models/testModel.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  userIdRequest: testModel = {
    name: '',
  };
  authorName: string = '';
  ngOnInit() {
    this.userIdRequest.name = this.blog.userId;
    this.getblogAuthor();
  }

  constructor(private router: Router, private userService: UserService) {
    // Default value just to satisfy TypeScript
    this.blog = {
      id: '',
      title: '',
      content: '',
      category: '',
      likes: 0,
      dislikes: 0,
      userId: '',
      views: 0,
      image: '',
    };
  }
  @Input() blog: blog;

  redirectToSinglePost() {
    localStorage.setItem('blogId', this.blog.id);
    console.log('logid' + this.blog.id);
    this.router.navigate(['/post']);
  }

  getblogAuthor() {
    console.log(this.blog.id);
    console.log(this.userIdRequest.name);
    this.userService.getUser(this.userIdRequest).subscribe(
      (next) => {
        console.log(next);
        this.authorName = next.userName;
        console.log(this.authorName);
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
}
