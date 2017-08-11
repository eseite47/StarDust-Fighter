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
  var edgeInvaders = false;
  var edgeShip = false;

  //Keeping the ship within the bounds of the game
  if (ship.x > width || ship.x < 0){
      edgeShip = true;
  }

  if(edgeShip){
    ship.bounce();
  }

  //Creating functionalities for shooting
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

  //creating functionality for invaders
  for (var i = 0; i < invaders.length; i++){
    invaders[i].show();
    invaders[i].move();

    if (invaders[i].x > width || invaders[i].x < 0){
      edgeInvaders = true;
    }
  }

  if(edgeInvaders){
    for (var i = 0; i < invaders.length; i++){
      invaders[i].shiftDown();
      console.log('shifted down')
    }
    console.log(invaders[0].y)
    // for (var i = invaders.length+8; i >= invaders.length; i--){
    //   invaders[i] = new Invaders(25+i*75, 50);
    //   console.log('creation successful', invaders[i])
    // }
  }

  //Removing invaders when they get hit
  for (var i = pewpew.length-1; i >=0; i--){
    if (pewpew[i].toDelete){
      pewpew.splice(i, 1);
    }
  }
  for (var i = invaders.length-1; i >=0; i--){
    //console.log(invaders[i])
    if (invaders[i].toDelete){
      invaders.splice(i, 1);
    }
  }

  //Winning and losing functionalities
  // if(invaders.length = 0){
  //   invaders.youWin()
  // }
  for (var i = 0; i < invaders.length; i++){
    if(invaders[i].y > 360){
      invaders[i].youLose()
      invaders = [];
      loadImage("./img/lose.png", function(img) {
    image(img, 0, 0);
  });
    }
  }
}

//Keyboard functionalities
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

