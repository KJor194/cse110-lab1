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
  x: 400,
  y: 300, 
  points: [336, 430, 359, 410, 370, 407, 381, 410, 404, 430, 381, 450, 370, 453, 359, 450],
  fill: '#FFFF00',
  stroke: 'black',
  strokeWidth: 5,
  closed: true,
  tension: 0.3,
});

//Moving center of lemon from origin to its center:
const box = lemon.getClientRect({ relativeTo: lemon }); 
lemon.offsetX(box.width / 2 + box.x);
lemon.offsetY(box.height / 2 + box.y);

// Adding events to the mouse
//When the mouse is over the lemon, the mouse cursor turns into pointer:
lemon.on('mouseover', function (e) {
  e.target.getStage().container().style.cursor = 'pointer';
});

//When the mouse is off of the lemon, the mouse cursor turns back to the default cursor:
lemon.on('mouseout', function (e) {
  e.target.getStage().container().style.cursor = 'default';
});

//Adding events to the lemon
//Animating the oscillation

const amplitude = 10;
const speed = 0.05;

const animation = new Konva.Animation((frame) => {
  // frame.time is total elapsed time in ms
  lemon.rotation(amplitude * Math.sin(frame.time * speed));
}, layer);

//Recording original orientation:

const og_orientation = lemon.rotation();

//Scaling up by 50% on mousedown
const clickScale = 1.5;

//On mousedown, the lemon oscillates, is draggable, and scales up
lemon.on('mousedown', () => {
  lemon.draggable(true);
  lemon.scale({x: 1.5, y: 1.5});
  animation.start();
});

//On mouseup, the lemon stops oscillating, reverts to its original orientation, can no longer be dragged, and scales back to original size
lemon.on('mouseup', () => {
  lemon.draggable(false);
  lemon.scale({x: 1, y: 1});
  animation.stop();
  lemon.rotation(og_orientation);
});



// add the shape to the layer
layer.add(lemon);

// add the layer to the stage
stage.add(layer);
