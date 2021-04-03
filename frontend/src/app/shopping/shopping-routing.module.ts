import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { LayoutComponent } from './_layout/layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'shopping', component: ProductsListComponent },
        { path: 'shopping/cart', component: CartComponent },
        { path: 'shopping/product', component: ProductItemComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
