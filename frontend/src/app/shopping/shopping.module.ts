import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedComponentsModule } from '../_components/shared-components.module';

const components = [
  CartComponent
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
