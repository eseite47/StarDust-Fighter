function Pewpew(x, y){
  this.x = x;
  this.y = y;
  this.r = 5;
  this.toDelete = false;

  this.show = function(){
    noStroke();
    fill(0,255,0);
    rectMode(CENTER);
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }

  this.move = function(){
    this.y = this.y -5;
  }

  this.hits = function(invaders){
    var distance = dist(this.x, this.y, invaders.x, invaders.y);
    if (distance < this.r + invaders.r){
      return true;
    }
    return false;
  }

  this.remove = function(){
    this.toDelete = true;
  }
}
