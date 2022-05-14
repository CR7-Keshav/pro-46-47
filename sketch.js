var bg,bgImg;
var player, shooterImg, shooter_shooting;
var PLAY=1   
var END=0
var gamestate=PLAY
var life=3
var score=0



function preload(){
  zombie1Image=loadAnimation ("z1.png","z2.png","z3.png","z4.png","z5.png","z6.png")
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombie2Image=loadAnimation ("zombie1.png","zombie2.png","zombie3.png","zombie4.png","zombie5.png",)
  bulletImage=loadImage("bullet.png")
  boyImage=loadAnimation ("h11.png","h12.png","h13.png","h14.png")
  manImage=loadAnimation ("h21.png","h22.png","h23.png","h24.png", "h25.png","h26.png")
  restartImage=loadImage("Restart.png")
  gameoverImage=loadImage("Gameover.png")
  

}


function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(width/2-700, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
  // player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   restart=createSprite(width/2,height/2)
   restart.addImage(restartImage)
   restart.scale=0.4
   gameover=createSprite(width/2,height/2)
   gameover.addImage(gameoverImage)
   //gameover.scale=0.6
   restart.visible=false
gameover.visible=false
zombie1group=new Group()
zombie2group=new Group()
boygroup=new Group()
mangroup=new Group()
bulletgroup=new Group()

   


}

function draw() {
  background(0); 
  drawSprites();
  textSize(20)
  fill("yellow")
  text("SCORE: "+score,width-200,80)
  text("LIFE: "+life,width-200,100)


if(gamestate===PLAY){
restart.visible=false
gameover.visible=false

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  shootBullet()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
var select=Math.round(random(1,4))
if(frameCount%120==0){
  if (select==1){
    spawnzombie1();
  }
  if(select==2){
    spawnzombie2()
  }
} 
  if(frameCount%80==0){
    if (select==3){
      spawnBoy();
    }
    if(select==4){
      spawnMan()
    }
}
for(var b=0;b<bulletgroup.length;b++){
  for(var z1=0;z1<zombie1group.length;z1++){
    if(bulletgroup.isTouching(zombie1group)){
      zombie1group.get(z1).remove()
      bulletgroup.get(b).lifetime=0
      score=score+5
    }
  }
}
for(var b1=0;b1<bulletgroup.length;b1++){
  for(var z2=0;z2<zombie2group.length;z2++){
    if(bulletgroup.isTouching(zombie2group)){
      zombie2group.get(z2).remove()
      bulletgroup.get(b1).lifetime=0
      score=score+5
    }
  }
}
for(var b3=0;b3<bulletgroup.length;b3++){
  for(var bo=0;bo<boygroup.length;bo++){
    if(bulletgroup.isTouching(boygroup)){
      boygroup.get(bo).remove()
      bulletgroup.get(b3).lifetime=0
      score=score-5
    }
  }
}
for(var b4=0;b4<bulletgroup.length;b4++){
  for(var m=0;m<mangroup.length;m++){
    if(bulletgroup.isTouching(mangroup)){
      mangroup.get(m).remove()
      bulletgroup.get(b4).lifetime=0
      score=score-5
    }
  }
}
if(zombie1group.x<50||zombie2group.x<100||zombie1group.isTouching(player)||zombie2group.isTouching(player)){
  life=life-1
  gamestate=END
}
}


if(gamestate==END){
  if(life>=1){
    text("Try Again",width/2-50,height/2-100)
    restart.visible=true
gameover.visible=false
if(mousePressedOver(restart)){
  reset()
}
  }
  else{
    restart.visible=false
    gameover.visible=true
  }
}



}
function spawnzombie1(){
zombie1=createSprite(width,random(50,height-50))
zombie1.addAnimation("ani1",zombie1Image)
zombie1.velocityX=-6
zombie1.lifetime=800
//zombie1.debug = true
zombie1.setCollider("rectangle",0,0,80,120)
zombie1group.add(zombie1)
}
function spawnzombie2(){
  zombie2=createSprite(width,random(30,height-50))
  zombie2.addAnimation("ani2",zombie2Image)
  zombie2.velocityX=-4
  zombie2.lifetime=800
  //zombie2.debug = true
  zombie2.setCollider("rectangle",0,0,50,100)

zombie2group.add(zombie2)
  }
  function shootBullet(){
    bullet=createSprite(width/2-650,player.y-25)
    bullet.velocityX=7
    bullet.addImage(bulletImage)
    bullet.scale=0.05
    bullet.visible=true
    bullet.lifetime=800
    //bullet.debug = true
bulletgroup.add(bullet)



  }
  function spawnBoy(){
    boy=createSprite(width,random(50,height-50))
    boy.addAnimation("ani3",boyImage)
    boy.scale=0.6
boy.velocityX=-8
boy.lifetime=800
//boy.debug = true
boy.setCollider("rectangle",0,0,100,150)

boygroup.add(boy)



  }
  function spawnMan(){
    man=createSprite(width,random(50,height-50))
    man.addAnimation("ani4",manImage)
    man.velocityX=-8
    man.lifetime=800
   // man.debug = true
    man.setCollider("rectangle",0,0,80,120)

mangroup.add(man)



  }
  function reset(){
    gamestate=PLAY

  }
