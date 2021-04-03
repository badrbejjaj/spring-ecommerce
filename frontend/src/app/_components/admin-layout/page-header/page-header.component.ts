import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styles: [
  ]
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() pageBreadcrumb: [] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
