import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-manage-ad',
  templateUrl: './manage-ad.page.html',
  styleUrls: ['./manage-ad.page.scss'],
})
export class ManageAdPage implements OnInit {

  ads: any[];

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAdsForCurrentUser().subscribe((ads) => {
      this.ads = ads;
      console.log(this.ads);
    });
  }

  getAdsForCurrentUser(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.list(`/users/${user.uid}/ads`).valueChanges();
        } else {
          return new Observable<any[]>();
        }
      })
    );
  }

  async deleteAd(adKey: string) {
    const user = this.afAuth.currentUser;
    if (user) {
      const adRef = this.db.object(`/users/${(await user).uid}/ads/${adKey}`);
      adRef.remove();
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  addAdd(){
    this.router.navigate(['/add-ad']);
  }

}
