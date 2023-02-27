import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {API_BASE_URL} from "../../shared/constants/constants";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit, OnDestroy {
  @Input() line!: LineInterface;
  @Output() removeCartLine: EventEmitter<number> = new EventEmitter<number>();
  apiBaseUrl!: string;
  quantity!: number;
  private destroy$ : Subject<boolean> = new Subject<boolean>();
  constructor(private commandsService: CommandsService) { }
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
    this.quantity = this.line.quantity;
  }
  removeLine(idLine: number, idProduct: number): void {
    if (confirm("Etes-vous sûr de vouloir retirer cet élément de votre panier?")) {
      this.commandsService.removeLine(idLine, idProduct).pipe(
        takeUntil(this.destroy$)
      ).subscribe(cart => {
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log('Ligne supprimée!')
        this.removeCartLine.emit(idLine)
      });
    }
  }

  updateLine(line: LineInterface) : void {
    line.quantity = this.quantity;
    console.log(line.quantity)
    this.commandsService.updateLine(line).pipe(takeUntil(this.destroy$)).subscribe();
    console.log('go update line!')
    console.log(`${this.line.idLine} en ${this.quantity} exemplaires`)
  }
  ngOnDestroy() {
    this.destroy$.next(false)
  }
}
