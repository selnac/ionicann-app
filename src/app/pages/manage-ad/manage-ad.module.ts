import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAdPageRoutingModule } from './manage-ad-routing.module';

import { ManageAdPage } from './manage-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAdPageRoutingModule
  ],
  declarations: [ManageAdPage]
})
export class ManageAdPageModule {}
