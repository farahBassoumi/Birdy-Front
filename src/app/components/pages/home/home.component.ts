import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('swipeAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{currentIndex}}%)' }),
        animate('0.3s ease-in-out'),
      ], { params: { currentIndex: 0 } }),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(private blogService: BlogService) {}
  //get  blogs
  filteredBlogs: blog[] = [];
  ForYouBlogs: blog[] = [];
token:any;
  trendingBlogs: blog[] = [];
  displayedTrendingBlogs:blog[]=[];
  blogs: blog[] = [
    {
      id: '1',
      title: 'blog1',
      content:
        'hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgyjh jhbgcsfjs hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy',
        category:'',
        views:404,
      likes:100,
      dislikes:2,
      userId:'1'
    },
    {
      id: '2',
      title: 'blog2',
      content:
        ';ljhbfxgshvd hbfxgshvd Psychology, the hbfxgshvd hbfxgshvd Psychology, the multifaceted study of the human mind and behavior, delves into the intricate labyrinth of thoughts, emotions, and actions that shape the essence of our existence. As a disciplinelace to those grappling with mental health challenges, to cognitive psychology, unraveling the intricacies of memory and problem-solving. Moreover, the discipline extends its reach beyond the human realm, exploring the behavior of animals and the interplay between the mind and artificial intelligence. In essence, psychology serves as a mirror reflecting the rich tapestry of human experience, providing insights that only sheds light on individual mental processes but also probes the collective consciousness, examining societal norms, cultural influences, and the ways in which communities shape and are shaped by the individuals within them. Psychology bridges the gap between the tangible and the intangible, investigating the impact of biological factors, environmental conditions, and social interactions on mental well-being. It encompasses a vast spectrum of subfields, from clinical psychology, offering solace to those grappling with mental health challenges, to cognitive psychology, unraveling the intricacies of memory and problem-solving. Moreover, the discipline extends its reach beyond the human realm, exploring the behavior of animals and the interplay between the mind and artificial intelligence. In essence, psychology serves as a mirror reflecting the rich tapestry of human experience, providing insights that not only enhance our understanding of ourselves but also foster empathy, compassion, and a deeper connection to the world around us. ndbcfgds hdbcsh  jfchgns v shcbfgyjh jhbgcsfjs hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfggy',
        category:'',
        views:44,
      likes:100,
      dislikes:2,
      userId:'1'
    },
    {
      id: '3',
      title: 'blog3',
      content:
        'hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgyjh jhbgcsfjs hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy',
        category:'',
        views:74,
      likes:170,
      dislikes:2,
      userId:'1'
    },
    {
      id: '4',
      title: 'blog4',
      content:
        'hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgyjh jhbgcsfjs hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy hbfxgshvd  ndbcfgds hdbcsh  jfchgns v shcbfgy',
        category:'',
        views:40,
      likes:10,
      dislikes:0,
      userId:'1'
    },
  ];

  currentIndex = 0;

 
  updateDisplayedObjects() {
    this.displayedTrendingBlogs = this.trendingBlogs.slice(this.currentIndex, this.currentIndex + 4);
  }

  swipeLeft() {
    this.currentIndex = (this.currentIndex + 1) % (this.trendingBlogs.length );
    this.updateDisplayedObjects();
  }

  swipeRight() {
    this.currentIndex = (this.currentIndex + 9) % (this.trendingBlogs.length );
    this.updateDisplayedObjects();
  }


  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((res) => {
      console.log('inside the getblogsapi'+res);
      this.blogs = res;
      this.filteredBlogs = res;
      this.ForYouBlogs = this.blogs;
    });
    this.blogService.getTrendingBlogs().subscribe((res) => {
      this.trendingBlogs = res;
      this.displayedTrendingBlogs = this.trendingBlogs.slice(this.currentIndex, this.currentIndex + 4);
    });
    //if the user is logged in
    this.blogService.getForYouBlogs('exgfhbgj').subscribe((res) => {
      this.ForYouBlogs = res;
    });
   // localStorage.clear();

   // localStorage.setItem('token', 'token');

     this.token = localStorage.getItem('token');
if(this.token==null)
console.log('token is null');
else
console.log('token not null'+this.token);




  }
}
