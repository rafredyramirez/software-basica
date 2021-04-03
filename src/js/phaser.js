var game = new Phaser.Game(
    1365,625, 
    Phaser.AUTO, 
    'phaser-example', 
    { 
        preload: preload, 
        create: create,
        update: update,
        render: render 

    }
);

var background;

var boy;
var girld;

var logo 

var btn_start;

function preload() {

    //Background
    game.load.spritesheet('background', 'src/assets/images/fondos/background_p.jpg', 1365, 625);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    //niño
    game.load.spritesheet('boy', 'src/assets/images/personajes/sprite_boy.png',130,130);
    
    // niña
    game.load.spritesheet('girld', 'src/assets/images/personajes/sprite_girld.png',130,130);

    // imagen logo 
    game.load.image("logo", "src/assets/images/botones/logo_fin.png"); 
    
    // buttons
    game.load.spritesheet('btn_start', 'src/assets/images/botones/btn_start.png', 150, 60);
}

function create() {  
    background = game.add.sprite(0, 0, 'background');
    //---niño---
    boy=game.add.sprite(0, 390, 'boy');
    
    boy.animations.add('right-running-boy', [21, 22, 23, 24 ,25, 26, 27, 28, 29, 30, 31, 32],30, true);
    boy.animations.add('front-splash-boy', [12, 13, 14, 15, 16, 17, 18, 19, 20], 10, true);
    // boy.animations.add('front-splash-boy', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50], 10, true);


    boy.scale.setTo(1, 1); // scale image
    
    game.physics.enable(boy, Phaser.Physics.ARCADE);
    boy.animations.play('right-running-boy');

    //---niña----
    girld=game.add.sprite(1200, 355, 'girld');

    girld.animations.add('left-running-girld',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 15, true);
    girld.animations.add('front-splash-girld',[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
    // girld.animations.add('front-splash-girld',[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], 10, true);


    girld.scale.setTo(1.4, 1.4); // scale image

    game.physics.enable(girld, Phaser.Physics.ARCADE);

    girld.animations.play('left-running-girld');

    // logo
    logo = game.add.sprite(500, 90, 'logo');

    game.physics.enable(logo, Phaser.Physics.ARCADE);

    logo.body.collideWorldBounds = true;
    logo.body.bounce.y = 2;
}
    

function update() {

    // movimiento niño derecha 
    if (boy.x < 325) {
        boy.body.velocity.x = 100;
        girld.body.velocity.x = -100;
    }else{
        boy.body.velocity.x = 0;
        girld.body.velocity.x = 0;
        
        boy.animations.play("front-splash-boy");
        girld.animations.play("front-splash-girld");
    }

    // caida logo 
    if (logo.y >= 90) {
        logo.body.gravity.y = 100;
    }else{
        logo.destroy();
        logo = game.add.sprite(500, 88, 'logo');
  
        
        btn_start = game.add.button(572, 330, 'btn_start', actionOnClick, this, 1, 0);
        btn_start.scale.setTo(1.5, 1.5); // scale image
    }
}

function render(){ 
    // game.debug.bodyInfo(boy, 16, 24);
    
    // game.debug.body(girld);
    // game.debug.body(boy);
    // game.debug.body(logo);
}

function miCollision (obj1, obj2) {
    // boy.animations.play('front-splash');
    // girld.animations.play('frente');
}

function miCollisionNo (obj1, obj2) {  
    // boy.animations.play('right-running');
    // girld_q.animations.play('quieta');

}

function actionOnClick() {
    modalRegistro();
}

function modalRegistro(){

    window.location.href="register.html";

}

