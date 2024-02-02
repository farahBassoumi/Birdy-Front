import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('swipeAnimation', [
      transition(
        '* => *',
        [
          style({ transform: 'translateX({{currentIndex}}%)' }),
          animate('0.3s ease-in-out'),
        ],
        { params: { currentIndex: 0 } }
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private router: Router
  ) {}
  //get  blogs
  filteredBlogs: blog[] = [];
  ForYouBlogs: blog[] = [];
  token: any;
  trendingBlogs: blog[] = [];
  displayedTrendingBlogs: blog[] = [];
  blogs: blog[] = [];
  userId: string = '';
  currentIndex = 0;

  updateDisplayedObjects() {
    this.displayedTrendingBlogs = this.trendingBlogs.slice(
      this.currentIndex,
      this.currentIndex + 4
    );
  }

  swipeLeft() {
    this.currentIndex = (this.currentIndex + 1) % this.trendingBlogs.length;
    this.updateDisplayedObjects();
  }

  swipeRight() {
    this.currentIndex = (this.currentIndex + 9) % this.trendingBlogs.length;
    this.updateDisplayedObjects();
  }

  ngOnInit(): void {
    this.getBlogs();
    this.getTrendingBlogs();
    this.getForYouBogs();
    this.userId = localStorage.getItem('userId')!;

    this.token = localStorage.getItem('token');
    if (this.token == null) console.log('token is null');
    else this.getUserById();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe((res) => {
      console.log('inside the getblogsapi' + res);
      this.blogs = res;
      this.filteredBlogs = res;
      this.ForYouBlogs = this.blogs;
    });
  }

  getTrendingBlogs() {
    this.blogService.getTrendingBlogs().subscribe(
      (res) => {
        this.trendingBlogs = res;
        this.displayedTrendingBlogs = this.trendingBlogs.slice(
          this.currentIndex,
          this.currentIndex + 4
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getForYouBogs() {
    this.blogService.getForYouBlogs('exgfhbgj').subscribe(
      (res) => {
        this.ForYouBlogs = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserById() {
    this.userService.getUser(this.userId).subscribe(
      (res) => {
        if (res.bio == null) {
          this.fireNullBioSwal();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

IgnoreNullBio(){
  this.userService.ignoreBioNull(this.userId).subscribe(
    (res) => {
    console.log(res)
    },
    (err) => {
      console.log(err);
    }
  );
}



  fireNullBioSwal() {
    Swal.fire({
      title: 'Do you want to add a bio?',
      html: `<div class="swal-custom-checkbox">
    <input type="checkbox" id="my-checkbox">
    <label  for="my-checkbox" style="    font-family: 'Playfair Display', serif;
"   >don't ask me again</label>
  </div>`,

      icon: 'question',
      customClass: {
        title: 'swal-title',
        icon: '',
        popup: 'containerSweetAlert',

        // Replace with your desired title class
      },
      backdrop: `rgba(0, 0, 0, 0.5)`, // Adjust background color and opacity as needed
      showCancelButton: true,
      background: '#fff',
      confirmButtonColor: 'var(--light-steel)',
      cancelButtonColor: 'grey',
      confirmButtonText: "I'd love to!",
      cancelButtonText: 'no,thanks.',
    }).then((result) => {
      const checkbox = document.getElementById(
        'my-checkbox'
      ) as HTMLInputElement;
      const isChecked = checkbox.checked;

      if (isChecked) {
        this.IgnoreNullBio();
      }

      if (result.isConfirmed) {
        this.router.navigate(['/modify']);
      }
    });
  }
}
