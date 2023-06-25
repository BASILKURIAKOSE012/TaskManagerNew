import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { CoreService } from '../core/core.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { LoginBoxComponent } from '../login-box/login-box.component';

@Component({
  selector: 'app-sign-up-box',
  templateUrl: './sign-up-box.component.html',
  styleUrls: ['./sign-up-box.component.css']
})
export class SignUpBoxComponent implements OnInit {
  registerForm: FormGroup;
  user: any;
  checkEmail!: any;
  constructor(private _fb: FormBuilder, private _userService: UsersService, private _coreService: CoreService, private _dialog: MatDialog, private _dialogRef: MatDialogRef<LoginComponent>) {
    this.registerForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.getUserData();
  }

  // to validate register form

  onFormSubmit() {
    if (this.registerForm.valid) {
      this.checkEmail = this.user.filter((n: any) => n).map((n: any) => n.email);
      if (this.checkEmail.includes(this.registerForm.value.email || "")) {
        this._coreService.openSnackBar("user already exists", "done")


      }
      else {
        this._userService.addUser(this.registerForm.value).subscribe({
          next: (res) => {

            this._coreService.openSnackBar("user added successfully", "done")
            this._dialog.closeAll()
            this._dialog.open(LoginBoxComponent)
          },
          error: (err: any) => {
          }
        })
      }
    } else {
      this._coreService.openSnackBar("please enter valid details", "done")
    }
  }

  // to get available user data

  getUserData() {
    this._userService.getUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err: any) => {
      }
    })
  }

  // to cancel the sign up box

  cancel() {
    this._dialog.closeAll()
  }
}
