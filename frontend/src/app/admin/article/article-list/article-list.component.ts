import { Component, OnInit } from '@angular/core';
import { Product } from '@models/index';
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  columns = [];
  rows: Product[] = [];
  constructor() { }

  ngOnInit(): void {
    this.columns = [
      { label: '#' },
      { label: 'Referance' },
      { label: 'Designation' },
      { label: 'prix' },
      { label: 'actions' }
    ];
    for (let i = 0; i < 5 ; i++) {
      this.rows.push({
         id: i,
         reference: 'RF' + Math.floor(Math.random() * (20000 - 1000 + 1) ) + 1000,
         designation: 'product ' + i,
         price: Math.floor(Math.random() * (500 - 50 + 1) ) + 50
      });
    }

  }

  deleteProduct(productId) {

  }
}
