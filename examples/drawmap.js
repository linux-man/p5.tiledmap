// A basic example
var tmap, s, stagIndex;
var x = 0, y = 0;
var showCoords = false;

function preload() {
  tmap = loadTiledMap("desert", "data");
}

function setup() {
  createCanvas(800, 600);
  ellipseMode(CENTER);
  s = tmap.getMapSize();
  fill(0);
}

function draw() {
  background(tmap.getBackgroundColor());
  tmap.draw(x, y);
  if(showCoords) {
    textSize(8);
    for (var nx = 0; nx < s.x; nx++)
    for (var ny = 0; ny < s.y; ny++){
      var p = tmap.mapToCam(createVector(nx, ny));
      ellipse(p.x, p.y, 4, 4);
      text(nx + "," + ny, p.x, p.y);
    }
  }
  textSize(24);
  text("ADWS to move, Z to toogle Map Coordinates, C to change map", 10, 50);
  text("Corner: Canvas coordinates: " + x + ", " + y, 10, 100);
  text("Corner: Map coordinates: " + tmap.canvasToMap(x, y).x + ", " + tmap.canvasToMap(x, y).y, 10, 150);
  text("Map Name: " + tmap.getName(), 10, 200);
  text("Map Orientation: " + tmap.getOrientation(), 10, 250);
  if(tmap.getOrientation() == "staggered" || tmap.getOrientation() == "hexagonal") {
    stagIndex = tmap.staggerindex == 0 ? "odd" : "even";
    text("Stagger Info: " + tmap.staggeraxis + "," + stagIndex, 410, 250);
  }
  text("Map Size: " + tmap.getMapSize(), 10, 300);
  text("Layer 0 Type: " + tmap.getType(0), 10, 350);



  if (keyIsPressed) {
    if(key == 'a' || key == 'A') x -= tmap.getTileSize().x / 2;
    if(key == 'd' || key == 'D') x += tmap.getTileSize().x / 2;
    if(key == 'w' || key == 'W') y -= tmap.getTileSize().y / 2;
    if(key == 's' || key == 'S') y += tmap.getTileSize().y / 2;
  }
}

function keyPressed(){
  if(key == 'z' || key == 'Z') showCoords = !showCoords;
  if(key == 'c' || key == 'C') changeMap();
}

function changeMap(){
  x = 0;
  y = 0;
  switch(tmap.getName()){
    case "desert":
      // tmap = loadTiledMap("isometric_grass_and_water", "data"); might work here
      // but callback functions are soooo cool!
      loadTiledMap("isometric", "data", mapLoaded);
      fill(255);
      break;
    case "isometric":
      loadTiledMap("staggered_x_even", "data", mapLoaded);
      fill(255);
      break;
    case "staggered_x_even":
      loadTiledMap("staggered_x_odd", "data", mapLoaded);
      fill(255);
      break;
    case "staggered_x_odd":
      loadTiledMap("staggered_y_even", "data", mapLoaded);
      fill(255);
      break;
    case "staggered_y_even":
      loadTiledMap("staggered_y_odd", "data", mapLoaded);
      fill(255);
      break;
    case "staggered_y_odd":
      loadTiledMap("hexagonal", "data", mapLoaded);
      fill(0);
      break;
    case "hexagonal":
      loadTiledMap("perspective_walls", "data", mapLoaded);
      fill(0);
      break;
    case "perspective_walls":
      loadTiledMap("desert", "data", mapLoaded);
      fill(0);
      break;
  }
}

function mapLoaded(newMap) {
  tmap = newMap;
  s = tmap.getMapSize();
}
