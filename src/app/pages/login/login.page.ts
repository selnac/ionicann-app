import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
    ) { }

  async login(formValue: {email: string; password: string;}) {
    try {
    const result = await this.fireAuth.signInWithEmailAndPassword(formValue.email, formValue.password);
    this.router.navigate(['/manage-ad']);
    } catch (error) {
    console.error(error);
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: 'There was an error logging in. Please try again.',
      buttons: ['OK']
    });
    await alert.present();
    }
    }

  ngOnInit() {
  }

}
