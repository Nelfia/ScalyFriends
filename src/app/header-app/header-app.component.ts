import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-app',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss']
})
export class HeaderAppComponent implements OnInit {
  public menuItems = [
    {
      label: 'Les animaux',
      path: '/animals'
    },
    {
      label: 'Le matériel',
      path: '/stuff'
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
  constructor() { }

  ngOnInit(): void {
  }

}
