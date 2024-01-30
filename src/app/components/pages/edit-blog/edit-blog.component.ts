import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { addblog } from 'src/app/models/addBlog.model';
import { blog } from 'src/app/models/blog.model';
import { category } from 'src/app/models/category.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPhotoModel } from 'src/app/models/uploadPhoto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  image: any;
  choosePic: boolean = false;
  categories: category[] = [];
  newCategory: testModel = {
    name: '',
  };
  getBlogRequest: testModel = {
    name: '',
  };
  chosenCategory: testModel = {
    name: '',
  };
  category2: any;
  choosen: boolean = false;
  submitted: boolean = false;
  fd: any;
  imageUrl: any;
  selectedFile?: File;
  ImageFromServer: any;
  blog: blog = {
    id: '',
    title: '',
    content: '',
    categorieId: '',
    likes: 0,
    dislikes: 0,
    userId: '',
    views: 0,
    image: '',
  };
  uploadImageRequest: UploadPhotoModel = {
    id: 'c2243800-ea2b-43d0-03fd-08dbfcf35573',
    image: new FormData(),
  };
  getCategoryRequest:testModel={
    name:''
  }
  categoryName:any;
  constructor(
    private blogService: BlogService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBlogRequest.name = localStorage.getItem('blogId')!;
    this.getBlogById();

    //console.log('inside the ngOnInit editblog');
    this.getCategories();
    const userIdFromLocalStorage = localStorage.getItem('userId');
   
  }


  getCategories(){
    this.categoryService.getCategories().subscribe((res) => {
      //cv
      this.categories = res;
      
    }),
      (error: any) => {
        console.log(error);
      };
  }

  getBlogById() {
    this.blogService.getBlogsById(this.getBlogRequest).subscribe(
      (res) => {
        this.blog=res;
        this.getCategoryRequest.name=res.categorieId.toString();
        this.getCategoryById();
      },
      (err) => {}
    );
  }

  getCategoryById(){
 
    console.log(this.getCategoryRequest.name);
      this.categoryService.getCategoryById(this.getCategoryRequest).subscribe(
        (res) => {
          console.log(res);
          this.chosenCategory.name = res.name;
        },
        (err) => {}
      );
    


  }



  fileChoosen(event: any) {
    if (event.target.value) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitPhoto(): void {
    this.fd = new FormData();
    if (this.selectedFile) {
      //this.fd.append('file', this.selectedFile);

      this.fd.append('Image', this.selectedFile, this.selectedFile.name); // Match the property name on the server-side (ImageModel.Image)
      this.fd.append('BlogId', this.uploadImageRequest.id); // Replace with the actual BlogId

      //  this.uploadImageRequest.image = this.fd;
      console.log(this.uploadImageRequest);
      this.http
        .post<any>('https://localhost:7054/api/Blog/ImageUpload', this.fd)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate(['see-blogs']);
          },

          (err) => {
            console.log('error' + err);
          }
        );
    }
  }
  next() {
    this.choosePic = true;
  }

  addCategory() {
    //cv
    this.categoryService.addCategory(this.newCategory).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
    this.ngOnInit();
  }

  onCategoryChange() {
    this.categoryService.getCategoryByName(this.chosenCategory).subscribe({
      next: (res: any) => {
        console.log(res.id);
        this.blog.categorieId = res.id;
      },
      error: (err: any) => {
        console.log('erreur' + err.StatusCode);
      },
    });
  }
  /*
  addBlogWithoutImage() {
    //cv
    this.choosePic = true;

    console.log('blogrequest  ' + this.blog.categoryId);
    this.blogService.addBlog(this.blogRequest).subscribe({
      next: (res: any) => {
        console.log(res.blog.id);
        this.uploadImageRequest.id = res.blog.id;
        this.onBlogAddedSuccess();
      },
      error: (err: any) => {
        console.log('erreur' + err.StatusCode);
      },
    });
  }

  onBlogAddedSuccess() {
    this.snackBar.open('Blog added successfully', 'Close', {
      duration: 3000, // milliseconds
    });
  }
  */
}
