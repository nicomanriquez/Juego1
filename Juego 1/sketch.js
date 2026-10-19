var FUENTE = 'Montserrat';
var escenario, DonGui, PlayerIMG, Muestra, MuestraIMG,Muestra2IMG,Muestra3IMG,Muestra4IMG,Estacion,EstacionIMG,CafeIMG, SmartIMG;
var countVirus = 0;
var countGlucemia = 0;
var countHipertension = 0;
var countHiperlipidemia = 0;
var MuestraCount = 0;
var Puntos = 0;
var speedX = 40, speedY = 20;
var fase = 0;
var Fase2, Fase3, Fase4;
var muestras = [];
var CafeG = [];
var startGame = false;
var lost = false;
var puntosFinal = 0;
let textos = [
  { mensaje: "PCR Negativo", activo: false, contador: 0, posX: 0, posY: 0},
  { mensaje: "PCR Positivo", activo: false, contador: 0, posX: 0, posY: 0},
  { mensaje: "Muestra contaminada", activo: false, contador: 0, posX: 0, posY: 0}
];
let FRAMES_MOSTRAR = 75;
let btnUp, btnDown, btnLeft, btnRight;
let isUp = false, isDown = false, isLeft = false, isRight = false;

function preload(){
MuestraIMG = loadImage("./imagenes/Muestra.png");
Muestra2IMG = loadImage("./imagenes/MuestraGlu.png");
Muestra3IMG = loadImage("./imagenes/MuestraLip.png");
Muestra4IMG = loadImage("./imagenes/MuestraVir.png");


PlayerIMG = loadImage("./imagenes/F1.png");
Fase2 = loadImage("./imagenes/F2.png");
Fase3 = loadImage("./imagenes/F3.png");
Fase4 = loadImage("./imagenes/F4.png");

EstacionIMG = loadImage("./imagenes/Estacion.png");
CafeIMG = loadImage("./imagenes/cafe.png");
SmartIMG = loadImage("./imagenes/Smart2.jpeg");

Risk1IMG = loadImage("./imagenes/Risk1.png");
}

function setup() {
createCanvas(windowWidth, windowHeight); 
noSmooth(); // sprites pixel-art nítidos al escalar
btnUp = createButton('↑');
btnUp.position(width/2-40, height-160);
btnUp.size(80, 80);
btnUp.touchStarted(() => isUp = true);
btnUp.touchEnded(() => isUp = false);

btnDown = createButton('↓');
btnDown.position(width/2-40, height-60);
btnDown.size(80, 80);
btnDown.touchStarted(() => isDown = true);
btnDown.touchEnded(() => isDown = false);

btnLeft = createButton('←');
btnLeft.position(width/2-120, height-110);
btnLeft.size(80, 80);
btnLeft.touchStarted(() => isLeft = true);
btnLeft.touchEnded(() => isLeft = false);

btnRight = createButton('→');
btnRight.position(width/2+40, height-110);
btnRight.size(80, 80);
btnRight.touchStarted(() => isRight = true);
btnRight.touchEnded(() => isRight = false);

// Opcional: Oculta el botón por defecto en desktop
if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  btnUp.hide();
  btnDown.hide();
  btnLeft.hide();
  btnRight.hide();
}

value = windowWidth/2000; 
speedX = 20 * value, speedY = 10 * value;
  textos[0].posX = windowWidth - 325 * value;
  textos[0].posY = windowHeight - 325 * value;

  textos[1].posX = windowWidth- 325 * value;
  textos[1].posY = windowHeight - 325 * value; 
DonGui = createSprite(windowWidth/2, windowHeight/2);
DonGui.scale = value * 1.5;
DonGui.setCollider('circle',0,0,50);
DonGui.addImage(PlayerIMG);

Estacion = createSprite(windowWidth - 150 * value, windowHeight - 125 * value, 200, 200);
Estacion.setCollider('circle',0,0,25);
Estacion.addImage(EstacionIMG);
Estacion.scale = value * 3.5;
}

function Move() {
  if (keyDown(UP_ARROW) || isUp) {
    DonGui.y = DonGui.y - speedY;
  }
  if (keyDown(DOWN_ARROW) || isDown) {
    DonGui.y = DonGui.y + speedY;
  }
  if (keyDown(RIGHT_ARROW) || isRight) {
    DonGui.x = DonGui.x + speedX;
  }
  if (keyDown(LEFT_ARROW) || isLeft) {
    DonGui.x = DonGui.x - speedX;
  }
  DonGui.position.x = constrain(DonGui.position.x, 0 + DonGui.width/2, width - DonGui.width/2);
  DonGui.position.y = constrain(DonGui.position.y, 0 + DonGui.height/2, height - DonGui.height/2);
  DonGui.collide(Estacion);
}

class Virus {
  constructor() {
    this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 50 * value)), 50 * value);
    this.sprite.addImage(Muestra4IMG);
    this.sprite.velocityY = 7.5 * value;
    this.sprite.scale = value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;
  }
  getPoints(){
    return 1;
  }
}
class Cafe {
  constructor(){
  this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 50 * value)), 50 * value);
  this.sprite.addImage(CafeIMG);
  this.sprite.lifetime = 200;
  this.sprite.velocityY = 12.5 * value;
  this.sprite.scale = 2 * value;
}
  }
class Glucemia {
  constructor() {
    this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 50 * value)), 50 * value);
    this.sprite.addImage(MuestraIMG);
    this.sprite.velocityY = 10 * value;
    this.sprite.scale = value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;
  }
  getPoints(){
    return 2;
  }
}

class Hipertension {
  constructor() {
    this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 50 * value)), 50 * value);
    this.sprite.addImage(Muestra3IMG);
    this.sprite.velocityY = 15 * value;
    this.sprite.scale = value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200; 
  }
  getPoints(){
    return 4;
  }
  }

class Hiperlipidemia {
  constructor() {
    this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 50 * value)), 50 * value);
    this.sprite.addImage(Muestra2IMG);
    this.sprite.velocityY = 12.5 * value;
    this.sprite.scale = value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;
  }
  getPoints(){
    return 3;
}
}
class Risk1{
constructor() {
    this.sprite = createSprite(0, Math.round(random(windowHeight/2, windowHeight - 50 * value))); 
    this.sprite.addImage(Risk1IMG);  
    this.sprite.velocityX = 25 * value;  
    this.sprite.scale = 0.5 * value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;
  }
}
class Risk2{
  constructor() {
    this.sprite = createSprite(windowWidth, Math.round(random(windowHeight/2, windowHeight - 50 * value))); 
    this.sprite.addImage(Risk1IMG); 
    this.sprite.velocityX = -25 * value;     
    this.sprite.scale = 0.5 * value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;  
    
  }
}
class Risk3{
  constructor() {
    this.sprite = createSprite(Math.round(random(25 * value, windowWidth - 25 * value)), windowHeight); 
    this.sprite.addImage(Risk1IMG); 
    this.sprite.velocityY = -25 * value;     
    this.sprite.scale = 0.5 * value;
    this.sprite.setCollider('circle', 0, 0, 50);
    this.sprite.lifetime = 200;  
  }
}
function crearMuestra() {
  if (frameCount % 75 === 0) {
    var nuevaMuestra;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: 
        nuevaMuestra = new Virus();
        break;
      case 2: 
        nuevaMuestra = new Hiperlipidemia();
        break;
      case 3: 
        nuevaMuestra = new Hipertension();
        break;
      case 4: 
        nuevaMuestra = new Glucemia();
        break;
      default: break;
    }
    muestras.push(nuevaMuestra);
  }
}

function Puntuacion(){
 if (DonGui.isTouching(Estacion) && fase > 0)   {
    Puntos = Puntos + MuestraCount;
    MuestraCount = 0; 
    countVirus = 0;
    countGlucemia = 0;
    countHipertension = 0;
    countHiperlipidemia = 0;
  var t = Math.round(random(1,2));
  switch(t){
    case 1:
    textos[0].activo = true;
    break;
    case 2:
    textos[1].activo = true;
    break;
    default: break;
  }
 }
}
function createCafe(){
if (frameCount % 1000 === 0 && Puntos > 16){
  let nuevoCafe = new Cafe();
    CafeG.push(nuevoCafe);
}
}
function crearRisk1() {
  if (frameCount % 100 === 0 && Puntos > 8) {
    let nuevoAtaque = new Risk1();
    muestras.push(nuevoAtaque);
  }
}
function crearRisk2() {
  if (frameCount % 150 === 0 && Puntos > 30) {
    let nuevoAtaque = new Risk2();
    muestras.push(nuevoAtaque);
  }
}
function crearRisk3() {
  if (frameCount % 200 === 0 && Puntos > 50) {
    let nuevoAtaque = new Risk3();
    muestras.push(nuevoAtaque);
  }
}
var faseActual = -1;
function State(){
  if (fase === faseActual) return;
  faseActual = fase;
  DonGui.addImage([PlayerIMG, Fase2, Fase3, Fase4][fase]);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  value = windowWidth/2000; 
  btnUp.position(width/2-40, height-160);
btnDown.position(width/2-40, height-60);
btnLeft.position(width/2-120, height-110);
btnRight.position(width/2+40, height-110);

  DonGui.position.x = windowWidth / 2;
  DonGui.position.y = windowHeight / 2;
  Estacion.position.x = windowWidth - 200;
  Estacion.position.y = windowHeight - 250;

  DonGui.scale = value * 1.5;
  Estacion.scale = value * 3.5;

  for (let i = 0; i < muestras.length; i++) {
    if (muestras[i] instanceof Virus ||
        muestras[i] instanceof Glucemia ||
        muestras[i] instanceof Hipertension ||
        muestras[i] instanceof Hiperlipidemia) {
      muestras[i].sprite.scale = value;
    } else if (muestras[i] instanceof Risk1 ||
               muestras[i] instanceof Risk2 ||
               muestras[i] instanceof Risk3) {
      muestras[i].sprite.scale = 0.5 * value;
    }
  }
  for (let i = 0; i < CafeG.length; i++) {
    CafeG[i].sprite.scale = 2 * value;
  }
}
  

function mousePressed() {
  if (!startGame || lost == true) {
    let botonX = width / 2;
    let botonY = height / 2;
    let radio = 100 * value; // Debe coincidir con el radio del círculo dibujado (diámetro/2)
    // Calcula la distancia entre el mouse y el centro
    if (dist(mouseX, mouseY, botonX, botonY) < radio) {
      startGame = true;
      lost = false;
    }
  }
}

function draw() {
smooth(); background(SmartIMG); noSmooth();
 if (lost == true){
      textFont(FUENTE);
      textSize(50 * value);
      fill("red");
      textAlign(CENTER, CENTER);
      text("¡Has perdido! Tocaste un ataque.", width/2, height/8);
      fill("#ffd166");
      text("Puntos conseguidos: " + puntosFinal, width/2, height/8 + 70 * value);
      textAlign(LEFT, BASELINE);
      }
if (!startGame || lost == true) {
  if (mouseIsPressed) mousePressed(); // p5.play rompe el evento mousePressed nativo
  let r = 100 * value, hover = dist(mouseX, mouseY, width / 2, height / 2) < r;
  drawingContext.shadowBlur = 25 * value;
  drawingContext.shadowColor = hover ? '#4fd1ff' : '#000';
  fill(hover ? '#2f7bff' : '#1d4ed8');
  stroke('white'); strokeWeight(4 * value);
  ellipse(width / 2, height / 2, 2 * r, 2 * r);
  drawingContext.shadowBlur = 0; noStroke();
  fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(32 * value);
  text(lost ? 'Reintentar' : 'Comenzar', width / 2, height / 2);
  textAlign(LEFT, BASELINE); textStyle(NORMAL);
  } else {
drawSprites();
  textos[2].posX = DonGui.position.x - 175 * value;
  textos[2].posY = DonGui.position.y - 50 * value;
  for (let i = 0; i < textos.length; i++) {
    if (textos[i].activo && textos[i].contador < FRAMES_MOSTRAR) {
      fill("white");
      textSize(37.5 * value);
      textFont(FUENTE);
      text(textos[i].mensaje, textos[i].posX, textos[i].posY);
      textos[i].contador++;
       if (textos[i].contador >= FRAMES_MOSTRAR) {
      textos[i].activo = false;
      textos[i].contador = 0;
    }
    }
  }
}

 for (let i = muestras.length - 1; i >= 0; i--) {
  let m = muestras[i];
  if (m.sprite.removed) {
    muestras.splice(i, 1);
    continue;
  }
  if (DonGui.overlap(m.sprite)) {
    if (!m.getPoints) {
      startGame = false;    
      lost = true;      
      puntosFinal = Puntos;
      Puntos = 0;                 
      MuestraCount = 0;           
      countVirus = 0;             
      countGlucemia = 0;
      countHipertension = 0;
      countHiperlipidemia = 0;

      muestras.forEach(r => r.sprite.remove());
      muestras = [];
      break;  
    } else {

      m.sprite.remove();
      muestras.splice(i, 1);
      MuestraCount += m.getPoints();

      if (m instanceof Virus) {
        countVirus++;
      } else if (m instanceof Glucemia) {
        countGlucemia++;
      } else if (m instanceof Hipertension) {
        countHipertension++;
      } else if (m instanceof Hiperlipidemia) {
        countHiperlipidemia++;
      }
    }
  }
}
  
function clasesDistintasTomadas() {
  let clases = 0;
  if (countVirus > 0) clases++;
  if (countGlucemia > 0) clases++;
  if (countHipertension > 0) clases++;
  if (countHiperlipidemia > 0) clases++;
  return clases;
}

if (clasesDistintasTomadas() > 1) {
  countVirus = 0;
  countGlucemia = 0;
  countHipertension = 0;
  countHiperlipidemia = 0;
  MuestraCount = 0;
  textos[2].activo = true;
}

fase = Math.min(Math.max(countGlucemia, countHiperlipidemia, countHipertension, countVirus), 3);
if (countGlucemia > 3 || countHiperlipidemia > 3 || countHipertension > 3 || countVirus > 3){
  fase = 0;
  countVirus = 0;
  countGlucemia = 0;
  countHipertension = 0;
  countHiperlipidemia = 0;
  MuestraCount = 0;
}

for (let i = CafeG.length - 1; i >= 0; i--) {
  let c = CafeG[i];
  if (c.sprite.removed) {
    CafeG.splice(i, 1);
    continue;
  }
  if (DonGui.overlap(c.sprite)) {
    c.sprite.remove();
    CafeG.splice(i, 1);
    speedX *= 1.2;
    speedY *= 1.15;
  }
}
textFont(FUENTE);
textSize(75 * value);
textStyle(BOLD); drawingContext.shadowBlur = 8; drawingContext.shadowColor = "#000";
fill("#ffd166");
text("Puntos: "+ Puntos, 25 * value,100 * value);
if (frameCount < 500 && startGame == true){
textSize(30 * value);
text("Deja aqui tus muestras", windowWidth - 420 * value, windowHeight - 225 * value)
}
drawingContext.shadowBlur = 0; textStyle(NORMAL);
Move();
crearMuestra();
createCafe();
crearRisk1();
crearRisk2();
crearRisk3();
Puntuacion();
State();
}