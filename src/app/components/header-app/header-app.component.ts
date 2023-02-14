import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../shared/interfaces/user.interface";
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";

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
  constructor(private authService: AuthService, private commandeService: CommandsService) {
  }
  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    if(!this.authService.isLoggedIn())
      this.authService.logout();
  }

}
