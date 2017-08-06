function Invaders(x, y){
  this.x = x;
  this.y = y;
  this.r = 10;
  this.toDelete = false;
  this.xdir = 1;

  this.show = function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.r*2, this.r*2)
  };

  this.move = function(dir){
    this.x += this.xdir;
  };

  this.remove = function(){
    this.toDelete = true;
  };

  this.shiftDown = function(){
    this.xdir *= -1;
    this.y += this.r;
  }
}
