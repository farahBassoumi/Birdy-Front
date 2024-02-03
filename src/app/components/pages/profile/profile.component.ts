import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { testModel } from 'src/app/models/testModel.model';
import { UploadPhotoModel } from 'src/app/models/uploadPhoto.model';
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
  uploadImageRequest: UploadPhotoModel = {
    id: 'c2243800-ea2b-43d0-03fd-08dbfcf35573',
    image: new FormData(),
  };
  fd: any;
  imageUrl: any;
  selectedFile?: File;
  idUser: any;
  modify: any;
  modifyPhoto: boolean = false;
  counts: any;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
    private datePipe: DatePipe 

  ) {}

  public user: User = {
    image:'',
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
    console.log(this.idUser);
    this.modify = localStorage.getItem('modify');
    this.getuserRequest.name = this.idUser;
    // Access the data from the route state
    // Now you can use userId and userName in your component logic
    this.getUser();
    this.getUserCounts();
  }

  getUser() {
    console.log("inside the getuser")

    this.userService.getUser(this.idUser).subscribe(
      (res) => {
       
        this.user = res;
        this.user.email = res.email;
        this.user.username = res.userName;
        this.formatCreationDate();
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
        this.counts = res;
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
    console.log(this.user);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(this.user),
      },
    };

    console.log(navigationExtras);

    this.router.navigate(['/modify'], navigationExtras);
  }

  openDialogFollowers(): void {
    if (this.counts.followers != 0) {
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
    if (this.counts.followings != 0) {
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

  modifyProfilePhoto() {
    this.modifyPhoto = true;
  }

  fileChoosen(event: any) {
    if (event.target.value) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitPhoto(): void {
    this.fd = new FormData();
    if (this.selectedFile) {

      this.fd.append('Image', this.selectedFile, this.selectedFile.name); // Match the property name on the server-side (ImageModel.Image)
      this.fd.append('BlogId', this.idUser); // Replace with the actual BlogId

      console.log(this.uploadImageRequest);
      this.userService.uploadImage(this.fd).subscribe(
        (res) => {
          console.log(res);
          this.user=res;
          this.modifyPhoto=false;
         // window.location.reload();
         function reload(){
          window.location.reload();
        }
         setTimeout(reload, 500);

        },

        (err) => {
          console.log( err);
        }
      );
    }
  }


  formatCreationDate() {
    console.log('format');
    if (Date.parse(this.user.joinDate)) {
      const timestamp = new Date(this.user.joinDate);
      console.log(timestamp);
      const formattedTimestamp = this.datePipe.transform(
        timestamp,
        'MMM, d, y '
      );
      this.user.joinDate = formattedTimestamp;
      console.log(formattedTimestamp);
    }
  }
}
