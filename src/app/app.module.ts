import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryNavbarComponent } from './components/layouts/category-navbar/category-navbar.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { PostCardComponent } from './components/layouts/post-card/post-card.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { ListComponent } from './components/comments/list/list.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { NewBlogComponent } from './components/pages/new-blog/new-blog.component';
import { SingleCategoryComponent } from './components/pages/single-category/single-category.component';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ModifyProfileComponent } from './components/pages/modify-profile/modify-profile.component';
import { UserBlogsComponent } from './components/pages/user-blogs/user-blogs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommentComponent } from './components/layouts/comment/comment.component';
import { DialogFollowersComponent } from './components/layouts/dialog-followers/dialog-followers.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditBlogComponent } from './components/pages/edit-blog/edit-blog.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CategoryNavbarComponent,
    FooterComponent,
    HeaderComponent,
    PostCardComponent,
    CommentFormComponent,
    ListComponent,
    AboutUsComponent,
    ContactUsComponent,
    NewBlogComponent,
    SingleCategoryComponent,
    SinglePostComponent,
    TermsConditionsComponent,
    HomeComponent,
    ProfileComponent,
    ModifyProfileComponent,
    UserBlogsComponent,
    DialogContentComponent,
    CommentComponent,
    DialogFollowersComponent,
    EditBlogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
