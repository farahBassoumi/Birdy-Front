import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { testModel } from 'src/app/models/testModel.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  getuserRequest: testModel = {
    name: '',
  };
  idUser: any;
  modify: any;
  jsonData: any = {
    blogs: '1',
    likes: 42,
    followers: 2,
    views: 0,
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public user: User = {
    Id: '1',
    bio: 'helooo',
    email: '@mil',
    activated: true,
    joinDate: '12/28/2003',
    role: 'admin',
    username: 'farah123',
    blogsIDs: [],
  };

  ngOnInit() {
    this.idUser = localStorage.getItem('userId');
    this.modify = localStorage.getItem('modify');
    this.getuserRequest.name = this.idUser;
    // Access the data from the route state
    // Now you can use userId and userName in your component logic
    console.log('UserId:', this.idUser);
    console.log('modify:', this.modify);

    this.userService.getUser(this.getuserRequest).subscribe(
      (res) => {
        console.log("res"+res);
        console.log(res.id);
        console.log(res.userName);

        this.user.email = res.email;
        this.user.username = res.userName;

        //get user
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getblogsInfo(idUser: string) {
    this.userService.getBlogsInfo(this.idUser).subscribe((data) => {
      this.jsonData = data;
    });
  }
  navigateSeeBlogs() {
    this.router.navigate(['/see-blogs']);
  }
  navigateModify() {
    this.router.navigate(['/modify']);
  }
}
