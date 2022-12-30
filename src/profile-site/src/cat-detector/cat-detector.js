const { state } = require("@angular/animations");

let status = [];
let objects = [];
let video = document.querySelector('videoElement');
let canvas = document.querySelector('canvas');
let objectDetector = ml5.objectDetector('cocossd',{}, () => {
  console.log('cocossd model is loaded!!!');
})
let ctx;
let width = 480;
let height = 360;

async function make() {
    video = await getVideo();
    objectDetector = await ml5.objectDetector('cocossd', startDetecting)
    //canvas = createCanvas(width, height);
    //ctx = canvas.getContext('2d');
}

function startDetecting(){
  detect();
}

// Helper Functions
async function getVideo(){
  const videoElement = document.createElement('video');
  videoElement.setAttribute("style", "display: none;"); 
  videoElement.width = width;
  videoElement.height = height;
  document.body.appendChild(videoElement);

  const capture = await navigator.mediaDevices.getUserMedia({ video: true })
  videoElement.srcObject = capture;
  videoElement.play();

  return videoElement
}

function detect() {
  objectDetector.detect(video, function(err, results) {
    if(err){
      console.log(err);
      return
    }
    objects = results;

    if(objects){
      console.log(objects);
      if (objects) {
        status = objects;
        objects.forEach(object => {
          if (object.label === 'cat') {
                alert('Cat(s) Spotted!!');
            }
          }
        );
      }
      //draw();
      //drawObjects(objects);
    }
    detect();
  });
}

function draw(){
  // Clear part of the canvas
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0, width, height);

  ctx.drawImage(video, 0, 0);
  for (let i = 0; i < objects.length; i++) {
    
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16); 

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  }
}

function createCanvas(w, h){
  const canvas = document.createElement("canvas"); 
  canvas.width  = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}

const drawObjects = (objects) =>{
  // Clear the canvas
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  // Draw a rectangle around each object
  objects.forEach((object) => {
    canvas.getContext('2d').strokeRect(object.x, object.y, object.width, object.height);
  });
}

// exports
const startCamera = () => {
  make().then(()=>{
    startDetecting();
  });
}

const getCurrentDetections = () => {
  if (status) {
    return status;
  }
  return []
}

module.exports = {
  startCamera,
  getCurrentDetections
};
