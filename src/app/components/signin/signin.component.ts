import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import Validation from "../../shared/utils/validation";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  signinForm!: FormGroup;
  submitted: boolean = false;
  destroy$ : Subject<boolean> = new Subject<boolean>()

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private commandeService: CommandsService) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      pwd: ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]],
      pwdConfirm: ['', Validators.required]
    },
    { validators: [ Validation.match('pwd', 'pwdConfirm')]});
  }

  get f(): {[key: string]: AbstractControl} {
    return this.signinForm.controls;
  }
  onSignin(): void {
    this.submitted = true;
    const val = this.signinForm.value;
    if(this.signinForm.invalid)
      return;
    this.authService.signin(val.username, val.pwd).pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: any) => {
      this.commandeService.idCart = res.idCart;
      this.router.navigateByUrl('/');
      this.commandeService.agregateCarts(res.cart, res.user);
    });
  }


  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
