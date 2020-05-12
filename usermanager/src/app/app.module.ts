import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginComponent } from './login/login.component';
import { GroupManagementComponent } from './group-management/group-management.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    LoginComponent,
    GroupManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
