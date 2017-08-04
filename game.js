var ship;
var invaders = [];
var pewpew = [];

function setup(){
  createCanvas(600,400);
  ship = new Ship();
  //pew = new Pewpew(width/2, height/2);
  for (var i = 0; i < 8; i++){
    invaders[i] = new Invaders(25+i*75, 50);
  }
}

function draw(){
  background(51);
  ship.show();
  for (var i = 0; i < pewpew.length; i++){
    pewpew[i].show();
    pewpew[i].move();
  }
  for (var i = 0; i < invaders.length; i++){
    invaders[i].show();
  }
}

function keyPressed() {
  if (key === ' '){
    var pew = new Pewpew(ship.x, height -50);
    pewpew.push(pew);
  }
  if (keyCode === RIGHT_ARROW){
    ship.move(1);
  } else if (keyCode === LEFT_ARROW){
    ship.move(-1);
  }
}
