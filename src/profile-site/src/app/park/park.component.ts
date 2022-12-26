import { Component } from '@angular/core';
import * as THREE from 'three';
//import CatDetectorService from '../park/services/catdetector/catdetector.service';


@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent {
  private cameraFeed: MediaStream;

  constructor() {}

}
