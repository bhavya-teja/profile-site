import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
//import * as THREE from 'three';
import catDetector from '../../cat-detector/cat-detector';
//import { interval, of, Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent implements OnInit, OnDestroy{
  //pollingSubscription: Subscription;

  constructor() {
    catDetector.startCamera()
  }
  ngOnInit(): void {
    // this.pollingSubscription = interval(5000) // Poll every 5 seconds
    //   .pipe(switchMap(() => {
    //     navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream)=>{
    //       if (this.videoElement) {
    //         this.videoElement.srcObject = mediaStream;
    //       }
    //       else{
    //         this.videoElement = document.createElement('video') as HTMLVideoElement;
    //         this.videoElement.srcObject = mediaStream;
    //       }
    //     });
    //     if (this.videoElement?.readyState === 4) {
    //       catDetector.detect(this.videoElement);
    //       of(true);
    //     }
    //     else{
    //       console.log(this.videoElement);
    //     }
    //     return of(false);
    //   })).subscribe((result:boolean)=>{
    //     console.log('CURRENT STATUS : ' + result);
    //   })
  }
  ngOnDestroy(): void {
    //this.pollingSubscription.unsubscribe();
  }

}
