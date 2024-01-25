import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../components/dialog-content/dialog-content.component';
import { Observable } from 'rxjs';
import { testModel } from '../models/testModel.model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { likingRequest } from '../models/likingRequest.model';
import { DialogFollowersComponent } from '../components/layouts/dialog-followers/dialog-followers.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  baseApiUrl: string = environment.apiKey;

  constructor(private dialog: MatDialog,public http: HttpClient) {}

  openDialog(dialogConfig: any): void {
    this.dialog.open(DialogContentComponent, dialogConfig);
  }



  openDialogFollowers(dialogConfig: any): void {
    this.dialog.open(DialogFollowersComponent, dialogConfig);
  }



  getFollowers( id: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/getFollowersById',
      id
    );
  }


  getFollowings( id: testModel): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/getFollowingsById',
      id
    );
  }
  
  Follow( request: likingRequest): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/Follow',
      request
    );
  }
   


  Unfollow( request: likingRequest): Observable<any> {
    return this.http.post<any>(
      this.baseApiUrl + '/Unfollow',
      request
    );
  }
}
