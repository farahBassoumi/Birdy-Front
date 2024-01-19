import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { testModel } from 'src/app/models/testModel.model';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog-followers',
  templateUrl: './dialog-followers.component.html',
  styleUrls: ['./dialog-followers.component.css'],
})
export class DialogFollowersComponent implements OnInit {
  getFollowersRequest: testModel = {
    name: '',
  };
  followers:any;
  followings:any;

showFollowers:boolean=false;
  constructor(
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.getFollowersRequest.name = this.data.userId;
    if(this.data.template=="followings")
this.getFollowings();
else if(this.data.template=="followers")
this.getFollowers();
  }

  getFollowers() {
    this.showFollowers=true;
    this.dialogService.getFollowers(this.getFollowersRequest).subscribe(
      (res) => {
        console.log(res);
        this.followers=res;
        res.forEach((element: any) => {
          console.log(element.followerUsername);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }


  getFollowings() {
    this.showFollowers=false;
    this.dialogService.getFollowings(this.getFollowersRequest).subscribe(
      (res) => {
        console.log(res);
        this.followings=res;
        res.forEach((element: any) => {
          console.log(element.followerId);
        });

      },
      (err) => {
        console.log(err);
      }
    );
  }
}
