import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart : CommandInterface |null = null;
  public activeRoute: string = '';

  public cart$: Observable<CommandInterface> | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private commandsService: CommandsService) { }

  ngOnInit(): void {
    this.cart$ = this.commandsService.getCart();
      console.log(this.cart$);
  }

}
