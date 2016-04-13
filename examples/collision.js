// Using an Object Layer to limit movement and changing Map Tiles.
var tmap, smiley, plantsIndex, viewWalls = false;
var x, y, prevx, prevy;

function preload() {
  tmap = loadTiledMap("desert", "data");
  smiley = loadImage("data/smiley.png");
}

function setup() {
  createCanvas(800, 600);
  walls = createGraphics(800, 600);
  initializeMap();
  plantsIndex = [31,38,39,40,47,48];
  fill(255);
}

function draw() {
  background(tmap.getBackgroundColor());
  tmap.draw(x, y);// Walls layer is invisible...
  if(viewWalls) {
    imageMode(CORNER);
    image(walls, 0, 0);
  }
  imageMode(CENTER);
  image(smiley, width / 2, height / 2);
  textSize(24);
  text("ADWS to move, L to view walls", 10, 50);
  text("Center: Map coordinates: " + round(x*100)/100 + ", " + round(y*100)/100, 10, 100);
  text("Over Color: " + color(walls.get(walls.width / 2, walls.height / 2)), 10, 150);
  text("Over Tile Index: " + tmap.getTileIndex(0, int(round(x)), int(round(y))), 10, 200);
  if(plantsIndex.indexOf(tmap.getTileIndex(0, round(x), round(y))) >= 0) {
    tmap.setTileIndex(0, round(x), round(y), 30);
  }
  if (keyIsPressed) {
    prevx = x;
    prevy = y;
    if(key == 'a' || key == 'A') x -= 0.25;
    if(key == 'd' || key == 'D') x += 0.25;
    if(key == 'w' || key == 'W') y -= 0.25;
    if(key == 's' || key == 'S') y += 0.25;
    walls.clear();
    tmap.drawLayer(1, x, y, walls);// ...So we draw it on a separate canvas (and only when we need it).
    //Comparing 2 colors won't work. We compare Color Strings.
    if (color(walls.get(walls.width / 2, walls.height / 2)).toString() == tmap.getObjectsColor(1).toString()) {
      x = prevx;
      y = prevy;
    }
  }
}

function keyPressed(){
  if(key == 'l' || key == 'L') viewWalls = !viewWalls;
}

function initializeMap() {
  tmap.setPositionMode("MAP");
  tmap.setDrawMode(CENTER);
  var p = tmap.getMapSize();
  x = p.x / 2;
  y = p.y / 2;
}
