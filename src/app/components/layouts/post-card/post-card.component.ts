import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  constructor(private router:Router) {
    // Default value just to satisfy TypeScript
    this.blog = { id: '', title: '', content: '',   category:'',
    likes:0,dislikes:0,userId:'',views:0 ,image:''};
  }
@Input() blog :blog;

redirectToSinglePost(){
  localStorage.setItem('blogId',this.blog.id);
  console.log("logid"+this.blog.id);
    this.router.navigate(['/post']);

}


shortenTitle(title:string):string{
const maxlength=40;
return title.length>maxlength ? title.substring(0,maxlength):title;

}


}
