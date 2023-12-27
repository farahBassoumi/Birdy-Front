import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { addblog } from 'src/app/models/addBlog.model';
import { blog } from 'src/app/models/blog.model';
import { category } from 'src/app/models/category.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent implements OnInit {
  image: any;
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

  constructor(
    private blogService: BlogService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const userIdFromLocalStorage = localStorage.getItem('userId');
    this.blogRequest.userId=userIdFromLocalStorage|| '';
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
    //this.submitted=true;
    if (this.selectedFile) {
      //this.fd.append('profileImage',this.image,this.image.name);
      this.fd.append('file', this.selectedFile);
      this.http
        .post<any>('https://localhost:7054/api/uploadImage', this.fd)
        .subscribe(
          (res) => {
            console.log(res);

            this.imageUrl = res.imageUrl;
          },

          (err) => {
            console.log('error' + err);
          }
        );
    }
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

  /*
  getImageUrl(): void {
    console.log('hhhhhh');
    const fileName = "21083db5-c8e0-4557-8248-8aceb6e5b42c_Counseller vs psychologist.JPG";
    this.http
      .get<any>(
        `https://localhost:7054/api/Blog/images/${fileName}`
      ).subscribe(
        (res) => {
          console.log(res.path);
          this.imageUrl=res.path;
        },

        (err) => {
          console.log('error' + err);
        }
      );
  }

  /*
       this.http
        .post<any>('https://localhost:7054/api/uploadImage', this.fd)
        .subscribe((res) =>{ console.log(res);
        this.ImageFromServer = res;},

        (err)=>{
          console.log(err);
        });
    } else console.log('selectedFile is null');
  }


getPhoto(){


  this.http.get<any[]>('https://localhost:7054/api/GetImage').subscribe(
    (files) => {
      this.ImageFromServer = files;
    },
    (error) => {
      console.error('Error loading uploaded files:', error);
    }
  );
}*/

  /*this.blogService.uploadFile(this.selectedFile).subscribe(
    (response) => {
      console.log('Image uploaded successfully:', response);
      // Handle the response from the server, which may include the path to the saved image.
    },
    (error) => {
      console.error('Error uploading image:', error);
    }
  );*/

  /*
if(this.selectedFile){
this.fd.append('profileImage',this.image,this.image.name);
console.log('sumitted  '+this.submitted+'  profileimangename  '+this.image+this.image.name);
}
if(!this.image)
console.log('image null');
}

  /*
  public formData=new FormData();

  public onChangeFile(event:any){
if(event.target.files.length>0){
  const file=event.target.files[0];
  this.formData.append('file',file);
  
}*/

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

    console.log('blogrequest  ' + this.blogRequest.categoryId);
    this.blogService.addBlog(this.blogRequest).subscribe({
      next: (res: any) => {
        console.log(res);
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
