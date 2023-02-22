import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {CommandsService} from "../../shared/services/commands/commands.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import Validation from "../../utils/validation";

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
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      pwd: ['',[
        Validators.required,
        Validators.minLength(6),
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
    console.log("controles ok")
  }


  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
