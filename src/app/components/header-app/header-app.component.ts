import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss']
})
export class HeaderAppComponent implements OnInit {
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

  private isLogged!: boolean;

  constructor(public authService: AuthService, private commandeService: CommandsService) {
  }
  ngOnInit(): void {
    this.authService.isLogged$.subscribe(isLogged => this.isLogged = isLogged);
  }

  get isLoggedIn() {
    return this.isLogged;
  }

  onLogout(): void {
    this.authService.logout();
    this.commandeService.cart$.next(this.commandeService.getLsCart());
  }

}
