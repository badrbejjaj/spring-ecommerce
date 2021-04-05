import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';
import { PageHeaderComponent } from './admin-layout/page-header/page-header.component';
import { SideNaveComponent } from './admin-layout/side-nave/side-nave.component';

const components = [
  AlertComponent,
  HeaderTitleComponent,
  NavbarComponent,
  ProductSearchComponent,
  NavbarComponent,
  ProductSearchComponent,
  PageHeaderComponent,
  SideNaveComponent
];

const modules = [
  CommonModule,
  RouterModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components]
})
export class SharedComponentsModule { }
