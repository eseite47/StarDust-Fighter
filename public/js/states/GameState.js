var GameState = {

  create: function(){

    //Static
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.background = this.game.add.sprite(0, 0, 'background');
    this.game.world.setBounds(0, 0, 1400, 750)

    const title = game.add.text(this.game.width/2, 40, 'SPACE INVADERS', {fill: '#00FF00', font: '30px Press Start 2P'})
    title.anchor.setTo(0.5, 0);
    title.visible = true;

    var style = {
      font: '20px Press Start 2P',
      fill: '#fff'
    }
    this.game.add.text( 10, 10, 'Score:', style)
    this.publicScore = this.game.add.text( 150, 10, '', style)
    this.publicScore.visible = true;

    //Invaders
    // var invadersData = [
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'},
    //   {Key: 'ship', audio: 'shipSound'}
    // ]

    let self = this;

    this.invaders = this.game.add.group();
    this.invaders.enableBody = true;
    const invaderFrequency = 2;
    this.invaderCreator = this.game.time.events.loop(Phaser.Timer.SECOND * invaderFrequency, this.createInvader, this)

    // invadersData.forEach((element, index) => {
    //   invader = self.invaders.create(70 + index * 100, 100, 'ship');
    //   invader.anchor.setTo(0.5, 0);
    //   invader.animations.add('animate', [0, 1], 1.5, true);
    //   invader.play('animate')
    //   invader.customParams = {sound: self.game.add.audio('shipSound'), points: 10};
    //   this.game.physics.arcade.enable(invader);
    // })

    //Hero
    this.hero = this.game.add.sprite(this.game.world.centerX, 700, 'hero')
    this.hero.customParams = {direction: 1, score: 0 }
    this.hero.anchor.setTo(0.5, 1);
    this.hero.scale.setTo(0.75)
    this.hero.inputEnabled = true;
    //this.hero.input.enableDrag();
    this.game.physics.arcade.enable(this.hero);
    this.hero.body.allowGravity = false;
    this.hero.body.collideWorldBounds = true;
    this.SPEED = 250;


    this.lasers = this.add.group();
    // this.pew = this.game.add.sprite(this.game.world.centerX, 370, 'pew')
    //this.pew.anchor.setTo(0.5, 1);
    // this.pew.inputEnabled = true;
    // this.pew.input.enableDrag();
    // this.game.physics.arcade.enable(this.pew);
    // this.pew.body.allowGravity = false;
  },

  update: function(){
    this.game.physics.arcade.collide(this.lasers, this.invaders, this.scoreUp);

    this.game.physics.arcade.collide(this.hero, this.invaders, this.gameOver);

    this.hero.body.velocity.x = 0;
    this.hero.body.velocity.y = 0;

    const spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    spaceBar.onDown.add(function(){
      this.createPew(this.hero.world.x, this.hero.world.y)
    }, this)

    if(this.cursors.left.isDown){
      this.hero.body.velocity.x = -this.SPEED;
    }
    else if (this.cursors.right.isDown){
      this.hero.body.velocity.x = this.SPEED;
    }
    else if (this.cursors.up.isDown){
      //this.hero.body.velocity.y = -this.SPEED;
      this.createPew(this.hero.world.x, this.hero.world.y)
    }
    // else if (this.cursors.down.isDown){
    //   this.hero.body.velocity.y = this.SPEED;
    // }

    this.lasers.forEach(function(element){
      if (element.y <100){
        element.kill();
      }
    }, this)
  },

  randomX: function(){
    return Math.floor(Math.random()*1000) +100;
  },

  createInvader: function(){
    const x = this.randomX()
    let invader = this.invaders.getFirstExists(false)
    if (!invader){
      invader = this.invaders.create(0, 0, 'ship');
      invader.anchor.setTo(0.5, 0);
      invader.animations.add('animate', [0, 1], 1.5, true);
      invader.play('animate')
      // invader.customParams = {sound: self.game.add.audio('shipSound'), points: 10};
      this.game.physics.arcade.enable(invader);
    }
    invader.reset(x, 100);
  },

  createPew: function(xCoord, yCoord){
    let pew = this.lasers.getFirstExists(false)
    if(!pew){
      pew = this.lasers.create(0, 0, 'pew')
      pew.anchor.setTo(0.5, 1);
      //pew.inputEnabled = true;
      //pew.input.enableDrag();
      game.physics.arcade.enable(pew);
      //pew.body.allowGravity = false;
    }
    pew.reset(xCoord, yCoord -75);
    pew.body.velocity.y = -100
  },

  refreshScore: function(){
    this.publicScore.text = this.hero.customParams.score
  },

  scoreUp: function(pew, invader){
    //this.hero.customParams.score += 10;
    pew.kill()
    invader.kill()
  },

  gameOver: function(hero, invader){
    //this.game.state.restart();
    console.log('this.state', this.state)
    game.state.start('HomeState', true, false, 'GAME OVER')
  }

};
