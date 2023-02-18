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
    this.commandsService.cart$.pipe(takeUntil(this.destoy$)).subscribe();
    this.commandsService.getCart(this.authService.isLogged$.getValue());
    console.log('OnInitCart' + this.authService.isLogged$.getValue())
    this.cart$ =  this.commandsService.cart$;
  }

  ngOnDestroy() {
    this.destoy$.next(true);
  }


}
