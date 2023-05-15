import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@app/_components/shared-components.module';

const components = [
  LayoutComponent,
  LoginComponent,
  RegisterComponent
];

const modules = [
  CommonModule,
  SharedComponentsModule,
  AccountRoutingModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules]
})
export class AccountModule { }
