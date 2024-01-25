import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { likingRequest } from 'src/app/models/likingRequest.model';
import { testModel } from 'src/app/models/testModel.model';
import { DialogService } from 'src/app/services/dialog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-followers',
  templateUrl: './dialog-followers.component.html',
  styleUrls: ['./dialog-followers.component.css'],
})
export class DialogFollowersComponent implements OnInit {
  getFollowersRequest: testModel = {
    name: '',
  };
  followers: any;
  followings: any;
  unfollowRequest: likingRequest = {
    EntityId: '',
    UserId: '',
  };
  showFollowers: boolean = false;
  constructor(
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private location: Location
  ) {

   

  }
  ngOnInit() {
    this.getFollowersRequest.name = this.data.userId;
    
    if (this.data.template == 'followings') this.getFollowings();
    else if (this.data.template == 'followers') this.getFollowers();
    this.unfollowRequest.UserId = this.data.userId;
  }

  getFollowers() {
    this.showFollowers = true;
    this.dialogService.getFollowers(this.getFollowersRequest).subscribe(
      (res) => {
        console.log(res);
        this.followers = res;
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
    this.showFollowers = false;
    this.dialogService.getFollowings(this.getFollowersRequest).subscribe(
      (res) => {
        console.log(res);
        this.followings = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Unfollow(followerId: string) {
    this.unfollowRequest.EntityId = followerId;
    this.dialogService.Unfollow(this.unfollowRequest).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Remove(followerId: string) {
    this.unfollowRequest.EntityId =  this.unfollowRequest.UserId;
    this.unfollowRequest.UserId = followerId;
    this.dialogService.Unfollow(this.unfollowRequest).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
   // this.getFollowings();
   this.location.replaceState(this.location.path());

    window.location.reload();
  }

  
}
