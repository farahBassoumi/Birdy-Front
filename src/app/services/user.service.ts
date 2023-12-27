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

  constructor(private http: HttpClient) {}

  getBlogsInfo(id: string): Observable<JSON> {
    return this.http.post<JSON>(
      this.baseApiUrl + '/api/User/getBlogsInfo',
      id
    );
  }

  getUser(id: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/api/User/getUserById',
      id
    ); 
  }

  updateUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseApiUrl + '/api/User/updateUser',
      user
    );
  }

login(loginRequest:loginModel):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/Login',
    loginRequest
  );








  
}


signUp(signUpRequest:SignUpModel):Observable<any>{
  return this.http.post<any>(
    this.baseApiUrl + '/Register',
    signUpRequest
  );
}

}
