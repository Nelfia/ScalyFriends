import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {config, Observable, tap} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineInterface} from "../../shared/interfaces/Line.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartForm!: FormGroup;
  cart$!: Observable<CommandInterface>;

  constructor(private commandsService: CommandsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // TODO: Enregistrer et récupérer les éléments du panier ds LS.
    this.cart$ = this.commandsService.getCart();
    // this.cartForm = this.fb.group({
    //   quantity: [null, [Validators.required, Validators.min(1)]]
    // })
  }


}
