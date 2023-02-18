import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {FormBuilder} from "@angular/forms";
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
    this.commandsService.getCart(this.authService.isLogged$.getValue());
    console.log('OnInitCart' + this.authService.isLogged$.getValue())
    this.cart$ =  this.commandsService.cart$;
  }

  ngOnDestroy() {
    this.destoy$.next(true);
  }


}
