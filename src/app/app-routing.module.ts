import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-ad',
    loadChildren: () => import('./pages/add-ad/add-ad.module').then( m => m.AddAdPageModule)
  },
  {
    path: 'manage-ad',
    loadChildren: () => import('./pages/manage-ad/manage-ad.module').then( m => m.ManageAdPageModule)
  },
  {
    path: 'detail-ad',
    loadChildren: () => import('./pages/detail-ad/detail-ad.module').then( m => m.DetailAdPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
