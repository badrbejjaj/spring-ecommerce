import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <!-- nav -->
    <app-navbar></app-navbar>
    <!-- main app container -->
    <div class="app-container">
      <app-alert></app-alert>
      <router-outlet></router-outlet>
    </div>
  `
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
