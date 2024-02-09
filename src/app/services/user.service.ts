import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { loginModel } from '../models/login.model';
import { SignUpModel } from '../models/signUp.model';
import { testModel } from '../models/testModel.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = environment.apiKey;
  url: any;
  constructor(private http: HttpClient) {}

  getBlogsInfo(id: string): Observable<JSON> {
    return this.http.post<JSON>(this.baseApiUrl + '/api/User/getBlogsInfo', id);
  }

    getUser(id: string): Observable<any> {
      this.url = `${this.baseApiUrl}/api/User/getUserById/${id}`;
      return this.http.get<any>(this.url);
    }

  updateUser(user: User, id: string): Observable<any> {
    const url = `${this.baseApiUrl}/updateUser/${id}`;

    return this.http.put(url, user);
  }

  login(loginRequest: loginModel): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/Login', loginRequest);
  }

  getUserCounts(request: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/api/User/getUserCounts',
      request
    );
  }
  signUp(signUpRequest: SignUpModel): Observable<any> {
    return this.http.post<any>(this.baseApiUrl + '/api/Register', signUpRequest);
  }
  ignoreBioNull(id: string): Observable<any> {
    this.url = `${this.baseApiUrl}/api/User/setBioEmptyString/${id}`;
    return this.http.patch<any>(this.url,id);
  }
  uploadImage(fd: FormData) {
    return this.http.post<any>(
      this.baseApiUrl +'/api/User/ImageUpload',
      fd
    );
  }
 
}
