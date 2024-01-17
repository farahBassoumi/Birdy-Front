import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { addCommentModel } from '../models/addComment.model';
import { testModel } from '../models/testModel.model';
import { likingRequest } from '../models/likingRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseApiUrl: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCommentsByBlogId(id: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/GetCommentsByBlog'
    ,id
    );
  }


CreateComment(comment:addCommentModel): Observable<any> {
  return this.http.post<any>(
    this.baseApiUrl + '/CreateComment'
  ,comment
  );
}


dislikeComment(likingrequest:likingRequest):Observable<any>{
  return this.http.put<any>(
    this.baseApiUrl + '/dislikeComment',
    likingrequest
  );
}

likeComment(likingrequest:likingRequest):Observable<any>{
  return this.http.put<any>(
    this.baseApiUrl + '/likeComment',
    likingrequest
  );
}

getCommentLikes(likingrequest:likingRequest):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/getCommentLikes',
    likingrequest
  );
}
getCommentById(id:testModel):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/getCommentById',
    id
  );
}

}
