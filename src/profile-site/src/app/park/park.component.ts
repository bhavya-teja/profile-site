import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
//import * as THREE from 'three';
import catDetector, { DetectedObject } from '../../cat-detector/cat-detector';
import { interval, of, Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent implements OnInit, OnDestroy{
  pollingSubscription: Subscription;
  detections = [] as Array<DetectedObject>;

  constructor() {
    catDetector.startCamera()
  }
  ngOnInit(): void {
    this.pollingSubscription = interval(5000) // Poll every 5 seconds
      .pipe(switchMap(() => {
        return of(catDetector.getCurrentDetections());
      })).subscribe((results: Array<DetectedObject>)=>{
        if (results.length > 0) {
          console.log('CURRENT STATUS : ' + results);
          this.detections = results;
        }
      })
  }
  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
  }

}
