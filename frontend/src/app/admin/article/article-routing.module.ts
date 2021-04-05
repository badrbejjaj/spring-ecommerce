import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path : 'new',
        component: ArticleFormComponent
      },
      {
        path : 'edit/:id',
        component: ArticleFormComponent
      },
      {
        path : 'list',
        component: ArticleListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
