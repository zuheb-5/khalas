var gameState = 0;
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var ground,invisibleGround;
var bananaGroup, obstaclesGroup;
var canvas;
var score = 0;
var gameOver,gameOverImg;
var monkeyImg,trophyImg,trophy;
var resetButton;
var cImg,bImg;
function preload()
{  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",
 "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");            
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImg = loadImage("gameOver.png");
  monkeyImg = loadImage("sprite_0.png");
  trophyImg = loadImage("cup.png");
  cImg = loadImage("b.jpg");
  bImg = loadImage("bg.jpg")
}

function setup() 
{
  canvas = createCanvas(displayWidth,displayHeight-145);

  monkey = createSprite(200,height-20,22,22);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.19;
  
  ground = createSprite(width/2,height-8,width,15);
  ground.velocityX = -(6+2*score/2);
  ground.shapeColor = "Green"
  ground.x = ground.width/2;

  invisibleGround = createSprite(width/2,height-16,width,2);
  invisibleGround.visible = false;
  
  trophy = createSprite(width/1.5,height/2,22,22);
  trophy.addImage("cup",trophyImg);
  trophy.scale = 0.8;

  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage("over",gameOverImg);
  gameOver.scale = 1.9;

  bananaGroup = createGroup();
  obstaclesGroup = createGroup(); 
}


function draw() 
{   
  if(gameState === 0)
  {
    background("lavender");
    textSize(20);
    fill("black");
    text("Collect 10 Bananas To Win The Game",width/2.7,height/3);
    text("Press Spacebar To Continue",width/2.5,height/2);
    gameOver.visible = false;
    ground.visible = false;
    monkey.visible = false;
    trophy.visible = false;
    if(keyCode === 32)
    {
      gameState = 1;
    }
  }
  

  //creating gamestates
  else if (gameState === 1)
    {
      background(bImg);
      textSize(25);
      fill("white");
      text("Bananas Eaten = "+score,width/4,50)
      ground.visible = true;
      monkey.visible = true;
      gameOver.visible = false; 
      trophy.visible = false;   

      if (ground.x < width/1.5)
      {
        ground.x = ground.width/2;
      }  

      if(keyDown("space")&& monkey.y >= height-170)
      {
        monkey.velocityY = -17;
      }
      monkey.velocityY = monkey.velocityY + 0.8;

      food();
      spawnObstacles();
      
      if(bananaGroup.isTouching(monkey))
      {
        bananaGroup.destroyEach();
        score++;
      }

      if(obstaclesGroup.isTouching(monkey))
      {
          gameState = 2;    
      }
      if(score >= 10)
      {
        gameState = 3;
      }
  }
  
  else if (gameState === 2)
  {
    background(bImg);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    trophy.visible = false;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
   
    gameOver.visible = true;

    resetButton = createButton('Reset');
    resetButton.position(width/25,height/20);
    resetButton.mousePressed(()=>{
      reset();
    })
  }
  else if(gameState === 3)
  {
    background(cImg);
    trophy.visible = true;
    gameOver.visible = false;
    obstaclesGroup.destroyEach();
    bananaGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.scale = 0.8;
    monkey.changeAnimation("monkeyHappy",monkeyImg);
    monkey.y = height-20;
    textSize(40);
    fill("White");
    text("You Won!!!",width/2.5,height/2);
  }
  monkey.collide(invisibleGround);
  drawSprites();
}

function food()
{
  if (frameCount % 80 === 0)
  {
    var banana = 
    createSprite(width/1.5,Math.round(random(height-180,height-170))); 
    banana.addImage("eating",bananaImage); 
    banana.velocityX = -(6+2*score/2); 
    banana.scale = 0.15;  
    banana.lifetime = 300;  
    bananaGroup.add(banana);    
  }
}

function spawnObstacles()
{
  if (frameCount %200 === 0)
  {
    var obstacle = createSprite(width/1.5,height-35,22,22); 
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6+2*score/2);
    obstacle.scale = 0.15;
    obstacle.setCollider("rectangle",20,90);   
    obstacle.lifetime = 305;
    obstaclesGroup.add(obstacle);
  }
}
function reset()
{
  gameState = 0;
  obstaclesGroup.destroyEach();
  bananaGroup.destroyEach();
  gameOver.visible = false;
  score = 0;
}