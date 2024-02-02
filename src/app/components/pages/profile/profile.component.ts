import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
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
    Id: '',
    bio: '',
    email: '',
    activated: true,
    joinDate: '',
    role: '',
    username: '',
    blogsIDs: [],
  };

  ngOnInit() {
    localStorage.setItem('modify', 'true');
    this.idUser = localStorage.getItem('userId');
    console.log(this.idUser)
    this.modify = localStorage.getItem('modify');
    this.getuserRequest.name = this.idUser;
    // Access the data from the route state
    // Now you can use userId and userName in your component logic
    this.getUser();
    this.getUserCounts();
  }

  getUser() {
    this.userService.getUser(this.idUser).subscribe(
      (res) => {
        console.log( res);
        console.log(res.id);
        console.log(res.userName);
this.user=res;
        this.user.email = res.email;
        this.user.username = res.userName;
//find a solution !
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
    console.log(this.user)
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user)
      }
    };

console.log(navigationExtras)


    this.router.navigate(['/modify'],navigationExtras);
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
