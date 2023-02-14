import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {API_BASE_URL} from "../../shared/constants/constants";
import {Observable, of, tap} from "rxjs";
import {CommandInterface} from "../../shared/interfaces/command.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit, OnDestroy {
  @Input() line!: LineInterface;
  @Output() removeCartLine: EventEmitter<number> = new EventEmitter<number>();
  apiBaseUrl!: string;
  constructor(private commandsService: CommandsService, private formBuilder: FormBuilder) { }
  quantity!: number;
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
    this.quantity = this.line.quantity;
    console.log(this.line.quantity)
  }
  removeLine(idLine: number): void {
    if (confirm("Etes-vous sûr de vouloir retirer cet élément de votre panier?")) {
      this.commandsService.removeLine(idLine).pipe(
        tap(cart => {
          localStorage.setItem('cart', JSON.stringify(cart))
          console.log('Ligne supprimée!')
          this.removeCartLine.emit(idLine);
        })
      ).subscribe(() => "Delete successful");
    }
  }
  doThat(){
    console.log('go update line!')
    console.log(`${this.line.product.name} en ${this.quantity} exemplaires`)
  }
  ngOnDestroy() {
  }
}
