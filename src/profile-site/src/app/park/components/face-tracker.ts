import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs'
import * as blazeface from '@tensorflow-models/blazeface';

@Component({})
export class FaceTracker implements OnInit {
    angle1 = 0;
    angle2 = 0;
    distance = 0;
    step = 1;
    video = {};
    width = 0;
    height = 0;

    constructor(container: any) {
        this.angle1 = 0;
        this.angle2 = 0;
        this.distance = 0;
        this.step = 1;
    }
    ngOnInit(): void{
        tf.setBackend('webgl').then(()=>{
            if (BLAZE) {
                //model = await blazeface.load();
            } else {
                // model = await faceLandmarksDetection.load(
                //     faceLandmarksDetection.SupportedPackages.mediapipeFacemesh, {
                //         shouldLoadIrisModel: (distanceMethod > 0),
                //         maxFaces: 1
                //     });
            }
            canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        });
        
        
        //this.video.addEventListener('click', this.locateFace);
    }

    async getCameraParameters(outputWidth: any, outputHeight: any) {
        let context = canvas.getContext('2d');
        //context.drawImage(video, 0, 0, width, height);
        // const result = await getLocation(context, width, height);
        // if (result !== null) {
        //     const [angle1, angle2, distance] = result;
        //     this.angle1 = angle1;
        //     this.angle2 = angle2;
        //     this.distance = (1 - SMOOTHING) * distance + SMOOTHING * this.distance;
        //     if (this.step <= 10) {
        //         this.distance = this.distance / (1 - Math.pow(SMOOTHING, this.step))
        //     }
        //     this.step = this.step + 1;
        // } else {
        //     return null;
        // }
        let d = this.distance;
        const tan1 = -Math.tan(this.angle1);
        const tan2 = -Math.tan(this.angle2);
        const z = Math.sqrt(d * d / (1 + tan1 * tan1 + tan2 * tan2))
        const cameraPosition = [z * tan1, z * tan2, z];
        const fov = 180 / Math.PI * 2 * Math.atan(HALF_DIAGONAL / d);
        return [cameraPosition, fov];
    }
}