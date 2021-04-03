import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedComponentsModule } from '../_components/shared-components.module';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './_layout/layout.component';

const components = [
  CartComponent,
  ProductsComponent,
  ProductsListComponent,
  ProductItemComponent,
  HomeComponent,
  LayoutComponent
];

const modules = [
  CommonModule,
  ShoppingRoutingModule,
  SharedComponentsModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules]
})
export class ShoppingModule { }
