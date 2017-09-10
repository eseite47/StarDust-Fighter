var PreloadState = {

  preload: function(){
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
    this.logo.anchor.setTo(0.5);

    this.load.image('background', './assets/img/starfield.png');
    this.load.spritesheet('ship', './assets/img/invaders.png', 34, 26, 2);
    this.load.image('hero', './assets/img/hero2c.png', 72, 72, 4);
    this.load.image('pew', './assets/img/beams.png')
    this.load.image('meteor', './assets/img/meteor.png')
    this.load.image('meteor2', './assets/img/meteor2.png')
    this.load.image('meteor3', './assets/img/meteor3.png')
    this.load.audio('shipSound', ['./assets/audio/shipMoves.ogg', './assets/audio/shipMoves.mp3']);
    this.load.audio('heroShootSounds', ['./assets/audio/pewpew.ogg', './assets/audio/pewpew.mp3']);
    this.load.audio('heroMoveSounds', ['./assets/audio/heroChangeDirection.ogg', './assets/audio/heroChangeDirection.mp3'])
  },
  create: function(){
    setTimeout(this.state.start('HomeState', 5000))
  }
}
