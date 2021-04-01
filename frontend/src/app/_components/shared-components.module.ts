import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';

const components = [
  AlertComponent,
  HeaderTitleComponent,
  NavbarComponent,
  ProductSearchComponent
];

const modules = [
  CommonModule,
  RouterModule
];

@NgModule({
  declarations: [...components, NavbarComponent, ProductSearchComponent],
  imports: [...modules],
  exports: [...components]
})
export class SharedComponentsModule { }
