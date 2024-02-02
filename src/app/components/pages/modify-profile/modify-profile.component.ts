import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css'],
})
export class ModifyProfileComponent implements OnInit {
  public user: any;
  userid: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserFromProfileComponent();
    if (this.user == null) {
      this.userid = localStorage.getItem('userId');
      this.getUserFromServer();
    }
  }
  getUserFromProfileComponent() {
    this.route.queryParams.subscribe((params) => {
      const userString = params['user'];
      if (userString) {
        this.user = JSON.parse(userString);
        console.log('User:', this.user);
      }
    });
  }
  getUserFromServer() {
    console.log('get user from server');
    this.userService.getUser(this.userid).subscribe(
      (res) => {
        this.user = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateUser() {
    console.log(this.user.id);
    this.userService.updateUser(this.user, this.user.id).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/profile']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
