function Pewpew(x, y){
  this.x = x;
  this.y = y;

  this.show = function(){
    noStroke();
    fill(0,128,0);
    rectMode(CENTER);
    ellipse(this.x, this.y, 10, 10)
  }

  this.move = function(){
    this.y = this.y -5;
  }
}
