import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { AuthenticationGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path:"",component:LoginComponent
  },
  {
    path:"task",component:TaskComponent,canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
