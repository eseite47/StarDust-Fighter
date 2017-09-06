var PreloadState = {

  preload: function(){
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
    this.logo.anchor.setTo(0.5);

    this.load.image('background', './assets/img/space.jpg');
    this.load.spritesheet('ship', './assets/img/invaders.png', 34, 26, 2);
    this.load.image('hero', './assets/img/hero.png');

    this.load.audio('shipSound', ['./assets/audio/shipMoves.ogg', './assets/audio/shipMoves.mp3']);

    this.load.audio('heroShootSounds', ['./assets/audio/pewpew.ogg', './assets/audio/pewpew.mp3']);

    this.load.audio('heroMoveSounds', ['./assets/audio/heroChangeDirection.ogg', './assets/audio/heroChangeDirection.mp3'])
  },
  create: function(){
    this.state.start('HomeState')
  }
}
