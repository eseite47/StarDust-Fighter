var ship;
var invaders = [];
var pewpew = [];

function setup(){
  createCanvas(600,400);
  ship = new Ship();
  for (var i = 0; i < 8; i++){
    invaders[i] = new Invaders(25+i*75, 50);
  }
}

function draw(){
  background(00);
  ship.show();
  ship.move();

  for (var i = 0; i < pewpew.length; i++){
    pewpew[i].show();
    pewpew[i].move();
    for (var j = 0; j < invaders.length; j++){
      if (pewpew[i].hits(invaders[j])){
        invaders[j].remove();
        pewpew[i].remove();
      }
    }
  }

  var edge = false;

  for (var i = 0; i < invaders.length; i++){
    invaders[i].show();
    invaders[i].move();

    if (invaders[i].x > width || invaders[i].x < 0){
      edge = true;
    }
  }

  if(edge){
    for (var i = 0; i < invaders.length; i++){
      invaders[i].shiftDown();
    }
  }

  for (var i = pewpew.length-1; i >=0; i--){
    if (pewpew[i].toDelete){
      pewpew.splice(i, 1);
    }
  }

  for (var i = invaders.length-1; i >=0; i--){
    if (invaders[i].toDelete){
      invaders.splice(i, 1);
    }
  }
}

function keyReleased(){
  if (key != ' '){
    ship.setDir(0);
  }
}


function keyPressed() {
  if (key === ' '){
    var pew = new Pewpew(ship.x, height -50);
    pewpew.push(pew);
  }
  if (keyCode === RIGHT_ARROW){
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW){
    ship.setDir(-1);
  }
}

