var game = new Phaser.Game(
    1365,625, 
    Phaser.AUTO, 
    'actividad-2', 
    { 
        preload: preload, 
        create: create,
        update: update,
        render: render 

    }
);

var genero = sessionStorage.getItem("genero");

var background;

var boy;
var girld;

var cloud;
var table1;
var table2;
var table3;

var table_point;

var cash;
var nombreCash;
var monedas = new Array(3); 

var bar;

var bpmText;

var cursors;

var textPresentacion1;
var textTitulo1;
var textTitulo2;
var textTitulo3;

var textDefinicion1;
var textDefinicion2;
var textDefinicion3;

var btn_next;
var btn_restart;
var btn_menu;


function preload() {

    //Background
    game.load.spritesheet('background', '../src/assets/images/fondos/city2.jpg', 1365, 625);

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    //niño
    game.load.spritesheet('boy', '../src/assets/images/personajes/sprite_boy.png',130,130);
    
    // // niña
    game.load.spritesheet('girld', '../src/assets/images/personajes/sprite_girld.png',130,130);

    //nube pensamiento
    game.load.spritesheet('cloud', '../src/assets/images/nube_derecha.png',715,548);

    game.load.spritesheet('table', '../src/assets/images/table.png',1100,1200);

    //texto
    game.load.bitmapFont('carrier_command', '../src/assets/fonts/carrier_command.png', '../src/assets/fonts/carrier_command.xml');

    // monedas
    game.load.spritesheet('cash', '../src/assets/images/moneda.png',135,135);

    // tabla puntaje
    game.load.spritesheet('table-point', '../src/assets/images/tabla_puntuacion.png',460,519);

    // botones
    game.load.spritesheet('btn_next', '../src/assets/images/botones/btn_continuar.png', 150, 46);
    game.load.spritesheet('btn_restart', '../src/assets/images/botones/btn_restart.png', 214, 215);
    game.load.spritesheet('btn_menu', '../src/assets/images/botones/btn_menu.png', 214, 215);

}

function create() {  
    background = game.add.sprite(0, 0, 'background');
    //---niño---
    boy=game.add.sprite(30, 430, 'boy');
    
    boy.animations.add('left-running-boy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],30, true);
    boy.animations.add('right-running-boy', [21, 22, 23, 24 ,25, 26, 27, 28, 29, 30, 31, 32],30, true);
    boy.animations.add('front-flicker-boy', [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],30, true);

    boy.scale.setTo(1, 1); // scale image
    
    game.physics.enable(boy, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    boy.body.collideWorldBounds = true;
    
    //---niña----
    girld=game.add.sprite(30, 430, 'girld');
    
    girld.animations.add('left-running-girld', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],30, true);
    girld.animations.add('right-running-girld', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],30, true);
    girld.animations.add('front-flicker-girld', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],30, true);

    girld.scale.setTo(1, 1); // scale image
    
    game.physics.enable(girld, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
    girld.body.collideWorldBounds = true;

    // header negro
    bar = game.add.graphics();
    bar.beginFill(0x000000, 0.3);
    bar.drawRect(0, 20, 1365, 100);
    
    bmpText = game.add.bitmapText(550, 50, 'carrier_command','Nivel 2 !',34);
    bmpText.tint = 0x000000;
    bmpText.inputEnabled = true; 

    // pensamiento
    cloud = game.add.sprite(10, 300, 'cloud');
    cloud.scale.setTo(0.32, 0.31); 

    // dinero
    var movimientoX = 0;
    
    for (let index = 0; index <= 2; index++) {
        movimientoX+=350;
        nombreCash="cash"+index;

        monedas[index] = nombreCash=game.add.sprite(movimientoX, 470, 'cash');

        nombreCash.animations.add('cash-animation'+index, [0, 1, 2, 3, 4, 5],10, true);
        nombreCash.animations.play('cash-animation'+index);
        nombreCash.scale.setTo(0.5, 0.5); 
        
    }
    
    // texto
    var style = { font: "16px Roboto", fill: "#000000", align: "center" };

    textPresentacion1 = game.add.text(120, 385, `- Como hemos visto \n mantener una buena \n salud mental es importante.\n  Acompáñame para \n aprender más.
    `, style);

    textPresentacion1.anchor.set(0.5);

    textPresentacion1.addColor('#4b862a', 39);
    textPresentacion1.addColor('#000000', 51);
}
    

function update() {
    if (genero === "Niño") {
        girld.visible = false;
        boy.animations.stop('front-flicker-boy', true);
    }else if (genero === "Niña") {
        boy.visible = false;
        girld.animations.stop('front-flicker-girld', true); 
    }

    // ocultar nombre actividad 
    // setTimeout(() => {
    //     bmpText.visible = false;
    //     bar.visible = false;
    // }, 5000);
    cargarPersona();

    // puntos de interrupcion 
    if (boy.x <=30 || girld.x <=30) {
        // ayuda


        textPresentacion1.visible = true;
        cloud.visible = true;

    }
    if (boy.x >=31 || girld.x >=31){

        cloud.visible = false; 
        textPresentacion1.visible = false;


        if (boy.x === 309 || girld.x === 309) {
            
            monedas[0].visible = false;
            table1 = game.add.sprite(200, 50, 'table');
            table1.scale.setTo(0.3, 0.3); 
            // que es
            var style1 = { font: "20px Roboto", fill: "#17a2b8", align: "center" };

            textTitulo1 = game.add.text(360, 135, `¿Qué es la Salud Mental?`, style1);
            textDefinicion1 = game.add.text(240, 190, `Es el bienestar general de \n la manera en que piensas, \n regulas tus sentimientos \n y te comportas. `, style1);
        
            textTitulo1.anchor.set(0.5);

            // textTitulo1.addColor('#000000');
            // que es

        }else if (boy.x === 666 || girld.x === 666) {
            
            monedas[1].visible = false;
            table2 = game.add.sprite(550, 15, 'table');
            table2.scale.setTo(0.33, 0.38);

            var style2 = { font: "20px Roboto", fill: "#0ca990", align: "center" };

            textTitulo2 = game.add.text(620, 100, `¿Por qué es importante?`, style2);
            textDefinicion2 = game.add.text(730, 255, `Es la relación entre el \n raciocinio, las emociones \n y el comportamiento \n frente a situaciones de \n la  vida cotidiana. \n El déficit puede  contribuiría \na enfermedades; como \n la depresión o la ansiedad.`, style2);
        
            textDefinicion2.anchor.set(0.5);
        
        }else if (boy.x === 999|| girld.x ===999) {
            
            monedas[2].visible = false;
            table3 = game.add.sprite(930, 50, 'table');
            table3.scale.setTo(0.3, 0.3);
            // 
            var style3 = { font: "20px Roboto", fill: "#0ca990", align: "center" };

            textTitulo3 = game.add.text(1015, 115, `¿Cómo cuidarla?`, style3);
            textDefinicion3 = game.add.text(1090, 240, `1. Mantener Relaciones \nPersonales. \n2. Evitar el Aislamiento.\n3. Distinguir y hablar \n sobre nuestras emociones.\n 4. Hacer ejercicio.`, style3);
        
            textDefinicion3.anchor.set(0.5);

        }else if (boy.x === 1235 || girld.x ===1235) {
            console.log("llegue al fin");
            table1.visible = false;
            table2.visible = false;
            table3.visible = false;

            textTitulo1.visible = false;
            textDefinicion1.visible = false;

            textTitulo2.visible = false;
            textDefinicion2.visible = false;

            textTitulo3.visible = false;
            textDefinicion3.visible = false;

            boy.visible = false;
            girld.visible = false;

            table_point=game.add.sprite(480, 40, 'table-point');

            btn_next = game.add.button(595, 450, 'btn_next', actionNext);
            btn_next.scale.setTo(1.5, 1.5); // scale image

            btn_restart = game.add.button(715, 310, 'btn_restart', actionRestar);
            btn_restart.scale.setTo(0.4, 0.4); // scale image

            btn_menu = game.add.button(610, 310, 'btn_menu', actionMenu);
            btn_menu.scale.setTo(0.4, 0.4); // scale image

        }
    }
}

function render(){ 

    game.debug.bodyInfo(boy, 16, 24);
    // game.debug.bodyInfo(girld, 16, 24);
    
    // game.debug.body(girld);
    // game.debug.body(boy);
    // game.debug.body(logo);
}

function actionNext(){
    window.location.href="actividad_2_sm.html";
}

function actionRestar(){
    window.location.href="actividad_1_sm.html";
}

function actionMenu(){
    window.location.href="../main.html";
}

function cargarPersona(){
    // cargar genero personaje


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

        if (cursors.up.isDown){
            // boy.y -=30;
            boy.y-=20;
            // character_1.x+=1;
            // boy.setVelocityY(-30);
            // boy.setVelocityY(-330);
            // console.log("si entre");
            // ship.body.setZeroVelocity();
        }else{
            boy.y+=10;
            
            // boy.y +=-1;
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
    
}