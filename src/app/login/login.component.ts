import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginBoxComponent } from '../login-box/login-box.component';
import { SignUpBoxComponent } from '../sign-up-box/sign-up-box.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _dialog:MatDialog){

  }

  openLoginForm(){
    this._dialog.open(LoginBoxComponent)
  }
  openSignUpForm(){
    this._dialog.open(SignUpBoxComponent)
  }
}
