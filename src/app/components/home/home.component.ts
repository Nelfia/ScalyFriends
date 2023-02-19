import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../shared/interfaces/user.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loggedUser! : UserInterface | null;
  public idCart!: number;

  constructor() { }

  ngOnInit(): void {

    let user : string | null = localStorage.getItem('user');
    this.loggedUser = user ? JSON.parse(user) : null;
    this.idCart = Number(localStorage.getItem('id_cart'));
  }

}
