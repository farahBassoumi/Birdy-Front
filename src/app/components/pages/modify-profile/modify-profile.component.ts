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
  public user: any ;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      const userString = params['user'];
      if (userString) {
        this.user = JSON.parse(userString);
        console.log('User:', this.user);
      }
    });
  }

  updateUser() {
    console.log(this.user.id)
    this.userService.updateUser(this.user, this.user.id).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/profile']);

    },
    (err)=>{
      console.log(err)
    });
  }
}
