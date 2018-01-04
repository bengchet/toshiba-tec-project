import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    private events: Events
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
  }

  login(){
    this.auth.login(this.loginForm.value).then((allowed)=>{
      if(allowed){
        this.events.publish('user:login')
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

}
