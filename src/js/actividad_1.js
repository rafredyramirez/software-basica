var game = new Phaser.Game(
    1365,625, 
    Phaser.AUTO, 
    'actividad-1', 
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

var cursors;
// var logo 

// var btn_start;

function preload() {

    //Background
    game.load.spritesheet('background', 'src/assets/images/fondos/city1.jpg', 1365, 625);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    //niño
    game.load.spritesheet('boy', 'src/assets/images/personajes/sprite_boy.png',130,130);

    // // niña
    game.load.spritesheet('girld', 'src/assets/images/personajes/sprite_girld.png',130,130);
}

function create() {  
    background = game.add.sprite(0, 0, 'background');
    //---niño---
    boy=game.add.sprite(-30, 400, 'boy');
    
    boy.animations.add('left-running-boy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],30, true);
    boy.animations.add('right-running-boy', [21, 22, 23, 24 ,25, 26, 27, 28, 29, 30, 31, 32],30, true);
    boy.animations.add('front-flicker-boy', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],30, true);

    boy.scale.setTo(1, 1); // scale image
    
    game.physics.enable(boy, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    boy.body.collideWorldBounds = true;

    
    //---niña----
    girld=game.add.sprite(-30, 400, 'girld');
    
    girld.animations.add('left-running-girld', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],30, true);
    girld.animations.add('right-running-girld', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],30, true);
    girld.animations.add('front-flicker-girld', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],30, true);

    girld.scale.setTo(1, 1); // scale image
    
    game.physics.enable(girld, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    girld.body.collideWorldBounds = true;

    // girld=game.add.sprite(1200, 355, 'girld');

    // girld.animations.add('left-running-girld',[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 15, true);
    // girld.animations.add('front-splash-girld',[15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 10, true);
    // girld.animations.add('front-splash-girld',[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74], 10, true);


    // girld.scale.setTo(1.4, 1.4); 

    // game.physics.enable(girld, Phaser.Physics.ARCADE);

    // girld.animations.play('left-running-girld');

    // logo
    // logo = game.add.sprite(500, 90, 'logo');

    // game.physics.enable(logo, Phaser.Physics.ARCADE);

    // logo.body.collideWorldBounds = true;
    // logo.body.bounce.y = 2;
}
    

function update() {
    
    // cargar genero personaje
    var genero = sessionStorage.getItem("genero");

    if (genero === "Niño") {

        boy.animations.play('front-flicker-boy');
        girld.destroy();

        if (cursors.left.isDown){
            boy.x -= 3;
            boy.animations.play('left-running-boy', true);
    
        }else if (cursors.right.isDown){
            boy.x +=3;
            boy.animations.play('right-running-boy', true);
        }
        else{
            boy.animations.play('front-flicker-boy');
        }


    }if (genero === "Niña"){
        girld.animations.play('front-flicker-girld');
        boy.destroy();

        if (cursors.left.isDown){
            girld.x -= 3;
            girld.animations.play('left-running-girld', true);
    
        }else if (cursors.right.isDown){
            girld.x +=3;
            girld.animations.play('right-running-girld', true);
        }
        else{
            girld.animations.play('front-flicker-girld');
        }
    }

    if (boy.x === 300 || girld.x === 300) {
        // alert('estoy acá');
        console.log("estoy acá");
    }
    if (boy.x === 500 || girld.x === 500) {
        // alert('estoy acá2');
        console.log("estoy acá2");
        
    }



    
}

function render(){ 
    game.debug.bodyInfo(boy, 16, 24);
    game.debug.bodyInfo(girld, 16, 24);
    
    // game.debug.body(girld);
    // game.debug.body(boy);
    // game.debug.body(logo);
}