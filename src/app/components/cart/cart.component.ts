import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {config, map, Observable, Subject, takeUntil, tap} from "rxjs";
import {API_BASE_URL} from "../../shared/constants/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LineInterface} from "../../shared/interfaces/Line.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart$!: Observable<CommandInterface | null>;
  destoy$ = new Subject<boolean>()

  constructor(private commandsService: CommandsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // TODO: Enregistrer et récupérer les éléments du panier ds LS.
    this.commandsService.cart$.pipe(takeUntil(this.destoy$)).subscribe(cart => {
      console.log(cart);
    });
    this.cart$ = this.commandsService.cart$.pipe(
      map(cart => cart)
    );
  }

  ngOnDestroy() {
    this.destoy$.next(true);
  }

  removeCartLine(idLine : number) {

  }

}
