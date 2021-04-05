import { Component } from '@angular/core';
import { User } from './_models';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  cartLenght = 3;
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout(): void {
    this.accountService.logout();
}
}
