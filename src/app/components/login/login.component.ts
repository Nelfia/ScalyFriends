import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const { username, pwd } = this.form.value;
    const val = this.form.value;

    if (username && pwd) {
      this.authService.login(username, pwd).subscribe((user: any) => {
        console.log("User is logged in");
        console.log(user);
        this.router.navigateByUrl('/');
      })
    }
  }

}
