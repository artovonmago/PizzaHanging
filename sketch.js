const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var luffy;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('pizza.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation('blink1.png','blink2.png')
  eat = loadAnimation('eat.png')
  sad = loadAnimation('sad.png')
  eatSound = loadSound('eat.mp3')
  sadSound = loadSound('sad.mp3')
  airSound = loadSound('air.wav')
  bgMusic = loadSound('bgMusic.mp3')
  blink.playing = true
  eat.playing = true
  eat.looping = false
  sad.playing = true
  sad.looping = false
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile) {
    canW = displayWidth
    canH = displayHeight
    createCanvas(displayWidth+80, displayHeight)
  } else {
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight)
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  blink.frameDelay=40
  eat.frameDelay=20
  sad.frameDelay=20

  button1 = createImg('cut_btn.png');
  button1.position(220,30);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(400,10);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(100,30);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  rope1 = new Rope(7,{x:245,y:20});
  rope2 = new Rope(7.5,{x:425,y:5});
  rope3 = new Rope(7.5,{x:125,y:30});
  ground = new Ground(200,canH,600,20);
  blower = createImg('blower.png')
  blower.size(140,100)
  blower.position(40,250)
  blower.mouseClicked(airBlow)
 

  mute = createImg('mute.png')
  mute.position(20,20)
  mute.size(80,80)


  luffy = createSprite(170,canH-160,100,100);
  luffy.scale = 2;
  luffy.addAnimation('blinking',blink)
  luffy.addAnimation('eating',eat)
  luffy.addAnimation('sad',sad)

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope1.body,fruit);

  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}



function draw() 
{
  background(51);
  image(bg_img,0,0,windowWidth+80,displayHeight);
 if(fruit!=null) {
  image(food,fruit.position.x,fruit.position.y,70,70);
 }

 mute.mouseClicked(function() {bgMusic.isPlaying() ? bgMusic.stop() : bgMusic.play()})

 if(!bgMusic.isPlaying()) {
  bgMusic.play()
 }

  rope1.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit, luffy)==true){
    luffy.scale=0.35
    luffy.changeAnimation('eating');
    eatSound.play()
}
if(collide(fruit, ground.body)==true){
  luffy.changeAnimation('sad');
  luffy.scale=0.15
  luffy.y+=50
  sadSound.play()
}



   drawSprites();

  
}

function drop1()
{
  rope1.break();
  fruit_con1.dettach();
  fruit_con1 = null; 
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  fruit_con2 = null; 
}

function drop3()
{
  rope3.break();
  fruit_con3.dettach();
  fruit_con3 = null; 
}



function airBlow() {
  airSound.play()
  Matter.Body.applyForce(fruit, {x: 0, y: 0}, {x:0.01, y:0})
}


function collide(body,sprite) { if(body!=null) { var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y); if(d<=80) { World.remove(engine.world,fruit); fruit = null; return true; } else{ return false; } } }