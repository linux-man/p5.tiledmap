// Moving around Map (using Map coordinates and getTiledIndex)
var tmap, smiley, walls, wallsIndex;
var x, y, prevx, prevy;

function preload() {
  tmap = loadTiledMap("desert", "data");
  smiley = loadImage("data/smiley.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
  initializeMap();
  wallsIndex = [1,2,3,9,10,11,17,18,19,20,21,25,26,27,28,29,32,33,34,35,36,37,41,42,43,44,45,46];
}

function draw() {
  background(tmap.getBackgroundColor());
  tmap.draw(x, y);
  image(smiley, width / 2, height / 2);
  textSize(24);
  text("ADWS to move, C to change map, L to restrict movement", 10, 50);
  text("Center: Map coordinates: " + round(x*100)/100 + ", " + round(y*100)/100, 10, 100);
  text("Center: Canvas coordinates: " + round(tmap.mapToCanvas(x, y).x*100)/100 + ", " + round(tmap.mapToCanvas(x, y).y*100)/100, 10, 150);
  text("Over Tile Index: " + tmap.getTileIndex(0, int(round(x)), int(round(y))), 10, 200);
  if (walls) text("Restricted Movement.", 350, 200);
  if (keyIsPressed) {
    prevx = x;
    prevy = y;
    if(key == 'a' || key == 'A') x -= 0.25;
    if(key == 'd' || key == 'D') x += 0.25;
    if(key == 'w' || key == 'W') y -= 0.25;
    if(key == 's' || key == 'S') y += 0.25;
    if (walls && wallsIndex.indexOf(tmap.getTileIndex(0, round(x), round(y))) >= 0) {
      x = prevx;
      y = prevy;
    }

  }
}

function keyPressed(){
  if(key == 'l' || key == 'L') walls = !walls;
  if(key == 'c' || key == 'C') changeMap();
}

function changeMap(){
  switch(tmap.getName()){
    case "desert":
      loadTiledMap("isometric", "data", mapLoaded);
      wallsIndex = [5,9,10,12,13,16,17,20,22,23,24];
      fill(255);
      stroke(255);
      break;
    case "isometric":
      loadTiledMap("staggered_x_even", "data", mapLoaded);
      wallsIndex = [5,9,10,12,13,16,17,20,22,23,24];
      fill(255);
      stroke(255);
      break;
    case "staggered_x_even":
      loadTiledMap("staggered_x_odd", "data", mapLoaded);
      wallsIndex = [5,9,10,12,13,16,17,20,22,23,24];
      fill(255);
      stroke(255);
      break;
    case "staggered_x_odd":
      loadTiledMap("staggered_y_even", "data", mapLoaded);
      wallsIndex = [5,9,10,12,13,16,17,20,22,23,24];
      fill(255);
      stroke(255);
      break;
    case "staggered_y_even":
      loadTiledMap("staggered_y_odd", "data", mapLoaded);
      wallsIndex = [5,9,10,12,13,16,17,20,22,23,24];
      fill(255);
      stroke(255);
      break;
    case "staggered_y_odd":
      loadTiledMap("hexagonal", "data", mapLoaded);
      wallsIndex = [8,10];
      fill(255);
      stroke(255);
      break;
    case "hexagonal":
      loadTiledMap("desert", "data", mapLoaded);
      wallsIndex = [1,2,3,9,10,11,17,18,19,20,21,25,26,27,28,29,32,33,34,35,36,37,41,42,43,44,45,46];
      fill(0);
      stroke(0);
      break;
  }
}

function mapLoaded(newMap) {
  tmap = newMap;
  initializeMap();
}

function initializeMap() {
  tmap.setPositionMode("MAP");
  tmap.setDrawMode(CENTER);
  walls = false;
  var p = tmap.getMapSize();
  x = p.x / 2;
  y = p.y / 2;
}
