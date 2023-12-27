import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SingleCategoryComponent } from './components/pages/single-category/single-category.component';
import { SinglePostComponent } from './components/pages/single-post/single-post.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { NewBlogComponent } from './components/pages/new-blog/new-blog.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ModifyProfileComponent } from './components/pages/modify-profile/modify-profile.component';
import { UserBlogsComponent } from './components/pages/user-blogs/user-blogs.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';

const routes: Routes = [

  {path:'',component: HomeComponent},
  {path:'Home',component: HomeComponent},
  {path:'category',component: SingleCategoryComponent},
  {path:'post',component: SinglePostComponent},
  {path:'about',component: AboutUsComponent},
  {path:'terms-conditions',component: TermsConditionsComponent},
  {path:'contact',component: ContactUsComponent},
  {path:'k',component: NewBlogComponent},
  {path:'profile',component: ProfileComponent},
  {path:'modify',component: ModifyProfileComponent},
  {path:'see-blogs',component: UserBlogsComponent},
  {path:'dialog',component: DialogContentComponent},
  {path:'new-blog',component: NewBlogComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
