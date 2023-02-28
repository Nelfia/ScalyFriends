import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {API_BASE_URL} from "../../shared/constants/constants";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  public apiBaseUrl = API_BASE_URL;
  isAdminIn!: boolean;
  private destroy$ : Subject<boolean> = new Subject<boolean>()
  constructor(protected route: ActivatedRoute, protected router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAdmin$.pipe( takeUntil(this.destroy$) ).subscribe(
      res => this.isAdminIn = res
    );
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
