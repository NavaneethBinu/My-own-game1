var background, backImg, player, PlayerImg, corona, CoronaImg, CoronaGroup;

var serve = 0;
var gameState = serve;
var play = 1;

function preload() {

  PlayerImg = loadImage("Images/Player.png");
  backImg = loadImage("Images/background.jpg");
  CoronaImg = loadImage("Images/Corona.png");
}

function setup() {
  createCanvas(600, 400);

  background = createSprite(0, 0, 600, 400);
  background.addImage(backImg);
  background.scale = 5;
  //making moving background
  background.x = background.width / 2;
  background.velocityX = -4;

  player = createSprite(100, 250, 20, 20);
  player.addImage(PlayerImg);
  player.scale = 0.2;

  ground = createSprite(0, 390, 2000, 20);
  ground.shapeColor = "#30AD4D";
  

  CoronaGroup = new Group();
  score = 0
}
function draw() {

  if (gameState == serve) {
    background.velocityX = 0;
    player.velocityY = 0;
    CoronaGroup.setVelocityXEach(0);
    stroke("black");
    strokeWeight(2);
    textSize(20);
    fill("white");
    text("Press '^ arrow' to play", 200, 200);
  }

  if (gameState == play) {
    if (background.x < 0) {
      background.x = background.width / 2;
    }
    // if (keyDown("UP_ARROW")) {
    //   player.y = player.y - 7;
    // }

    if (keyDown("space")) {
      player.velocityY = -12;
    }
     player.velocityY = player.velocityY + 0.8;
    if (CoronaGroup.isTouching(player)) {
      CoronaGroup.destroyEach();
      score = score + 2
    }
     
    player.collide(ground);
    

    functionCorona();
    drawSprites();
    stroke("black");
    strokeWeight(2);
    textSize(20);
    fill("red");
    text("Score: " + score, 200, 70);
  }
  if (keyDown("UP_ARROW")) {
    gameState = play;
    background.velocityX = -4
  }
}
function functionCorona() {
  if (frameCount % 240 === 0) {
    corona = createSprite(600, 200, 40, 10);
    corona.y = random(120, 200);
    corona.velocityX = -7;
    corona.addImage(CoronaImg);
    corona.scale = 0.4;
    corona.lifetime = 300;
    player.depth = corona.depth + 1;
    CoronaGroup.add(corona)
  }
}

