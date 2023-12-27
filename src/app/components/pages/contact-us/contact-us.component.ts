import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
public email:string;
public message:string;

constructor(private sharedService:SharedService) {
  this.email='';
 this.message='';
}

  sendContactMessage(){
this.sharedService.sendContactMessage(this.email,this.message).subscribe(params=> {
  console.log(params);
});
  }
}
