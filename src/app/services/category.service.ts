import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../models/category.model';
import { environment } from 'src/environments/environment.development';
import { testModel } from '../models/testModel.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseApiUrl: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<category[]> {
    return this.http.get<category[]>(
      this.baseApiUrl + '/getCategories'
    );
  }
  getCategoryByName(cat: testModel): Observable<category> {
    return this.http.post<category>(
      this.baseApiUrl + '/getCategoryByName',
      cat
    );
  }
  addCategory(cat:testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/addCategory',
      cat
    );
  }
}
