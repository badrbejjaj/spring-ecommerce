import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  constructor(
    public router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      this.isAdmin = true;
    });
  }

  logout(): void {
    this.accountService.logout();
  }
}
