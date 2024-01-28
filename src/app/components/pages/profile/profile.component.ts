import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { testModel } from 'src/app/models/testModel.model';
import { User } from 'src/app/models/user.model';
import { DialogService } from 'src/app/services/dialog.service';
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
  counts: any ;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
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
    localStorage.setItem('modify', 'true');
    this.idUser = localStorage.getItem('userId');
    this.modify = localStorage.getItem('modify');
    this.getuserRequest.name = this.idUser;
    // Access the data from the route state
    // Now you can use userId and userName in your component logic
    this.getUser();
    this.getUserCounts();
  }

  getUser() {
    this.userService.getUser(this.getuserRequest).subscribe(
      (res) => {
        console.log( res);
        console.log(res.id);
        console.log(res.userName);

        this.user.email = res.email;
        this.user.username = res.userName;

      },
      (err) => {
        console.log(err);
      }
    );
  }
  /*
  getblogsInfo(idUser: string) {
    this.userService.getBlogsInfo(this.idUser).subscribe((data) => {
      this.jsonData = data;
    });
  }
*/
  getUserCounts() {
    this.userService.getUserCounts(this.getuserRequest).subscribe(
      (res: any) => {
        console.log(res);
        this.counts=res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  navigateSeeBlogs() {
    this.router.navigate(['/see-blogs']);
  }
  navigateModify() {
    this.router.navigate(['/modify']);
  }

  openDialogFollowers(): void {
    if(this.counts.followers!=0){
      const dialogConfig = {
        data: {
          // Your variable to be passed
          template: 'followers',
          userId: this.idUser,
        },
      };
  
      this.dialogService.openDialogFollowers(dialogConfig);

    }
    
  }

  openDialogFollowings(): void {
    if(this.counts.followings!=0){

    const dialogConfig = {
      data: {
        // Your variable to be passed
        template: 'followings',
        userId: this.idUser,
      },
    };

    this.dialogService.openDialogFollowers(dialogConfig);
  }
}
}
