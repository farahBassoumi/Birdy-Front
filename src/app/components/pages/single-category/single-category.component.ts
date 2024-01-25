import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  receivedData: string = '';

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
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getCategories();


this.getData();
    console.log(this.receivedData)
    if (this.receivedData!=''){
      this.chosenCategory.name=this.receivedData;
      this.getBlogsByCategory();
    }
   
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    }),
      (error: any) => {
        console.log(error);
      };
  }

  getBlogsByCategory() {
    console.log(this.chosenCategory.name);
    this.blogService
      .getBlogsByCategoryName(this.chosenCategory)
      .subscribe((res) => {
        this.blogs = res;
        console.log(res);
      }),
      (error: any) => {
        console.log(error);
      };
  }


  getData() {
    this.route.params.subscribe((params) => {
 console.log(params['data?'])
     this.receivedData=params['data?'];
    });
  }
}
