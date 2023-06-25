import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
currentUserEmail!:any;
currentUserName!:any;
  constructor(private _http:HttpClient) { }
  addData(data:any):Observable<any>{
    return this._http.post<any>('http://localHost:3000/tasks',data)
      }

getData():Observable<any>{
        return this._http.get<any>('http://localHost:3000/tasks')
          }
 deleteData(id: number): Observable<any> {
            return this._http.delete(`http://localhost:3000/tasks/${id}`);
          }
updateData(id: number, data: any): Observable<any> {
            return this._http.put(`http://localhost:3000/tasks/${id}`, data);
          }
}
