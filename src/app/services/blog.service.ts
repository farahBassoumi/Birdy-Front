import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { blog } from '../models/blog.model';
import { Observable } from 'rxjs';
import { category } from '../models/category.model';
import { User } from '../models/user.model';
import { addblog } from '../models/addBlog.model';
import { testModel } from '../models/testModel.model';
import { likingRequest } from '../models/likingRequest.model';
import { updateBlogRequest } from '../models/updateBlogRequest.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl: string = environment.apiKey;

  constructor(public http: HttpClient) {}

  getBlogs(): Observable<blog[]> {
    //
    return this.http.get<blog[]>(this.baseApiUrl + '/getBlogs');
  }

  getBlogsByCategory(cat: category): Observable<blog[]> {
    return this.http.post<blog[]>(this.baseApiUrl + '/getBlogsByCategory', cat);
  }

  getBlogsByCategoryName(cat: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/getBlogsByCategoryName',
      cat
    );
  }

  getBlogsById(id: testModel): Observable<blog> {
    return this.http.post<blog>(`${this.baseApiUrl}/getBlog`, id);
  }
  getTrendingBlogs(): Observable<blog[]> {
    return this.http.get<blog[]>(this.baseApiUrl + '/getTrendingBlogs');
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

  getBlogsByUser(user: testModel): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/getBlogsByUserId', user);
  }
  addBlog(blog: addblog): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/createBlog', blog);
  }

  dislikeBlog(likingrequest: likingRequest): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/dislikeBlog', likingrequest);
  }

  likeBlog(likingrequest: likingRequest): Observable<any> {
    return this.http.put<any>(this.baseApiUrl + '/likeBlog', likingrequest);
  }

  getLikes(likingrequest: likingRequest): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/getBlogLikes',
      likingrequest
    );
  }

  /*
uploadImage(image:any, id:string):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/api/uploadImage'+id,
    image
  );
}*/
 

  deleteBlog(id: testModel): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/deleteBlog', id);
  }
  addView(id: testModel): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/addView', id);
  }

  editBlog(id: string, updatedData: updateBlogRequest): Observable<any> {
    const url = `${this.baseApiUrl}/updateBlog/${id}`;
    return this.http.put(url, updatedData);
  }

  uploadImage(fd: FormData) {
    return this.http.post<any>(
      'https://localhost:7054/api/Blog/ImageUpload',
      fd
    );
  }

  deleteImage(id: string): Observable<any> {
    const url = `${this.baseApiUrl}/updateBlog/${id}`;
    return this.http.delete(url);
  }
}
