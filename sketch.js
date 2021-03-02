var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground,groundImage
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime,line,lineImage
var gameOver, restart;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  groundImage = loadImage("999.jpg");
  obstacleImage = loadImage("obstacle.png");
  lineImage = loadImage("333.png");
  dieSound = loadSound("die.mp3")
  doSound = loadSound("checkPoint.mp3")
 gameOverImg = loadImage("gameOver-1.png");
  restartImg = loadImage("restart-1.png");
}



function setup() 
{
   createCanvas(600, 600);
   
  
  ground = createSprite(300,200);
  ground.addImage("ground",groundImage);
  ground.scale=1.3

  monkey = createSprite(50,400,20,50);
  monkey.addAnimation("running", monkey_running);
 monkey.scale = 0.09;
  
  
  line = createSprite(200,700,400,20);
  line.addImage("ground",lineImage);
  line.x = line.width /4
  line.visible=true
  
  bananaGroup=new Group()
  enemiesGroup=new Group()
  
  survivaltime= 0;
  stroke("white")
  textSize(20)
  fill("red");
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;
}


function draw()
{
  
  if(gameState===PLAY){
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
    ground.velocityX =-10
  console.log(monkey.y)
    if(keyDown("space")&& monkey.y >= 144) {
        monkey.velocityY = -14;
      
    }
  monkey.velocityY=monkey.velocityY+0.8
    spawnObstacles();
  banana();
    
   if(bananaGroup.isTouching(monkey))
   {
     dieSound.play()
      gameState=END
    }
    if(enemiesGroup.isTouching(monkey))
   {
     doSound.play()
       enemiesGroup.destroyEach()
    }
 survivaltime=Math.ceil(frameCount/frameRate())
    gameOver.visible = false;
  restart.visible = false;
  }
  else if(gameState===END)
  {
    ground.velocityX=0
    
    enemiesGroup.destroyEach()
    bananaGroup.destroyEach()
    gameOver.visible = true;
  restart.visible = true;
    if(mousePressedOver(restart)){
       
       gameState=PLAY
      
     }
  }
   monkey.collide(line)
 drawSprites() ;
   text("SurvivalTime: "+ survivaltime, 250,50);
}
function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,250,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage("g",bananaImage);
 obstacle.scale=0.09
   var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.y=150
              break;
      case 2:  obstacle.y=160
              break;
      case 3:  obstacle.y=170
              break;
      case 4:  obstacle.y=190
              break;
      case 5:  obstacle.y=180 
              break;
      case 6:  obstacle.y=200
              break;
      default: break;
      
    }
   obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    enemiesGroup.add(obstacle);
 }}
 
 function banana(){
 if (frameCount % 300 === 0){
   var banana = createSprite(600,390,10,10);
   banana.velocityX = -6;
   banana.addImage("ge",obstacleImage);
 banana.scale=0.1
   bananaGroup.add(banana);
 }}  
   


