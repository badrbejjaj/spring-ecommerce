import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.css']
})
export class HeaderTitleComponent implements OnInit {

  @Input() headerTitle: string;
  @Input() headerDescription: string;
  @Input() textAlign = 'left';

  constructor() { }

  ngOnInit(): void {
  }

}
