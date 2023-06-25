import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginBoxComponent } from '../login-box/login-box.component';
import { SignUpBoxComponent } from '../sign-up-box/sign-up-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dialog: MatDialog) {

  }
  ngOnInit(): void {

  }

  //to open login form
  openLoginForm() {
    this._dialog.open(LoginBoxComponent)
  }

  // To open sign up form
  openSignUpForm() {
    this._dialog.open(SignUpBoxComponent)
  }
}
