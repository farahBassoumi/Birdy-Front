import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseApiUrl: string = environment.apiKey;

  constructor(private http:HttpClient) { }

  sendContactMessage(email:string,message:string):Observable<boolean>{
    const body = { email: email, message: message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post <boolean> (this.baseApiUrl+'/api/Sared/sendContactMessage',body,{headers});
    }
  }




