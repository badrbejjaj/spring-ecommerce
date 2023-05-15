import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { tap } from 'rxjs/operators';

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
    this.accountService.currentUser$.pipe(tap((user: User) => {
      this.user = user;
    }));
  }

  logout(): void {
    this.accountService.logout();
  }

  toggleSideNav(event): void {
    event.preventDefault();
    this.openSideNave = !this.openSideNave;
  }
}
