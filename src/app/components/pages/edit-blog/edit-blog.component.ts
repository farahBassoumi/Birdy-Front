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
import { updateBlogRequest } from 'src/app/models/updateBlogRequest.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
  image: any;
  choosePicPage: boolean = false;
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
  updateblogRequest: updateBlogRequest = {
    content: '',
    title: '',
    categorieId: 0,
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
    creationDate:''

  };


  selectedImage: string | ArrayBuffer | null = null;

  uploadImageRequest: UploadPhotoModel = {
    id: 'c2243800-ea2b-43d0-03fd-08dbfcf35573',
    image: new FormData(),
  };
  getCategoryRequest: testModel = {
    name: '',
  };
  categoryName: any;
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
    this.getCategories();
    const userIdFromLocalStorage = localStorage.getItem('userId');
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      //cv
      this.categories = res;
    }),
      (error: any) => {
        console.log(error);
      };
  }

  categorySucessfullyAdded() {
    console.log('inside the added succ')
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your category has been added!',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  getBlogById() {
    this.blogService.getBlogsById(this.getBlogRequest).subscribe(
      (res) => {
        this.blog = res;
        this.selectedImage=res.image;
        this.updateblogRequest.categorieId = parseInt(
          this.blog.categorieId,
          10
        );
        this.updateblogRequest.content = this.blog.content;
        this.updateblogRequest.title = res.title;

        console.log(res);
        this.getCategoryRequest.name = res.categorieId.toString();
        this.getCategoryById();
      },
      (err) => {}
    );
  }

  getCategoryById() {
    console.log(this.getCategoryRequest.name);
    this.categoryService.getCategoryById(this.getCategoryRequest).subscribe(
      (res) => {
        console.log(res);
        this.chosenCategory.name = res.name;
      },
      (err) => {}
    );
  }

  editBlog() {
    console.log('inside the edit blog' + this.blog.id);
    this.blogService.editBlog(this.blog.id, this.updateblogRequest).subscribe(
      (res) => {
        console.log(res);
        this.choosePicPage = true;
      },
      (err) => {}
    );
  }

  fileChoosen(event: any) {
    if (event.target.value) {
      this.selectedFile = event.target.files[0];

    }

  
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(this.selectedFile);}


    
  }

  submitPhoto(): void {
    this.fd = new FormData();
    this.uploadImageRequest.id=this.blog.id;
    if (this.selectedFile) {
      //this.fd.append('file', this.selectedFile);

      this.fd.append('Image', this.selectedFile, this.selectedFile.name); // Match the property name on the server-side (ImageModel.Image)
      this.fd.append('BlogId', this.uploadImageRequest.id); // Replace with the actual BlogId

      //  this.uploadImageRequest.image = this.fd;
      console.log(this.uploadImageRequest);

      this.deleteBlogImage();







      this.blogService.uploadImage(this.fd) .subscribe(
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

  deleteBlogImage(){
    this.blogService.deleteImage(this.blog.id) .subscribe(
      (res) => {
        console.log(res);
      },
    
      (err) => {
        console.log('error' + err);
      }
    );
  }

  addCategory() {
    this.categoryService.addCategory(this.newCategory).subscribe(
      (res) => {
        this.newCategory.name = '';
        console.log(res);
        this.getCategories();
        
  this.categorySucessfullyAdded();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onCategoryChange() {
    this.categoryService.getCategoryByName(this.chosenCategory).subscribe({
      next: (res: any) => {
        console.log(res.id);
        this.updateblogRequest.categorieId = res.id;
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

  publish(){
    this.submitPhoto();

  }
}
