import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../shared/interfaces/user.interface";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss']
})
export class HeaderAppComponent implements OnInit {
  public loggedUser : UserInterface | null = null;
  public menuItems = [
    {
      label: 'Les animaux',
      path: '/animal'
    },
    {
      label: 'Le matériel',
      path: '/material'
    },
    {
      label: 'L\'alimentation',
      path: '/feeding'
    },
    {
      label: 'Qui sommes-nous?',
      path: '/about-us'
    },
    {
      label: 'Contact',
      path: '/contact'
    }
  ]
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    let user : string | null = localStorage.getItem('user');
    this.loggedUser = user ? JSON.parse(user) : null;
    console.log(this.loggedUser);
    if(!this.authService.isLoggedIn())
      this.authService.logout();
    console.log(this.authService.isLoggedIn())
  }

}
