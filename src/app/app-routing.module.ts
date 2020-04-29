import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateRunComponent } from './components/create-run/create-run.component';
import { DeleteRunComponent } from './components/delete-run/delete-run.component';
import { RunEditComponent } from './components/run-edit/run-edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users-list' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'users-list', component: UserListComponent },
  { path: 'user-details/:id', component: UserDetailsComponent},
  { path: 'create-run', component: CreateRunComponent},
  { path: 'create-run/:id', component: CreateRunComponent},
  { path: 'delete-run/:user/:id', component: DeleteRunComponent},
  { path: 'edit-run/:user/:id', component: RunEditComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
