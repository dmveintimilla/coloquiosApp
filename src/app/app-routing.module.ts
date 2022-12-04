import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfigColoquiosComponent } from './backend/config-coloquios/config-coloquios.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
  {
    path: 'add-coloquio',
    loadChildren: () => import('./pages/add-coloquio/add-coloquio.module').then( m => m.AddColoquioPageModule)
  },
  {
    path: 'detail-coloquio',
    loadChildren: () => import('./pages/detail-coloquio/detail-coloquio.module').then( m => m.DetailColoquioPageModule)
  },
  {
    path: 'managment-coloquio',
    loadChildren: () => import('./backend/managment-coloquio/managment-coloquio.module').then( m => m.ManagmentColoquioPageModule)
  },
  {
    path: 'report-coloquio',
    loadChildren: () => import('./backend/report-coloquio/report-coloquio.module').then( m => m.ReportColoquioPageModule)
  },
  {
    path: 'config-coloquio',
    component: ConfigColoquiosComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/login'
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
