import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { TaskComponent } from '../task/task.component';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
taskForm!:FormGroup;
currentUserEmail!:any;
constructor(private _fb:FormBuilder,private _dataService:DataService,private _dialogRef:MatDialogRef<TaskComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _coreService:CoreService){
  this.taskForm= this._fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    status:['', [Validators.required]],
    email: ""
  })
}
ngOnInit(): void {
  this.currentUserEmail=this._dataService.currentUserEmail;
  console.log(this.currentUserEmail);
  this.taskForm.patchValue(this.data);
 
  
}
onFormSubmit(){
  if(this.taskForm.valid){
    if(this.data){
      this.taskForm.value.email= this.currentUserEmail;
      this._dataService.updateData(this.data.id,this.taskForm.value).subscribe({
        next:(res)=>{
    
          this._coreService.openSnackBar("data updated successfully","done")
   
    this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    else{
        this.taskForm.value.email= this.currentUserEmail;
  this._dataService.addData(this.taskForm.value).subscribe({
    next:(res)=>{
      this._coreService.openSnackBar("data added successfully","done")
this._dialogRef.close(true);
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
    }

}
}
}
