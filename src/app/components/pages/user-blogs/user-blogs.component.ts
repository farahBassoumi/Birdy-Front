import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { blog } from 'src/app/models/blog.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.css']
})
export class UserBlogsComponent implements OnInit {
public blogs: blog[] = [];
  userId:any;
  username:any;
  userIsToSend:testModel ={
    name:''
  };

user:any;
  constructor(private route:ActivatedRoute, private blogService:BlogService) {
  
    
  }
  ngOnInit() {
this.userId=localStorage.getItem('userId');
//console.log('"'+this.userId.toString()+'"');
this.userIsToSend.name=this.userId.toString();
console.log(this.userIsToSend);
this.username=localStorage.getItem('username');
   /* this.route.queryParams.subscribe(params => {
      const userString = params['user'];
      if (userString) {
        this.user = JSON.parse(userString);
        console.log('User:', this.user);
      }
    });*/
    this.blogService.getBlogsByUser(this.userIsToSend).subscribe((res)=>{
      console.log(res);
      this.blogs=res;
    },
    (err)=>{
      console.log("erreur"+err);
    });

  }


  getBlogsByUser(){

   


  }

}
