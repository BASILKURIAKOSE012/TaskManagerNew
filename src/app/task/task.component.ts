import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../services/data.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
users!:any;
currentUserEmail!:any;
currentUserName!:any;

displayedColumns: string[] = ['id', 'title', 'description', 'status','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _userService:UsersService,private _dialog:MatDialog,private _dataService:DataService
   ,private _coreService:CoreService ){

  }

  ngOnInit(): void {
    this.getCurrentUser();
      this.getUserData();
      
     
  }

createTaskForm(){
  const dialogRef = this._dialog.open(CreateTaskComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getUserData();
      }
    },
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  getUserData(){
    this._dataService.getData().subscribe({
      next:(res:any)=>{
        this.users=res;
        console.log(this.users);
        this.users = res.filter((n:any)=>n.email==this._dataService.currentUserEmail)
       this.dataSource = new MatTableDataSource(this.users);
       this.dataSource.sort=this.sort;
       this.dataSource.paginator=this.paginator;
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  getCurrentUser(){
this.currentUserName= this._dataService.currentUserName;
this.currentUserEmail=this.currentUserEmail;
  }
  deleteUserData(id:any){
this._dataService.deleteData(id).subscribe({
  next:(res)=>{
    this._coreService.openSnackBar("task deleted successfully","done")
this.getUserData();
  },
  error:console.log
})
}
openEditForm(data: any) {
  const dialogRef = this._dialog.open(CreateTaskComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getUserData();
      }
    },
  });
}
}