import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { CoreService } from '../core/core.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit{
loginForm!:FormGroup;
users!:any;
email!:any;
password!:any;
currentUser!:any;

constructor(private _fb:FormBuilder,private _userService:UsersService ,private _router:Router,private _dialog:MatDialog
  ,private _dataservice:DataService ,private _coreService:CoreService){
  this.loginForm= this._fb.group({
    email:['', [Validators.required]],
    password:['', [Validators.required]]
  })
}
ngOnInit(): void {
  this.getUserData();
}
onFormSubmit(){
  if(this.loginForm.valid){

this.email=this.loginForm.value.email ||"";
this.password=this.loginForm.value.password ||"";
console.log(this.users);

 this.currentUser=this.users.filter((n:any)=>n.email==this.email)

 console.log(typeof(this.currentUser));
 if(this.currentUser.length!=0){
if(this.currentUser[0].password==this.password ){
  this._coreService.openSnackBar("login successfully","done")
this._dataservice.currentUserEmail= this.email;
this._dataservice.currentUserName=this.currentUser[0].firstName;
this._dialog.closeAll()
this._router.navigateByUrl("task");
}
else{
  this._coreService.openSnackBar("invalid Credentials","done")
  
}
  }else{
    this._coreService.openSnackBar("invalid Credentials","done")
    
  }
  }
  else{
    this._coreService.openSnackBar("Please enter your details","done")
  }
}
getUserData(){
  this._userService.getUser().subscribe({
    next:(res)=>{
      this.users=res;
      

    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

}
