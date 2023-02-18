import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.page.html',
  styleUrls: ['./add-ad.page.scss'],
})
export class AddAdPage implements OnInit {

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  async addAd(formValue: {name: string; description: string; price: string; pictureUrl: string;}) {
    const user = await this.fireAuth.currentUser;
    if (user) {
    const adRef = this.db.list(`/users/${user.uid}/ads`);
    await adRef.push({ name: formValue.name, description: formValue.description, price: formValue.price, pictureUrl: formValue.pictureUrl });
    this.router.navigate(['/manage-ad']);
    }
  }

  ngOnInit() {
  }

}
