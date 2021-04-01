import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public headerTitle = 'Tous les articles';
  public headerDescription = 'This is a modified jumbotron that occupies the entire horizontal space of its parent.';
  constructor() { }

  ngOnInit(): void {
  }

}
