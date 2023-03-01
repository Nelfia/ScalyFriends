import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Subject, takeUntil} from "rxjs";
import {CommandsService} from "../../shared/services/commands/commands.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  form:FormGroup;

  destroy$ : Subject<boolean> = new Subject<boolean>()

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private commandeService: CommandsService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      pwd: ['',Validators.required]
    });
  }
  login() {
    const val = this.form.value;
    // TODO: Hacher le pwd & corriger le pendant côté serveur

    if (val.username && val.pwd) {
      this.authService.login(val.username, val.pwd).pipe(
        takeUntil(this.destroy$)
      ).subscribe((res: any) => {
        this.router.navigateByUrl('/');
        // Créer un nouveau cart
        this.commandeService.idCart = res.idCart;
        this.commandeService.agregateCarts(res.cart, res.user, this.authService.isAdmin$.value);
      })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }

}
