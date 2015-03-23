
// Adapted from:
// http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/

K.Key = function()
{
};

K.Key._pressed = {};

K.Key.P = 80;
K.Key.LEFT = 37;
K.Key.UP = 38;
K.Key.RIGHT = 39;
K.Key.DOWN = 40;

K.Key.isDown = function(keyCode)
{
  return K.Key._pressed[keyCode];
};

K.Key.onKeydown = function(event)
{
  K.Key._pressed[event.keyCode] = true;
};

K.Key.onKeyup = function(event)
{
  delete K.Key._pressed[event.keyCode];
};

window.addEventListener('keyup', function(event) { K.Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { K.Key.onKeydown(event); }, false);
