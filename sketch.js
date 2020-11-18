var monkey,monkeyImage;
var banana,bananaImage,foodGroup;
var obstacle,obstacleImage,obstacleGroup;
var background1,backgroundImage;
var score=0;
var ground;
var gravity=1;
var play=1;
var gameState = play;
var end = 0;
var count = 0;

function preload(){
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  backgroundImage=loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(400, 400);
 
  background1 = createSprite(200,200,20,20)
  background1.addImage("Animated Background",backgroundImage);
  monkey = createSprite(100,385);
  monkey.addAnimation("Animated Monkey",monkeyImage);
  monkey.scale=0.1;
  
 
  obstacleGroup = new Group();
 
  foodGroup = new Group();
   
 
  ground = createSprite(200,385,400,10);
  ground.visible=false;
}
 
function draw() {
  background(220);
  
  if(gameState == play){
    
    background1.velocityX=-2;
    if(background1.x<200){
      background1.x=background1.width/2; 
    }
    
    if(keyDown("space") && monkey.collide(ground)){
      monkey.velocityY=-24;  
    }
    monkey.velocityY=monkey.velocityY+gravity;
    
    for(var i=0;i<foodGroup.length;i=i+1){
      if(foodGroup.get(i).isTouching(monkey)){
        foodGroup.get(i).destroy();
        score=score+2;
      }
    }

    
    
    switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
    case 50: monkey.scale=0.2;
      break;
    default: break;
    }
    
    spawmnFood();
    spawnObstacle();
    
    for(var z=0;z<obstacleGroup.length;z=z+1){
      if(obstacleGroup.get(z).isTouching(monkey)){
            count=count+1;
             
        if(count==1){
      obstacleGroup.get(z).destroy();
          monkey.scale=0.1;
          
        }
        if(count==2){
          gameState=end;
        }
      }
    }
    monkey.collide(ground);
    drawSprites();
  
  text("Score: " +score,300,30);
  }
  
  else if(gameState == end){
    ground.velocityX=0;
    background("black");
    text("Game Over",200,200);
  }
  
  
}

function spawnObstacle(){
  
  var createObstacle = frameCount % 149;
  if(createObstacle == 0){
    obstacle = createSprite(450,350);
  obstacle.addImage("Obstacle Image",obstacleImage);

  obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
    obstacle.x=410;
    obstacle.velocityX=-4;
    obstacle.lifetime=150;
   
  }
}

function spawmnFood(){
  
   var createBanana = frameCount % 20;
   if(createBanana == 0){
     banana = createSprite(450,350);
   banana.scale=0.05;
  banana.addImage("Banana Image",bananaImage);
  foodGroup.add(banana);
     banana.x=400;
     banana.velocityX=-4;
     banana.lifetime=150;
   
  }
}