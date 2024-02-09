import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/models/login.model';
import { SignUpModel } from 'src/app/models/signUp.model';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {
  loginRequest: loginModel;
  signUpRequest: SignUpModel;
  template?: string;
  userId: any;
  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  
  ) {
    this.loginRequest = {
      username: 'farah2',
      password: '7Ahh.h',
    };
    this.signUpRequest = {
      username: 'farah3',
      password: '7Ahh.h',
      email: 'farah3@mail',
    };
    this.template = data.template;
  }

  login() {
    console.log(this.loginRequest.password);
    console.log(this.loginRequest.username);

    // this.userService.login(this.loginRequest).subscribe((res) => {
    //   console.log(res);
    // });

    this.userService.login(this.loginRequest).subscribe({
      next: (response: any) => {
        console.log(response);

          //login success!
          const token = response.token;
          localStorage.setItem('token', token);
         // localStorage.setItem('userId', this.userId);
          localStorage.setItem('username', this.loginRequest.username);
          localStorage.setItem('userId',response.userId);
          console.log(response.userId);
          window.location.reload();

          //this.router.navigate(['Home']);


        
      },
      error: (err: any) => {},
    });
  }
  switch() {
    console.log(this.template);
    if (this.template == 'login') this.template = 'sign up';
    else this.template = 'login';
    //this.dialogService.openDialog();
  }

  signUp() {
    console.log(this.signUpRequest.email)
    console.log(this.signUpRequest.password)

    console.log(this.signUpRequest.username)

    this.userService.signUp(this.signUpRequest).subscribe(
      (res) => {
        console.log(res);

        //localStorage.setItem('username',this.signUpRequest.username);
      },
      (err) => console.log(err)
    );
  }
}
