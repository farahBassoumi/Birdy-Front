import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: any;
  constructor(private dialogService: DialogService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  openDialogLogin(): void {
    const dialogConfig = {
      data: {
        // Your variable to be passed
        template: 'login',
      },
    };

    this.dialogService.openDialog(dialogConfig);
  }

  openDialogSignUp(): void {
    const dialogConfig = {
      data: {
        // Your variable to be passed
        template: 'sign up',
      },
    };

    this.dialogService.openDialog(dialogConfig);
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  navigateProfile() {
    localStorage.setItem('modify', 'true');
    this.router.navigate(['profile']);
  }
}
