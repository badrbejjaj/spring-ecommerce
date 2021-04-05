import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@services/index';

interface PageNotfound {
  title: string;
  statusCode: number;
}

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  isAccessDenied = 'false';
  homepageLink = '/';
  pageInfo: PageNotfound = {
    title: 'Page non trouvée',
    statusCode: 404
  };

  constructor(
    private route: ActivatedRoute,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    // get access_denied from route parameters or default to '/'
    this.isAccessDenied = this.route.snapshot.queryParams.access_denied || 'false';
    if (this.isAccessDenied === 'true') {
      this.pageInfo.title = 'Accès refusé';
      this.pageInfo.statusCode = 403;
    }
  }

}
