import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   *
   */
  constructor(private Httpclient:HttpClient) {
    console.log('before');
    this.Httpclient.get('https://www.youtube.com/watch?v=oTObLWih_EA');
    console.log('before');

  }
  title = 'test2Project';
}
