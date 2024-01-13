import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { category } from '../models/category.model';
import { User } from '../models/user.model';
import { addblog } from '../models/addBlog.model';
import { testModel } from '../models/testModel.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl: string = environment.apiKey;

  constructor(public http: HttpClient) {}

  getBlogs(): Observable<blog[]> { //
    return this.http.get<blog[]>(this.baseApiUrl + '/getBlogs');
  }

  getBlogsByCategory(cat: category): Observable<blog[]> {
    return this.http.post<blog[]>(
      this.baseApiUrl + '/getBlogsByCategory',
      cat
    );
  }


  getBlogsById(id: testModel): Observable<blog> {
    return this.http.post<blog>(
      `${this.baseApiUrl}/getBlog`,
      id
    );
  }
  getTrendingBlogs(): Observable<blog[]> {
    return this.http.get<blog[]>(
      this.baseApiUrl + '/getTrendingBlogs'
    );
  }

  getForYouBlogs(id: string): Observable<blog[]> {
    return this.http.get<blog[]>(this.baseApiUrl + '/api/blog/getForYouBlogs');
  }

  subscribeNewsletter(email: string): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseApiUrl + '/api/blog/subscribeNewsletter',
      email
    );
  }

  updateBlog(blogRequest: blog): Observable<blog> {
    return this.http.post<blog>(
      this.baseApiUrl + '/api/blog/updateBlog',
      blogRequest
    );
  }

getBlogsByUser(user:testModel): Observable<any> {
  return this.http.post<any>(
    this.baseApiUrl + '/getBlogsByUserId',
    user
  );
}
addBlog(blog:addblog):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/createBlog',
    blog
  );
}
/*
uploadImage(image:any, id:string):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/api/uploadImage'+id,
    image
  );
}*/
uploadFile(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  return this.http.post<any>('/api/upload', formData);
}



}
