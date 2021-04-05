import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user: User;
  openSideNave = false;
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }
  logout(): void {
    this.accountService.logout();
  }
  toggleSideNav(event): void {
    event.preventDefault();
    this.openSideNave = !this.openSideNave;
  }
}
