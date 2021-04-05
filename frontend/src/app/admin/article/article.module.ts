import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { SharedComponentsModule } from '@app/_components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  ArticleListComponent,
  ArticleFormComponent
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class ArticleModule { }
