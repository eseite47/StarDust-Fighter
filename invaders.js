function Invaders(x, y){
  this.x = x;
  this.y = y;

  this.show = function(){
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, 20, 20)
  }

  this.move = function(dir){
    this.x += dir*5;
  }
}
