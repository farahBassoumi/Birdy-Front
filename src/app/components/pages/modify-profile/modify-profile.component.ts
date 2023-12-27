import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

  public user:User={
    Id:'1',
    bio:'helooo',
    email:'@l',
    activated:true,
    joinDate:'12/28/2003',
    role:'admin',
    username:'farah123' ,
    blogsIDs:[],
    }
    id:any;

constructor(private route: ActivatedRoute,private userService:UserService,private router:Router) {
  
}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const userString = params['user'];
    if (userString) {
      this.user = JSON.parse(userString);
      console.log('User:', this.user);
    }
  });
}






updateUser(){

this.userService.updateUser(this.user).subscribe((res) => {
  console.log(res);
});
this.router.navigate(['/profile']);

}


}

