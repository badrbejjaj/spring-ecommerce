import { Component, OnInit } from '@angular/core';
import { User } from '@models/';
import { AccountService } from '@services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  user: User;
  public headerTitle = 'Bienvenu sur Spring Shop';
  public headerDescription = 'This is a modified jumbotron that occupies the entire horizontal space of its parent.';
  constructor(private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }
}
