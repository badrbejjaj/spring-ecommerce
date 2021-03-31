import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  public headerTitle = 'Shopping cart';
  public headerDescription = 'This is a modified jumbotron that occupies the entire horizontal space of its parent.';
  ngOnInit(): void {
  }

}
