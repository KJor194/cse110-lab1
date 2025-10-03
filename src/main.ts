import Konva from 'konva';

// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();
stage.add(layer);

// create our shape

const lemon = new Konva.Line({
  offsetX: 220,
  offsetY: 290,
  points: [236, 330, 259, 310, 270, 307, 281, 310, 304, 330, 281, 350, 270, 353, 259, 350],
  //points: [336, 430, 359, 410, 370, 407, 381, 410, 404, 430, 381, 450, 370, 453, 359, 450],
  fill: '#FFFF00',
  stroke: 'black',
  strokeWidth: 5,
  closed: true,
  tension: 0.3,
});

// Adding events to the lemon

lemon.on('mouseover', function (e) {
  e.target.getStage().container().style.cursor = 'pointer';
});

lemon.on('mouseout', function (e) {
  e.target.getStage().container().style.cursor = 'default';
});


//const animation = new Konva.Animation(function(frame){

//}, layer);

const ogState = {
  scaleX: lemon.scaleX(),
  scaleY: lemon.scaleY(),
  rotation: lemon.rotation(),
  fill: lemon.fill()
};

const clickScale = 1.5;  // scale up by 50% on click

lemon.on('mousedown', () => {
  lemon.draggable(true); // allow dragging while held
  lemon.scale({x: 1.5, y: 1.5});
});

lemon.on('mouseup', () => {
  lemon.draggable(false); // stop dragging when released
  lemon.scale({x: 1, y: 1});
});



// add the shape to
// the layer
//layer.add(circle);
layer.add(lemon);

// add the layer to the stage
stage.add(layer);

