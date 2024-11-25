import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/components/login-component/login.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent }, // Lazy-loaded LoginModule
  { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule), canActivate: [AuthGuard] },
  { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: '**', redirectTo: '/login' }, // Wildcard route redirects to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
