function Ball() {
  this.x = random(25, width - 25);
  this.y = random(25, height - 25);
  this.xspeed = 3;
  this.yspeed = -3;
  
  this.colour = random(255);

  this.display = function() {
      noStroke();
      fill(this.colour);
      ellipse(this.x, this.y, ballSize, ballSize);
    },

  this.clicked = function(){
    var r = dist(mouseX, mouseY, this.x, this.y);
    if (d < 25) {
      //code10:00 of video 6.7
     return true;
    } else {
      return false;
    }
  }
    this.move = function() {
      this.x = this.x + this.xspeed;
      if (this.x > width - 25 || this.x < 25) {
        this.xspeed = -this.xspeed;
        osc.setType('sine');
        osc.start();
        osc.freq(440);
        osc.amp(env);
        env.play();
        //hz = random(200, 1000);
        background(0, 100);
    
      }
      this.y = this.y + this.yspeed;
      if (this.y > height - 25 || this.y < 25) {
        this.yspeed = -this.yspeed;
        osc.setType('sine');
        osc.start();
        osc.freq(880);
        osc.amp(env);
        env.play();
        //hz = random(200, 1000); add in freq(hz)
        background(255, 100);
        
      }


    }
}