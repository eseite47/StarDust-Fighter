var game = new Phaser.Game(1400, 750, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('BootState', BootState);
game.state.add('PreloadState', PreloadState);
game.state.start('BootState');
