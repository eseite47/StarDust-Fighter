var BootState = {

  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
  },

  preload: function(){
    this.load.image('logo', '../assets/img/logo.png');
  },

  create: function() {
    this.game.stage.backgroundColor = '#000000';
    this.state.start('PreloadState')
  }
}
