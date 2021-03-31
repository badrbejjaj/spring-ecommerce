import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { AlertComponent } from './alert/alert.component';

const components = [
  AlertComponent,
  HeaderTitleComponent
];

const modules = [
  CommonModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components]
})
export class SharedComponentsModule { }
