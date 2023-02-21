import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {

  signinForm: FormGroup;

  destroy$ : Subject<boolean> = new Subject<boolean>()

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private commandeService: CommandsService) {

    this.signinForm = this.fb.group({
      username: ['',Validators.required],
      pwd: ['',Validators.required],
      pwdConfirm: ['', Validators.required]
    }, { validators: this.samePwdsValidator()});
  }
  signin() {
    const val = this.signinForm.value;
    // TODO: Hacher le pwd & corriger le pendant côté serveur
    console.log(val.username)
    console.log(val.pwd)

    if ((val.username && val.pwd) && (val.pwd === val.pwdConfirm)) {
      this.authService.login(val.username, val.pwd).pipe(
        takeUntil(this.destroy$)
      ).subscribe((res: any) => {
        this.commandeService.idCart = res.idCart;
        this.router.navigateByUrl('/');
        this.commandeService.agregateCarts(res.cart, res.user);
      })
    }
  }

  samePwdsValidator() : ValidatorFn {
    return group => {
       if (group.value.pwd === group.value.pwdConfirm){
         return { pwdConfirm: 'Les mots de passe ne correspondent pas.'};
       }
       return null;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
