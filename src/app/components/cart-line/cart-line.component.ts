import { Component, Input, OnInit } from '@angular/core';
import {LineInterface} from "../../shared/interfaces/Line.interface";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {API_BASE_URL} from "../../shared/constants/constants";

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.scss']
})
export class CartLineComponent implements OnInit {
  @Input() line!: LineInterface;
  apiBaseUrl!: string;
  constructor(private commandsService: CommandsService) { }
  quantity!: number;
  ngOnInit(): void {
    this.apiBaseUrl = API_BASE_URL;
  }
  removeLine(idLine: number): void {
    if (confirm("Etes-vous sûr de vouloir retirer cet élément de votre panier?")) {
      this.commandsService.removeLine(idLine);
      console.log('Ligne supprimée!')
    }
  }
}
