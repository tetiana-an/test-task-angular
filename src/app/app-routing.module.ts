import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './pages/shop/shop.component';
import { BasketComponent } from './pages/basket/basket.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'shop' },
  { path: 'shop', component: ShopComponent },
  { path: 'basket', component: BasketComponent },
  { path: '**', redirectTo: 'shop' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
