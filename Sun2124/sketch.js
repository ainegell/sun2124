var ball = [];
var numBalls = 1;
var ballSize = 50;
var speed;
//sound
var env;
var osc;
var hz;
var delay;
// mouse
var d = 10;
var mouse;
var beat;
var fs;
var amp;
var mic;
var vol;
var a = 255; //alpha

function setup() {
  createCanvas(600, 600);
  noCursor();

  beat.play();
  beat.loop();
  beat.setVolume(0.5);

  for (var i = 0; i < numBalls; i++) {
    ball[i] = new Ball();
  }
  //sound
  osc = new p5.Oscillator();

  env = new p5.Env();
  env.setADSR(0.02, 0.01, 0.5, 0.1);
  env.setRange(0.5, 0);

  amp = new p5.Amplitude();
  
  mic = new p5.AudioIn();
   mic.start();

  delay = new p5.Delay();
  

}

function preload() {
  beat = loadSound("beatLoop.mp3");
  mouse = loadSound("mousePing.mp3");
  fs = loadSound("fullScreen.mp3");
}

function draw() {
  background(110, 110, 230, a);

  fill(123, 244, 105);
  strokeWeight(4);
  stroke(51);
  rect(0, 0, 100, 100);
  rect(0, 500, 100, 100);
  rect(500, 0, 100, 100);
  rect(500, 500, 100, 100);

  textSize(19);
  noStroke();
  fill(0);
  text("Fullscreen", 7, 50);
  textSize(16);
  text("Restart Beat", 5, 550);
  textSize(20);
  text("Delay", 525, 50);

  for (var i = 0; i < ball.length; i++) {
    ball[i].display();
    ball[i].move();

    fill(123, 222, 200, 120);
    ellipse(mouseX, mouseY, d, d);
    d = 10;

    if (ball.length > 5) {
      ball.splice(random(0, 4), random(0, 4));
    }
  }

var vol = mic.getLevel() * 500;
  console.log(vol);
  fill(120, 120, 120);
  ellipse(width/2, height/2, vol, vol);

}
function mousePressed() {

  mouse.play();

  ball.push(new Ball());
  osc = new p5.Oscillator();

  //mouse
  if (d == 10) {
    d = 40;
  } else {
    d = 10;
  }

  //this.clicked function
  for (var i = 0; i < ball.length; i++) {
    if (ball[i].clicked()) {
      ball.splice(i, 1);
    }
  }
  //fullscreen
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    var full = fullscreen();
    fullscreen(!full);
    fs.play();
    mouse.stop();
  }
  //top right
  if (mouseX > 500 && mouseX <= 600 && mouseY > 0 && mouseY < 100) {
    delay.process(osc, 0.1, 0.4);
    a = 50;
    
  }
  //bottom left
  if (mouseX > 0 && mouseX < 100 && mouseY > 500 && mouseY <= 600) {
    //restart beat
    beat.stop();
    beat.play();
    mouse.stop();
  }

  //bottom right
  //if (mouseX > 500 && mouseX <= 600 && mouseY > 500 && mouseY <= 600) {
  //var full = fullscreen();
  //fullscreen(!full);
  //}

}
