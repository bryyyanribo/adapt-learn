import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { LessonNaturalEarthquakePage } from './../lesson-natural-earthquake/lesson-natural-earthquake';
import { LessonNaturalVolcanoPage } from './../lesson-natural-volcano/lesson-natural-volcano';
import { LessonNaturalLandslidePage } from './../lesson-natural-landslide/lesson-natural-landslide';
import { LessonNaturalTsunamiPage } from './../lesson-natural-tsunami/lesson-natural-tsunami';
import { SettingsPage} from '../settings/settings';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Navbar } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lesson-natural',
  templateUrl: 'lesson-natural.html',
})
export class LessonNaturalPage {
  @ViewChild(Navbar) navBar: Navbar;
  currentUser: any;
  lessonUnlocked: any;
  lessonUnlocked2: any;
  lessonUnlocked3: any;
  lessonStatus: FirebaseObjectObservable<any>;
  arrayTest = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public af: AngularFireDatabase, public afAuth: AngularFireAuth, public scrnOrnt: ScreenOrientation) {
    this.currentUser = this.afAuth.auth.currentUser.uid;

    this.lessonStatus = this.af.object("/UserProgress/" + this.currentUser + '/', { preserveSnapshot: true });

    this.lessonStatus.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        this.arrayTest.push(snapshot.val());

      });
      console.log(this.arrayTest.length);

        if (this.arrayTest.length == 3 || this.arrayTest.length == 4) {
          this.lessonUnlocked = [{
            name: "lock",
            valid: true,
          }];
          console.log('Undefined')

      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Earthquake" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Earthquake" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }

      if (this.arrayTest.length == 3 || this.arrayTest.length == 4 || this.arrayTest.length == 5) {
        this.lessonUnlocked2 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Volcanic" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked2 = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Volcanic" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked2 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }


      if (this.arrayTest.length == 3 || this.arrayTest.length == 4 || this.arrayTest.length == 5 || this.arrayTest.length == 6) {
        this.lessonUnlocked3 = [{
          name: "lock",
          valid: true,
        }];
        console.log('Undefined')
      }

      else if (this.arrayTest !== null) {
        for (var i = 0; i < this.arrayTest.length; i++) {
          if (this.arrayTest[i].Chapter_Quiz == "Landslide" && this.arrayTest[i].Passed == true) {
            this.lessonUnlocked3 = [{
              valid: false,
            }];
            console.log('Unlocked')
          }
          else if (this.arrayTest[i].Chapter_Quiz == "Landslide" && this.arrayTest[i].Passed == false) {
            this.lessonUnlocked3 = [{
              name: "lock",
              valid: true,
            }];
            console.log('Locked')
          }
        }
      }
    });

  }



  SettingsPage(){
    this.navCtrl.push(SettingsPage)
  }

  earthquakesLesson(){
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalEarthquakePage)
    try {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    } catch (error){
      console.log (error);
    }
    loader.present();
  }

  volcanoLesson(){
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalVolcanoPage)
    try {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    } catch (error){
      console.log (error);
    }
    loader.present();
  }

  landslidesLesson(){
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalLandslidePage)
    try {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    } catch (error){
      console.log (error);
    }
    loader.present();
  }

  tsunamiLesson(){
    let loader = this.loadingCtrl.create({
      content: "Loading lesson content...",
      duration: 1500
    });
    this.navCtrl.push(LessonNaturalTsunamiPage)
    try {
      this.scrnOrnt.lock(this.scrnOrnt.ORIENTATIONS.LANDSCAPE);
    } catch (error){
      console.log (error);
    }
    loader.present();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.scrnOrnt.unlock();
    }
    console.log('ionViewDidLoad LessonNaturalPage');
  }


}
