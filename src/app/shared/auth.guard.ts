import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor( private router:Router){

  }
  canActivate()
   {
    if(sessionStorage.getItem("login")=="true"){
      return true;
    }
    else{
      this.router.navigateByUrl("");
      return false;
     
      
      
    }
  }
  
}
