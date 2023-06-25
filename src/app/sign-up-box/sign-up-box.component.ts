import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { CoreService } from '../core/core.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-box',
  templateUrl: './sign-up-box.component.html',
  styleUrls: ['./sign-up-box.component.css']
})
export class SignUpBoxComponent {
registerForm:FormGroup;
user:any;
checkEmail!:any;
constructor(private _fb:FormBuilder,private _userService:UsersService,private _coreService:CoreService,private _dialog:MatDialog){
this.registerForm= this._fb.group({
  firstName:['', [Validators.required]],
  lastName:['', [Validators.required]],
  email:['', [Validators.required]],
  password:['', [Validators.required]]
})
}
onFormSubmit(){
  if(this.registerForm.valid){
    console.log(this.registerForm.value);
this.dummy();
this.checkEmail= this.user.filter((n:any)=>n).map((n:any)=>n.email);
if(this.checkEmail.includes(this.registerForm.value.email ||""))
{
  this._coreService.openSnackBar("user already exists","done")

  
}
else{
  this._userService.addUser(this.registerForm.value).subscribe({
    next:(res)=>{

      this._coreService.openSnackBar("user added successfully","done")
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
}  else{
  this._coreService.openSnackBar("please enter valid details","done")
}  
}
dummy(){
  this._userService.getUser().subscribe({
    next:(res)=>{
      this.user=res;
      console.log(this.user.filter((n:any)=>n.firstName));

    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
cancel(){
  this._dialog.closeAll()
}
}
