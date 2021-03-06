import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }
  constructor(private router: Router) {

  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  public logout = () => {
    localStorage.removeItem("user");
    this.router.navigate(['../login-form']);
  }
}
