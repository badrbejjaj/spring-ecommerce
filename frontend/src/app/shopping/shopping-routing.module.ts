import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'cart', component: CartComponent },
        { path: 'products', component: ProductsListComponent },
        { path: 'product', component: ProductItemComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
