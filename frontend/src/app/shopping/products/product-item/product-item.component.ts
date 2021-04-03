import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@app/_models';
import { AlertService } from '@app/_services';
import { ProductService } from '@app/_services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params.id;

    this.productService.getById(productId).subscribe( product => {
      this.product = product;
    },
    (error) => {
      this.router.navigate(['/not-found']);
    }
    );
  }
  addToCart(product: Product): void {}
}
