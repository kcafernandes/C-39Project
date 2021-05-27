var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;

var pinkRacerImg1, pinkRacerImg2, yellowRacerImg1, yellowRacerImg2, redRacerImg1, redRacerImg2;

var obstacleImg1, obstacleImg2, obstacleImg3;

var gameOver, gameOverImg;

var bellSound;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var healthCount = 0, 
health1, 
health2, 
health3;

var distance = 0;

var topEdge, bottomEdge;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");

  pinkRacerImg1 = loadAnimation("opponent1.png", "opponent2.png");
  pinkRacerImg2 = loadAnimation("opponent3.png");

  yellowRacerImg1 = loadAnimation("opponent4.png", "opponent5.png");
  yellowRacerImg2 = loadAnimation("opponent6.png");

  redRacerImg1 = loadAnimation("opponent7.png", "opponent8.png");
  redRacerImg2 = loadAnimation("opponent9.png");

  gameOverImg = loadImage("gameOver.png");
  
  obstacleImg1 = loadImage("obstacle1.png");
  obstacleImg2 = loadImage("obstacle2.png");
  obstacleImg3 = loadImage("obstacle3.png");
  
  bellSound = loadSound("sound/bell.mp3");
}

function setup() {

  createCanvas(displayWidth, 300);

  // Moving background
  path = createSprite(2000, 150);
  path.addImage(pathImg);
  //path.velocityX = -5;

  health1 = createSprite(displayWidth - 1580, displayHeight/2 - 370, 50, 50);
  health1.shapeColor = "red";

  health2 = createSprite(displayWidth - 1530, displayHeight/2 - 370, 50, 50);
  health2.shapeColor = "red";

  health3 = createSprite(displayWidth - 1480, displayHeight/2 - 370, 50, 50);
  health3.shapeColor = "red";

  //creating boy running
  mainCyclist = createSprite(0, displayHeight/2 - 280, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.05;

  topEdge = createSprite(0, 0, 2000, 1);
  bottomEdge = createSprite(0, 300, 2000, 1);

  gameOver = createSprite(650, 150);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.visible = false;

  pinkCyG = new Group();
  yellowCyG = new Group();
  redCyG = new Group();
  obstacle1G = new Group();
  obstacle2G = new Group();
  obstacle3G = new Group();
}

function draw() {
  background(0);

  topEdge.x = camera.x;
  bottomEdge.x = camera.x;
  /*if(path.x === camera.x/2 + 100){
    path.x = camera.x - 100;
  }*/

  health1.x = camera.x - 570;
  health1.y = camera.y - 90;

  health2.x = camera.x - 520;
  health2.y = camera.y - 90;

  health3.x = camera.x - 470;
  health3.y = camera.y - 90;

  health1.depth += 3;
  health2.depth += 3;
  health3.depth += 3;

  if(healthCount === 1){
    health3.visible = false;
  }
  if(healthCount === 2){
    health3.visible = false;
    health2.visible = false;
  }
  if(healthCount === 3){
    health3.visible = false;
    health2.visible = false;
    health1.visible = false;
  }

  if(camera.x === path.width/2){
    path.x = 100;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, camera.x + 300, camera.y - 100);

  camera.position.x = mainCyclist.x + 530;
  camera.position.y = mainCyclist.y;

  distance = mainCyclist.x;
  console.log(mainCyclist.x);

  if (gameState === PLAY) {

    //distance = distance + Math.round(getFrameRate()/50);
    
    //path.velocityX = -(6 + 2 * distance/150);

    //mainCyclist.y = World.mouseY;


    if(keyIsDown(UP_ARROW)){
      mainCyclist.y -= 4
    }

    if(keyIsDown(DOWN_ARROW)){
      mainCyclist.y += 4
    }

    if(keyIsDown(RIGHT_ARROW)){
      mainCyclist.x += 4
    }

    if(keyIsDown(LEFT_ARROW)){
      mainCyclist.x -= 4
    }

    //edges = createEdgeSprites();
    mainCyclist.collide(bottomEdge);
    mainCyclist.collide(topEdge);

    //code to reset the background
    /*if (path.x < 0) {
      path.x = width / 2;
    }*/
    
    if(keyDown("space")){
      bellSound.play();
    }
    
    var select_oppPlayer = Math.round(random(1,3));

    if(distance % 110 === 10){
      if(select_oppPlayer === 1){
        pinkCy();
      }
      else if(select_oppPlayer === 2){
        yellowCy();
      }
      else{
        redCy();
      }
    }
    
    var select_obstacle = Math.round(random(1,3));

    if(distance % 210 === 10){
      if(select_obstacle === 1){
        obstacles1();
        obstacle1G.depth = pinkCyG.depth - 1;
        obstacle1G.depth = yellowCyG.depth - 1;
        obstacle1G.depth = redCyG.depth - 1;
      }
      else if(select_oppPlayer === 2){
        obstacles2();
        obstacle2G.depth = pinkCyG.depth - 1;
        obstacle2G.depth = yellowCyG.depth - 1;
        obstacle2G.depth = redCyG.depth - 1;
      }
      else{
        obstacles3();
        obstacle3G.depth = pinkCyG.depth - 1;
        obstacle3G.depth = yellowCyG.depth - 1;
        obstacle3G.depth = redCyG.depth - 1;
      }
    }
    
    if(healthCount === 3){
      gameState = END;
    }

    if(pinkCyG.isTouching(mainCyclist)){
      //gameState = END;
      healthCount++;
      player1.velocityY = 0;
      player1.addAnimation("opponentPlayer1",  pinkRacerImg2);
      player1.changeAnimation("opponentPlayer1", pinkRacerImg2);
      pinkCyG.destroyEach();
    }
    
    if(yellowCyG.isTouching(mainCyclist)){
      //gameState = END;
      healthCount++;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2", yellowRacerImg2);
      player2.changeAnimation("opponentPlayer2", yellowRacerImg2);
      yellowCyG.destroyEach();
    }
    
    if(redCyG.isTouching(mainCyclist)){
      //gameState = END;
      healthCount++;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer2", redRacerImg2);
      player3.changeAnimation("opponentPlayer2", redRacerImg2);
      redCyG.destroyEach();
    }
    
    if(obstacle1G.isTouching(mainCyclist)){
     //gameState = END;
     healthCount++;
      obstacle1G.destroyEach();
    }
  
    if(obstacle2G.isTouching(mainCyclist)){
      //gameState = END;
      healthCount++;
      obstacle2G.destroyEach();
    }
    
    if(obstacle3G.isTouching(mainCyclist)){
      //gameState = END;
      healthCount++;
      obstacle3G.destroyEach();
    }
      
  }
  else if(gameState === END){
    gameOver.x = camera.x + 100;
    gameOver.y = camera.y;
    gameOver.visible = true;
    textSize(20);
    text("Press Up arrow to restart Game", camera.x - 50, camera.y + 50);
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("running", mainRacerImg2);
    mainCyclist.changeAnimation("running", mainRacerImg2);
    
    pinkCyG.setVelocityXEach(0);
    pinkCyG.setLifetimeEach(-1);
    
    yellowCyG.setVelocityXEach(0);
    yellowCyG.setLifetimeEach(-1);
    
    redCyG.setVelocityXEach(0);
    redCyG.setLifetimeEach(-1);
    
    obstacle1G.setVelocityXEach(0);
    obstacle1G.setLifetimeEach(-1);
    
    obstacle2G.setVelocityXEach(0);
    obstacle2G.setLifetimeEach(-1);
    
    obstacle3G.setVelocityXEach(0);
    obstacle3G.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")){
      reset();
    }
  }
}

function pinkCy() {
  player1 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  player1.velocityX = -(6 + 2 * distance / 150);
  player1.addAnimation("player1", pinkRacerImg1);
  player1.scale = 0.05;
  player1.setLifetime = 170;
  pinkCyG.add(player1);
}

function yellowCy() {
  player2 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.addAnimation("player2", yellowRacerImg1);
  player2.scale = 0.05;
  player2.setLifetime = 170;
  yellowCyG.add(player2);
}

function redCy() {
  player3 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  player3.velocityX = -(6 + 2 * distance / 150);
  player3.addAnimation("player3", redRacerImg1);
  player3.scale = 0.05;
  player3.setLifetime = 170;
  redCyG.add(player3);
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  healthCount = 0;
  health1.visible = true;
  health2.visible = true;
  health3.visible = true;
  mainCyclist.addAnimation("running", mainRacerImg1);
  
  pinkCyG.destroyEach();
  yellowCyG.destroyEach();
  redCyG.destroyEach();
  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
  
  mainCyclist.x = 0;
  mainCyclist.y = displayHeight/2 - 280;
}
function obstacles1(){
  var obstacle1 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  obstacle1.velocityX = -(6 + 2 * distance / 150);
  obstacle1.addImage("obstacle1", obstacleImg1);
  obstacle1.scale = 0.07;
  obstacle1.setLifetime = 170;
  obstacle1G.add(obstacle1);
}
function obstacles2(){
  var obstacle2 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  obstacle2.velocityX = -(6 + 2 * distance / 150);
  obstacle2.addImage("obstacle2", obstacleImg2);
  obstacle2.scale = 0.07;
  obstacle2.setLifetime = 170;
  obstacle2G.add(obstacle2);
}
function obstacles3(){
  var obstacle3 = createSprite(camera.x + 600, Math.round(random(40, 260)));
  obstacle3.velocityX = -(6 + 2 * distance / 150);
  obstacle3.addImage("obstacle3", obstacleImg3);
  obstacle3.scale = 0.07;
  obstacle3.setLifetime = 170;
  obstacle3G.add(obstacle3);
}