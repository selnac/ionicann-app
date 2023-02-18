import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAdPage } from './manage-ad.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAdPageRoutingModule {}
