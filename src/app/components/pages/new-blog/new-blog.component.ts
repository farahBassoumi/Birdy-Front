import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { addblog } from 'src/app/models/addBlog.model';
import { blog } from 'src/app/models/blog.model';
import { category } from 'src/app/models/category.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadPhotoModel } from 'src/app/models/uploadPhoto.model';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent implements OnInit {
  image: any;
  choosePic: boolean = true;
  categories: category[] = [];
  newCategory: testModel = {
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
  blogRequest: addblog = {
    title: 'blog1',
    content: '',
    categoryId: '',
    userId: '',
  };
  uploadImageRequest: UploadPhotoModel = {
    id: 'eab32c34-1462-474b-3559-08dbfcceb79a',
    image: new FormData(),
  };

  constructor(
    private blogService: BlogService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userIdFromLocalStorage = localStorage.getItem('userId');
    this.blogRequest.userId = userIdFromLocalStorage || '';
    this.categoryService.getCategories().subscribe((res) => {
      //cv
      this.categories = res;
    }),
      (error: any) => {
        console.log(error);
      };
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
      this.fd.append('BlogId', 'eab32c34-1462-474b-3559-08dbfcceb79a'); // Replace with the actual BlogId
  
      this.uploadImageRequest.image = this.fd;
      console.log(this.uploadImageRequest);
      this.http
        .post<any>(
          'https://localhost:7054/api/Blog/ImageUpload',
          this.fd
        )
        .subscribe(
          (res) => {
            console.log(res);
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
        this.blogRequest.categoryId = res.id;
      },
      error: (err: any) => {
        console.log('erreur' + err.StatusCode);
      },
    });
  }

  addBlog() {
    //cv
    this.choosePic = true;

    console.log('blogrequest  ' + this.blogRequest.categoryId);
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
}
