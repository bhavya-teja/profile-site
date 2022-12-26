import ml5 from 'ml5';

const cocoSSD = ml5.objectDetector('cocossd', modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!');
}

const webcam = document.getElementById('videoElement');
cocoSSD.detect(webcam, gotResult);

function gotResult(err, results) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(results);
}

function startCamera() {
  console.log('someting something');
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(mediaStream) {
        // Get the video element
        var videoElement = document.getElementById('videoElement');
  
        // Set the source of the video element to the MediaStream
        if ("srcObject" in videoElement) {
          videoElement.srcObject = mediaStream;
        } else {
          // For older versions of Chrome
          videoElement.src = window.URL.createObjectURL(mediaStream);
        }
  
        // Play the video
        videoElement.play();
      })
      .catch(function(error) {
        console.log("There was an error accessing the camera:", error);
      });
  }
  
module.exports = {
  startCamera
};