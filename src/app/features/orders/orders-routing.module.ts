import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  { path: '', component: OrderListComponent },
  { path: 'create', component: OrderFormComponent },
  { path: 'edit/:id', component: OrderFormComponent },
  { path: '', redirectTo: '', pathMatch: 'full' } 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
