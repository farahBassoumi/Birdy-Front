import { Component, OnInit } from '@angular/core';
import { blog } from 'src/app/models/blog.model';
import { category } from 'src/app/models/category.model';
import { testModel } from 'src/app/models/testModel.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  categories: category[] = [];

  blogs: blog[] = [];
  chosenCategory: testModel = {
    name: '',
  };
  blogcategory: category = {
    id: '',
    name: '',
  };
  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {}
  ngOnInit() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    }),
      (error: any) => {
        console.log(error);
      };
  }

  getBlogs(): void {//cv
  
      this.categoryService.getCategoryByName(this.chosenCategory).subscribe(
        (res) => {
        //  this.blogcategory.id = res.id;
        this.blogcategory.id = '5';

          this.blogcategory.name = this.chosenCategory.name;
          console.log( this.blogcategory.id +'..'+this.blogcategory.name );
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.blogService
        .getBlogsByCategory(this.blogcategory)
        .subscribe((res) => {
          this.blogs = res;
          console.log(res);
        }),
        (error: any) => {
          console.log(error);
        };

    }
  }

