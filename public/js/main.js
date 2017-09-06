var game = new Phaser.Game(1400, 750, Phaser.AUTO);

var GameState = {
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
  },

  preload: function(){
    this.load.image('background', './assets/img/space.jpg');
    this.load.spritesheet('ship', './assets/img/invaders.png', 34, 26, 2);
    this.load.image('hero', './assets/img/hero.png');

    this.load.audio('shipSound', ['./assets/audio/shipMoves.ogg', './assets/audio/shipMoves.mp3']);

    this.load.audio('heroShootSounds', ['./assets/audio/pewpew.ogg', './assets/audio/pewpew.mp3']);

    this.load.audio('heroMoveSounds', ['./assets/audio/heroChangeDirection.ogg', './assets/audio/heroChangeDirection.mp3'])
  },
  create: function(){

    this.background = this.game.add.sprite(0, 0, 'background');

    const title = game.add.text(this.game.width/2, 20, 'SPACE INVADERS', {fill: '#00FF00', font: '30px Press Start 2P'})
    title.anchor.setTo(0.5, 0);
    title.visible = true;

    var invadersData = [
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'},
      {Key: 'ship', audio: 'shipSound'}
    ]

    this.invaders = this.game.add.group();

    let self = this;
    let invader;

    invadersData.forEach((element, index) => {
      invader = self.invaders.create(50 + index * 90, 70, 'ship');
      invader.anchor.setTo(0.5, 0);
      invader.inputEnabled = true;
      invader.events.onInputDown.add(self.animateInvader, self)
      invader.animations.add('animate', [0, 1], 1.5, true);
      invader.customParams = {sound: self.game.add.audio('shipSound'), points: 10};
    })


    this.hero = this.game.add.sprite(this.game.world.centerX, 440, 'hero')
    this.hero.customParams = {direction: 1, score: 0 }
    this.hero.anchor.setTo(0.5, 1);
    this.hero.inputEnabled = true;
    this.hero.input.enableDrag();
    //this.hero.events.onInputDown.add(this.move, this)
  },

  update: function(){
  },

  animateInvader: (sprite, event) => {
    sprite.play('animate')
    //sprite.customParams.sound.play();
    //sprite.alpha = 0.4;
    if (this.isMoving){
      return false
    }
    this.isMoving = true;

    let currentInvader = sprite
    console.log('this', currentInvader)
    let newInvaderMovement = this.game.add.tween(currentInvader)
    newInvaderMovement.to({y: sprite.world.y+45}, 1000)
    newInvaderMovement.onComplete.add(() => this.isMoving = false)
    newInvaderMovement.start()
    console.log('this', sprite.world.y)

  }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
