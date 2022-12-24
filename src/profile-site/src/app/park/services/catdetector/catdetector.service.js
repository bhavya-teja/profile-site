import { Injectable } from '@angular/core';
import * as ml5 from 'ml5';
const detector = ml5.objectDetector('tiny-yolo-v2');

@Injectable()
export default function CatDetectorService(cameraFeed){
    // Service implementation goes here
    
};

function processCameraFeed(cameraFeed) {
    // Processing code goes here

  }
function detectCats(videoCapture){
    // Set up a loop to capture frames from the camera
    while (true) {
        // Capture the frame
        const frame = videoCapture.read();
    
        // Check if the frame was successfully captured
        if (frame.empty) {
        console.error('Failed to capture frame');
        break;
        }
    
        // Use the detector to detect objects in the frame
        detector.detect(frame, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }
    
        // Check if any cats were detected
        const cats = results.filter(result => result.label === 'cat');
        if (cats.length > 0) {
            console.log('Cat detected!');
        }
        });
    }
}
