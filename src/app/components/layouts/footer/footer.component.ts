import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
 email:string='';


  emailForm: FormGroup;

  constructor(private fb: FormBuilder,private blogService:BlogService) {
    this.emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    });
  }
  emailNewsletter:string='';

  subscribe(){
    if (this.emailForm.valid) {

this.blogService.subscribeNewsletter(this.emailNewsletter).subscribe({
  next: (res) => {
console.log(res);
    //location.reload();
   // this.router.navigate(['dashboard']);
  },
  error: (err) => {
    console.log(err);
  },
});

  }

}

  
}
