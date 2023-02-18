import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: CommandInterface | null;
  destroy$ : Subject<boolean> = new Subject<boolean>()

  constructor(private commandsService: CommandsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.commandsService.cart$.pipe( takeUntil(this.destroy$) ).subscribe( cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
