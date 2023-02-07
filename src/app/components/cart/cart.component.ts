import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {config, Observable} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  apiBaseUrl = API_BASE_URL;
  public cart$: Observable<CommandInterface> | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private commandsService: CommandsService) { }

  ngOnInit(): void {
    // TODO: Enregistrer et récupérer les éléments du panier ds LS.
      this.cart$ = this.commandsService.getCart();
  }
  removeLine(id: Number): void {
    if(confirm("Etes-vous sûr de vouloir retirer cet élément de votre panier?")) {
      this.commandsService.removeLine(id);
      console.log('Ligne supprimée!')
    }
  }

}
