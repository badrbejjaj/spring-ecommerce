import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  LayoutComponent,
  LoginComponent,
  RegisterComponent
];

const modules = [
  CommonModule,
  AccountRoutingModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules]
})
export class AccountModule { }
