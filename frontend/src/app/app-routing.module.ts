import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from '@helpers/index';
import { AuthAdminGuard } from './_helpers/auth-admin.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: '',
    loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
