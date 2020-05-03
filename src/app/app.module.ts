import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { CommonModule } from "@angular/common";
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './components/header/header.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateRunComponent } from './components/create-run/create-run.component';
import { RunListComponent } from './components/run-list/run-list.component';
import { DeleteRunComponent } from './components/delete-run/delete-run.component';
import { RunEditComponent } from './components/run-edit/run-edit.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { UserChartsComponent } from './components/user-charts/user-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    HeaderComponent,
    UserDetailsComponent,
    CreateRunComponent,
    RunListComponent,
    DeleteRunComponent,
    RunEditComponent,
    UserStatsComponent,
    UserChartsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
