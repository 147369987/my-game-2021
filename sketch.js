var PLAY = 1;

var END = 0;
var HOME = 2;

var gameState = PLAY;
var gameState = HOME;



var main, main_running, trex_collided;
var loose;
var win;
var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var sanitizer;
var injection;

var vaccine;
var points;
var fPage;


function preload(){
  main_running = loadAnimation("boy1.png","boy2.png","boy3.png");
  vaccinesImg = loadAnimation("vacImg.png","vacImg2.png","vacImg3.png","vacImg4.png")
  trex_collided = loadImage("fall.png");
  loose = loadImage("th.png");
  win = loadImage("won.png")
  
  groundImage = loadImage("ground 1.png");
  bgImg = loadImage("bg1.jpg")
  
  
  restartImg = loadImage("restart.png")
  
  obstacle1 = loadImage("virus 1.png");
  obstacle2 = loadImage("virus 2.png");
  obstacle3 = loadImage("virus 3.png");
  
  sanitizer5= loadImage("san.png")
  mask123= loadImage("mask.png")
  inj = loadImage("syr.png");
  fPage = loadImage("Front.png");
  bPage = loadImage("back.png")
  mPage = loadImage ("inf.png")
  insPage = loadImage("ins.png")
  nn = loadImage("nn.png")
  
  
  
  
  
  // For loading the sounds
  jumpSound = loadSound("jump.wav")
  dieSound = loadSound("gameover.wav")
  checkPointSound = loadSound("checkPoint.mp3")
  bonusS= loadSound("bonus.wav")
  injeS = loadSound("comp.wav")
  wins = loadSound("WIN.wav");
  

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  main = createSprite(150,height-220,20,50);
  main.addAnimation("running", main_running);
 main.scale = 0.6;

vac1 = createSprite(800,height-600,20,50);
vac1.addAnimation("running",vaccinesImg);
vac1.scale = 1.3;
 vac1.visible = false;

  fall = createSprite(450,height-120,20,50);
  fall.addImage(trex_collided);
  fall.scale = 0.6;
  fall.visible=false;

  touch = createSprite(150,300,20,50);
  touch.addImage(loose);
  touch.scale = 0.6;
  touch.visible = false;

  
winning = createSprite(150,250,20,50);
winning.addImage(win);
winning.scale = 0.7;
winning.visible = false;


  
  ground = createSprite(width/2,height,width,20);
  ground.addImage("ground",groundImage);
  ground.scale=4;
  ground.x = ground.width /2;

  
homePage = createSprite(width/2,height/2);
homePage.addImage(fPage);
homePage.scale = 0.5;
homePage.visible= false;

backPage = createSprite(width/2,height/2);
backPage.addImage(bPage);
backPage.scale = 0.7;
backPage.visible= false;

middlePage = createSprite(width/2,height/2-130);
middlePage.addImage(mPage);
middlePage.scale = 1.2;
middlePage.visible=false;

instructionPage = createSprite(width/2,height/2);
instructionPage.addImage(insPage);
instructionPage.scale = 0.5;
instructionPage.visible=false;

nnPage = createSprite(140,95,50,50);
nnPage.addImage(nn);
nnPage.scale = 0.4;
nnPage.visible= false;

  restart = createSprite(width/2,height/2+110);
  restart.addImage(restartImg);

  restart.scale = 0.5;
  
  
  invisibleGround = createSprite(width/2,height-120,width,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 sanGroup = createGroup();
 injeGroup = createGroup();
 maskGroup = createGroup();
  
  console.log("Hello" + 5);
  //For the colliation radius 
  
  main.setCollider("rectangle",0,0,80,220);
  main.debug = false;
  
  score = 0;
  points = 0;
  vaccine = 0;
  
}

function draw() {
  
       
      

 



 
   
  

 

 

  



  if(gameState === PLAY){
   background(bgImg);
    stroke ("black")
    fill ("Black")
    textSize(40);
    text("Score:"+ score, 150,50);
    
   text("Points:" + points , width/2-100, 50);
    text("Vaccines:"+ vaccine , width-350 , 50)
 
    
   
   
    restart.visible = false;
    homePage.visible= false;
  main.visible = true;
  ground.visible = true;
  nnPage.visible= false;
  
    ground.velocityX = -(10 + 2* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
   
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    
   if((touches.length > 0 || keyDown("SPACE")) && main.y  >= height-210) {
    main.velocityY = -15;
      jumpSound.play();
      touches=[];
  }
    
    
    
    //add gravity
    main.velocityY = main.velocityY + 0.8
  
     
  
    //spawn obstacles on the ground
    spawnObstacles();
    spawnSan();
    spawnInje();
    spawnMask();
 
    if(injeGroup.isTouching(main)){
      vaccine = vaccine +1;
         
       injeGroup.destroyEach();
       injeS.play();
       vac1.visible = true;
       
     
     }
    
  if(sanGroup.isTouching(main)){
   
    points = points +1 ;
    sanGroup.destroyEach();
    bonusS.play();
    vac1.visible = false;
   
  

}
if(maskGroup.isTouching(main)){

  points = points +1 ;
  maskGroup.destroyEach();
  bonusS.play();
  vac1.visible = false;
 
  }

 



if(obstaclesGroup.isTouching(main)){
    
  gameState = END;
  main.visible=false;
  obstaclesGroup.destroyEach();
  sanGroup.destroyEach();
  injeGroup.destroyEach();
  maskGroup.destroyEach();
  dieSound.play();
  vac1.visible = false;
 

 
} 




if(vaccine === 2){
   
    vac1.visible = false;
obstaclesGroup.destroyEach();
sanGroup.destroyEach();
injeGroup.destroyEach();
maskGroup.destroyEach();
obstaclesGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
sanGroup.setLifetimeEach(-1);
sanGroup.setVelocityXEach(0);
injeGroup.setLifetimeEach(-1);
injeGroup.setVelocityXEach(0);
maskGroup.setLifetimeEach(-1);
maskGroup.setVelocityXEach(0);
checkPointSound.stop();
jumpSound.stop();
ground.velocityX = 0;
winning.visible = false; 
ground.visible = false;
main.visible=false;
fall.visible= false;
fill("black")
text("You won and you are vaccinated 🏆💉 ",500,200)
text("Click WIN + PrintScreen to take screenshot ",440,280)

backPage.visible= true;

background(rgb (0 ,112 ,192))
if((touches.length>0||keyDown("a"))) {
  location.reload();
  
}
}



  
  }
  

 
  

  if(gameState === HOME){
    background(rgb (251 ,229 ,214))
    homePage.visible= true;
    main.visible=false;
    restart.visible = false;
    ground.visible = false;
    nnPage.visible= true;
    score = 0;
    
    if(keyDown("i")) {
   
      instructionPage.visible=true;
    } 
  
    if(keyDown("h")) {
      
     location.reload();
    }
    
    if((touches.length>0||keyDown("space"))) {
      gameState = PLAY;
      instructionPage.visible=false;
      touches=[];
      
    }
  }
  
   
 
   else if (gameState === END) {
     console.log("hey")
     if((touches.length>0||mousePressedOver(restart))) {
        location.reload();
        touches=[];
      }
      
      main.visible=false;
      fall.addImage(trex_collided);
     
      middlePage.visible= true;
      ground.velocityX = 0;
      main.velocityY = 0
     
   
      //change the trex animation
     
      fall.visible= true;
      restart.visible = true;
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
     obstaclesGroup.setVelocityXEach(0);
  sanGroup.setLifetimeEach(-1);
  
     sanGroup.setVelocityXEach(0);
     injeGroup.setLifetimeEach(-1);
  
     injeGroup.setVelocityXEach(0);
     

   
   }
  
    
 
 
  main.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(width,height-100);
   //To increase the speed 
   obstacle.velocityX = -(10+ score / 100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
    
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = width;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


function spawnSan(){
  if (frameCount %  800 === 0){
    var sanitizer = createSprite(width+50,height-100);
    //To increase the speed 
    sanitizer.velocityX = -(5);
    
     //generate random obstacles
     var rand = Math.round(random(1,1));
     switch(rand) {
       case 1: sanitizer.addImage(sanitizer5);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     sanitizer.scale = 0.4;
     sanitizer.lifetime = width/12;
    
    //add each obstacle to the group
    sanGroup.add(sanitizer);
  }
 }

 function spawnInje(){
  if (frameCount % 5000 === 0){
    var injection = createSprite(width+50,height-100);
    //To increase the speed 
    injection.velocityX = (-3);
    
     //generate random obstacles
     var rand = Math.round(random(1,1));
     switch(rand) {
       case 1: injection.addImage(inj);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
       case 5: obstacle.addImage(obstacle5);
               break;
       case 6: obstacle.addImage(obstacle6);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     injection.scale = 0.2;
     injection.lifetime = width/14;
    
    //add each obstacle to the group
    injeGroup.add(injection);
  }
 }
 function spawnMask(){
  if (frameCount %  1000 === 0){
    var masks = createSprite(width+50,height-100);
    //To increase the speed 
    masks.velocityX = -(6);
    
     //generate random obstacles
     var rand = Math.round(random(1,1));
     switch(rand) {
       case 1: masks.addImage(mask123);
               break;
       
     }
    
     //assign scale and lifetime to the obstacle           
     masks.scale = 0.4;
     masks.lifetime = width/12;
    
    //add each obstacle to the group
    maskGroup.add(masks);
  }
 }


 
