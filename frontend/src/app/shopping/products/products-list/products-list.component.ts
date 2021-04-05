import { Component, OnInit } from '@angular/core';
import { Product } from '@app/_models';
import { ProductService } from '@app/_services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public headerTitle = 'Tous les articles';
  public headerDescription = 'This is a modified jumbotron that occupies the entire horizontal space of its parent.';
  products = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getAll().subscribe( (products) => {
      this.products = products;
    });
  }
  addToCart(): void {

  }
}
