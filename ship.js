function Ship(){
  this.x = width/2;
  this.xdir = 0;

  this.show = function(){
    fill(0,255,0);
    rectMode(CENTER);
    rect(this.x, height-20, 20, 20)
    //img = loadImage("assets/moonwalk.jpg");
  }

  this.setDir= function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir){
      this.x += this.xdir*5;
  }

  this.bounce = function(){
    this.xdir = 0;
  }
}
