import { Component } from '@angular/core';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent {
  activeCategory:string='Home';
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
}
