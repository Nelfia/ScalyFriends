import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {config, map, Observable, of, Subject, takeUntil, tap} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart$!: Observable<CommandInterface | null>;
  destoy$ = new Subject<boolean>()

  constructor(private commandsService: CommandsService, private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    // TODO: Enregistrer et récupérer les éléments du panier ds LS.
    this.commandsService.cart$.pipe(takeUntil(this.destoy$)).subscribe(cart => {
      console.log(cart);
    });
    if(this.authService.isLoggedIn()) {
      this.cart$ = this.commandsService.cart$.pipe(
        map(cart => cart)
      );
    } else {
      let cartLs = localStorage.getItem('cart');
      if (cartLs) {
        let cart: CommandInterface = JSON.parse(cartLs);
        this.cart$ = of(cart);
      }
    }
  }

  ngOnDestroy() {
    this.destoy$.next(true);
  }

  removeCartLine(idLine : number) {

  }

}
