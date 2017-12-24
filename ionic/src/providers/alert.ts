import { Loading, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AlertProvider {

  alert: any;
  alertCallback: any;
  loading: Loading;
  loadingCallback: any;
  loadingTimeout: any;
  toast: any;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
  }

  dismissAll() {
    this.dismissAlert();
    this.dismissToast();
    //this.dismissLoading();
  }

  showAlert(title, message, buttons?, inputs?, mode?, cb?) {
    // dismiss any existing alerts
    this.dismissAlert();

    let _buttons = [];
    if (buttons) {
      _buttons = buttons;
    }
    else {
      _buttons = [{
        text: 'OK',
        handler: () => { }
      }]
    }

    this.alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: _buttons,
      inputs: inputs ? inputs : [],
      mode: mode? mode: null
    })

    if(cb) this.alertCallback = cb;

    this.alert.onDidDismiss(() => {
      this.alert = null;
      if (this.alertCallback) {
        this.alertCallback();
        this.alertCallback = null;
      }
    })

    this.alert.present();
  }

  dismissAlert() {
    if (this.alert) {
      this.alert.dismiss();
    }
  }

  showToast(message, duration, showCloseBtn) {
    this.dismissToast();

    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: showCloseBtn,
      position: 'bottom',
      closeButtonText: 'Close'
    });

    this.toast.onDidDismiss(() => {
      this.toast = null;
    });

    this.toast.present();
  }

  dismissToast() {
    if (this.toast)
      this.toast.dismiss()
  }

  showLoading(action?, content?) {
    if (action)
      this.loadingCallback = action;
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        cssClass: 'loginLoading',
        content: content ? content : null
      });

      this.loading.onDidDismiss((status) => {
        this.loading = null;
        if (this.loadingCallback) {
          if (status != null) this.loadingCallback(status)
          else this.loadingCallback()
        }
        this.loadingCallback = null;
      })
      this.loading.present();
      this.loadingTimeout = setTimeout(() => {
        if (this.loading) {
          // clear all callback actions first
          this.loadingCallback = () => {
            this.showToast('Not responding', 3000, true);
          };
          this.dismissLoading();
          this.loadingTimeout = null;
        }
      }, 30000);
    }
  }

  dismissLoading(status?) {
    if (this.loading) {
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
        this.loadingTimeout = null;
      }
      if (status != null)
        this.loading.dismiss(status)
      else
        this.loading.dismiss()
    }

  }
}
