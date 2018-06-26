// If you need to use layer opacity, you must draw each layer on a different canvas.
// and join them later.

var tmap, layer0, layer1, layer2;

function preload() {
  tmap = loadTiledMap("perspective_walls", "data");
}

function setup() {
  createCanvas(800, 600);
  fill(0);
  textSize(24);
  layer0 = createGraphics(width, height);
  layer1 = createGraphics(width, height);
  layer2 = createGraphics(width, height);
}

function draw(){
  background(tmap.getBackgroundColor());
  tmap.drawLayer(0, 100, 200, layer0);
  tmap.drawLayer(1, 100, 200, layer1);
  tmap.drawLayer(2, 100, 200, layer2);
  image(layer0, 0, 0);
  image(layer1, 0, 0);
  image(layer2, 0, 0);
  text("A - Z Keys to change opacity", 10, 50);
}

function keyPressed(){
  if(key == 'a' || key == 'A'){
    tmap.setOpacity(0, min(1, tmap.getOpacity(0) + 0.2));
    if(tmap.getOpacity(0) == 1) tmap.setOpacity(1, min(1, tmap.getOpacity(1) + 0.2));
    if(tmap.getOpacity(1) == 1) tmap.setOpacity(2, min(1, tmap.getOpacity(2) + 0.2));
  }
  if(key == 'z' || key == 'Z'){
    tmap.setOpacity(2, max(0, tmap.getOpacity(2) - 0.2));
    if(tmap.getOpacity(2) == 0) tmap.setOpacity(1, max(0, tmap.getOpacity(1) - 0.2));   
    if(tmap.getOpacity(1) == 0) tmap.setOpacity(0, max(0, tmap.getOpacity(0) - 0.2));   
  }
}
