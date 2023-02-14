import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {tap} from "rxjs";
import {CommandsService} from "../../shared/services/commands/commands.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router, private commandeServuce: CommandsService) {

    this.form = this.fb.group({
      username: ['',Validators.required],
      pwd: ['',Validators.required]
    });
  }
  login() {
    const val = this.form.value;
    // TODO: Hacher le pwd & corriger le pendant côté serveur
    console.log(val.username)
    console.log(val.pwd)

    if (val.username && val.pwd) {
      this.authService.login(val.username, val.pwd).pipe(
        tap((res: any) => {
          this.commandeServuce.idCart = res.idCart;
          this.router.navigateByUrl('/');
        })
      ).subscribe()
    }
  }
  ngOnInit(): void {
  }

}
