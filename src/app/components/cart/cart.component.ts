import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {Subject, takeUntil} from "rxjs";
import {LineInterface} from "../../shared/interfaces/Line.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: CommandInterface | null;
  destroy$ : Subject<boolean> = new Subject<boolean>()
  totalQuantity!: number;
  totalPrice!: number;
  constructor(private commandsService: CommandsService) {
  }

  ngOnInit(): void {
    this.commandsService.cart$.pipe( takeUntil(this.destroy$) ).subscribe( cart => {
      this.cart = cart;
      this.totalQuantity = 0;
      this.totalPrice = 0;
      this.cart?.lines.forEach(line => {
        this.totalQuantity += line.quantity;
        this.totalPrice += (line.price * line.quantity);
      })
    });
  }

  getTotals(line: LineInterface) {

  }
  ngOnDestroy() {
    this.destroy$.next(false);
  }

}
