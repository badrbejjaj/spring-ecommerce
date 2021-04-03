import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout();
  }
}
