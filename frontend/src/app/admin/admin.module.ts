import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ArticleModule } from './article/article.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './_layout/layout.component';


@NgModule({
  declarations: [DashboardComponent, LayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ArticleModule
  ]
})
export class AdminModule { }
