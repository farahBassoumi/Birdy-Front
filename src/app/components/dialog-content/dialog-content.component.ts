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
      username: 'farah2',
      password: '7Ahh.h',
      email: 'farah2@mail',
    };
    this.template = data.template;
  }

  login() {
    this.userService.login(this.loginRequest).subscribe((res) => {
      console.log(res);
    });

    this.userService.login(this.loginRequest).subscribe({
      next: (response: any) => {
        if (response.statusCode == 404) {
          //user not found
        } else if (response.statusCode == 400) {
          //wrong password
        } else if (response.statusCode == 401) {
          //user desactivated
       //   this.router.navigate(['desactivated']);
        } else {
          //login success!
          const token = response.token;
          localStorage.setItem('token', token);
         // localStorage.setItem('userId', this.userId);
          localStorage.setItem('username', this.loginRequest.username);
          localStorage.setItem('userId',response.userId);
          console.log(response.userId);
          window.location.reload();

          //this.router.navigate(['Home']);


        }
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
    this.userService.signUp(this.signUpRequest).subscribe(
      (res) => {
        console.log(res);

        //localStorage.setItem('username',this.signUpRequest.username);
      },
      (err) => console.log(err)
    );
  }
}
