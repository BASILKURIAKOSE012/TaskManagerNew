import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:HttpClient) { }
  addUser(data:any):Observable<any>{
return this._http.post<any>('http://localHost:3000/users',data)
  }
  getUser():Observable<User>{
    return this._http.get<any>('http://localHost:3000/users')
      }
}
