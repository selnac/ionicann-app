import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ads: any[];
  headerButtons: any[];
  isLoggedIn: boolean;
  

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private navController: NavController,
    private router: Router
  ) { 
    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
  }

  ngOnInit() {
    this.getAllAds().subscribe((ads) => {
      this.ads = ads;
      console.log(this.ads);
    });
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        // User is not logged in, show login button in header
        const loginButton = {
          icon: 'person',
          handler: () => {
            this.navController.navigateForward('/login');
          }
        };
        this.headerButtons = [loginButton];
      } else {
        // User is logged in, show logout button in header
        const logoutButton = {
          icon: 'log-out',
          handler: () => {
            this.afAuth.signOut().then(() => {
              this.navController.navigateRoot('/login');
            });
          }
        };
        this.headerButtons = [logoutButton];
      }
    });
  }

  getAllAds(): Observable<any> {
    return this.db.list('/users').valueChanges().pipe(
      map((data: unknown[]) => {
        return data.reduce((ads: any[], user: any) => {
          if (user.ads) {
            return ads.concat(Object.values(user.ads));
          } else {
            return ads;
          }
        }, []);
      })
    );
  }

  goToManage(){
    this.router.navigate(['/manage-ad']);
  }
  
  



}
