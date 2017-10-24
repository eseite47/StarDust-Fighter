var GameState = {

  create: function(){

    //Static
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.autoScroll(0, 30);
    this.game.world.setBounds(0, 0, 1400, 750)

    const title = game.add.text(this.game.width / 2, 50, 'STARDUST FIGHTER', {fill: '#00FF00', font: '30px Press Start 2P'})
    title.anchor.setTo(0.5, 0);
    title.visible = true;

    var style = {
      font: '20px Press Start 2P',
      fill: '#fff'
    }
    this.game.add.text( 10, 10, 'Score:', style)
    this.displayScore = this.game.add.text( 150, 10, '', style)
    this.displayScore.visible = true;

    //invaders
    this.invaders = this.game.add.group();
    this.invaders.enableBody = true;
    const invaderFrequency = 1;
    this.invaderCreator = this.game.time.events.loop(Phaser.Timer.SECOND * invaderFrequency, this.createInvader, this)

    //Hero
    this.hero = this.game.add.sprite(this.game.world.centerX, 700, 'hero')
    this.hero.customParams = {direction: 1, score: 0 }
    this.hero.anchor.setTo(0.5, 1);
    this.hero.scale.setTo(0.75)
    this.hero.inputEnabled = true;
    this.game.physics.arcade.enable(this.hero);
    this.hero.body.allowGravity = false;
    this.hero.body.collideWorldBounds = true;
    this.SPEED = 350;
    this.refreshScore()

    //lasers
    this.lasers = this.add.group();
    const spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    spaceBar.onDown.add(function(){
      this.createPew(this.hero.world.x, this.hero.world.y)
    }, this)

    //Meteors
    this.meteors = this.add.group();
    const meteorFrequency = 5;
    this.meteorCreator = this.game.time.events.loop(Phaser.Timer.SECOND * meteorFrequency, this.createMeteor, this);
  },

  update: function(){
    let self = this;
    this.game.physics.arcade.collide(this.lasers, this.invaders, this.scoreUp, function(){
      self.hero.customParams.score += 10;
      self.refreshScore();
    });

    this.game.physics.arcade.collide(this.hero, this.invaders, this.gameOver);

    this.game.physics.arcade.collide(this.hero, this.meteors, this.gameOver);

    this.game.physics.arcade.collide(this.lasers, this.meteors, this.meteorImpact);

    this.game.physics.arcade.collide(this.invaders, this.meteors, this.meteorImpact);

    this.hero.body.velocity.x = 0;
    this.hero.body.velocity.y = 0;

    if (this.cursors.left.isDown){
      this.hero.body.velocity.x = -this.SPEED;
    }
    else if (this.cursors.right.isDown){
      this.hero.body.velocity.x = this.SPEED;
    }
    else if (this.cursors.up.isDown){
      this.hero.body.velocity.y = -this.SPEED;
    }
    else if (this.cursors.down.isDown){
      this.hero.body.velocity.y = this.SPEED;
    }

    this.lasers.forEach(function(element){
      if (element.y < 100){
        element.kill();
      }
    }, this)

    this.invaders.forEach(function(element){
      if (element.y > 750){
        //this.gameOver()
        element.kill();
      }
    }, this)

    this.meteors.forEach(function(element){
      if (element.y > 750){
        element.kill();
      }
    }, this)
  },

  randomStartPoint: function(){
    return Math.floor(Math.random() * 1200) + 100;
  },

  createInvader: function(){
    const x = this.randomStartPoint()
    let invader = this.invaders.getFirstExists(false)
    if (!invader){
      invader = this.invaders.create(0, 0, 'ship');
      invader.anchor.setTo(0.5, 0);
      invader.animations.add('animate', [0, 1], 1.5, true);
      invader.play('animate')
      this.game.physics.arcade.enable(invader);
      invader.body.allowGravity = false;
    }
    invader.reset(x, 100);
    invader.body.velocity.y = 62;
  },

  createPew: function(xCoord, yCoord){
    let pew = this.lasers.getFirstExists(false)
    if (!pew){
      pew = this.lasers.create(0, 0, 'pew')
      pew.anchor.setTo(0.5, 1);
      this.game.physics.arcade.enable(pew);
      pew.body.allowGravity = false;
    }
    pew.reset(xCoord, yCoord - 75);
    pew.body.velocity.y = -300
  },

  createMeteor: function(){
    const coordX = this.randomStartPoint();
    let meteor = this.meteors.getFirstExists(false)
    if (!meteor){
      const meteorSprite = this.getMeteorSprite()
      meteor = this.meteors.create(0, 0, meteorSprite)
      meteor.anchor.setTo(0.5)
      this.game.physics.arcade.enable(meteor);
      meteor.body.allowGravity = false;
      meteor.body.immovable = true;
    }
    var meteorRotation = this.game.add.tween(meteor);
    meteorRotation.to({angle: '-3600'}, 25000)
    meteorRotation.start()
    //meteor.angle += 1;
    meteor.reset(coordX, 100);
    meteor.body.velocity.y = 30;
  },

  refreshScore: function(){
    this.displayScore.text = this.hero.customParams.score
  },

  scoreUp: function(pew, invader){
    pew.kill();
    invader.kill();
  },

  meteorImpact: function(element, meteor){
    element.kill();
  },

  gameOver: function(){
    //this.game.state.restart();
    console.log('this.state', this.state)
    game.state.start('HomeState', true, false, 'GAME OVER')
  },

  getMeteorSprite: function(){
    let randomSprite = Math.floor(Math.random() * 3)
    console.log('random sprite for meteors', randomSprite)
    if (randomSprite === 0){
      console.log('meteor 1', randomSprite)
      return 'meteor'
    }
    else if (randomSprite === 1){
      console.log('meteor 2')
      return 'meteor2'
    }
    else if (randomSprite === 2){
      console.log('meteor 3')
      return 'meteor3'
    }
    else {
      console.log('else')
      return 'meteor'
    }
  },

};
