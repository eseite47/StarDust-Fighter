var HomeState = {

  init: function(message){
    this.message = message;
  },

  create: function(){
      // const background = this.game.add.sprite(0,0, 'background');
      const spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      spaceBar.onDown.add(function(){
        this.state.start('GameState')
      }, this)

      this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
      this.logo.anchor.setTo(0.5);

      const style = {
        fill: '#00FF00',
        font: '30px Press Start 2P'
      }

      const messageStyle = {
        fill: '#FFFFFF',
        font: '50px Press Start 2P'
      }

      const title = game.add.text(this.game.width/2, 20, 'SPACE INVADERS', style)
      title.anchor.setTo(0.5, 0);
      title.visible = true;

      const pressToStart = game.add.text(this.game.width/2, this.game.height/1.3, 'PRESS SPACE TO START', style)
      pressToStart.anchor.setTo(0.5, 0);
      pressToStart.visible = true;

      if(this.message){
        let gameOver = this.game.add.text(this.game.width/2, this.game.height/3.5, this.message, messageStyle)
        gameOver.anchor.setTo(0.5, 0);
      }
   }
}
