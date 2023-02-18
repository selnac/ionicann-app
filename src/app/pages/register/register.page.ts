import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private alertController: AlertController
    ) { }

  async register(formValue: { email: string; password: string; name: any; familyName: any; phoneNumber: any; }) {
    console.log(formValue)
    try {
      const result = await this.fireAuth.createUserWithEmailAndPassword(formValue.email, formValue.password);
      const user = result.user;
      const userData = {
        name: formValue.name,
        familyName: formValue.familyName,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        uid: user.uid
      };
      this.db.object(`/users/${user.uid}`).set(userData);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      const alert = await this.alertController.create({
        header: 'Register Error',
        message: 'There was a register logging in. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
