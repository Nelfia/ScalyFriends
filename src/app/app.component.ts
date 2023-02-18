import {Component, OnInit} from '@angular/core';
import {CommandsService} from "./shared/services/commands/commands.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private commandeservice: CommandsService) {
  }

  ngOnInit() {
    this.commandeservice.cart$.next(this.commandeservice.getLsCart());
  }

  title = 'scalyFriends';
}
