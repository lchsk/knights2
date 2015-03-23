K.Easing = function()
{

};

K.Easing.prototype.constructor = K.Easing;

K.Easing.linear = function(t){ return t };
K.Easing.easeInQuad = function(t){ return t*t };
K.Easing.easeOutQuad = function(t){ return t*(2-t) };
K.Easing.easeInOutQuad = function(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t };
K.Easing.easeInCubic = function(t){ return t*t*t };
K.Easing.easeOutCubic = function(t){ return (--t)*t*t+1 };
K.Easing.easeInOutCubic = function(t){ return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
K.Easing.easeInQuart = function(t){ return t*t*t*t };
K.Easing.easeOutQuart = function(t){ return 1-(--t)*t*t*t };
K.Easing.easeInOutQuart = function(t){ return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t };
K.Easing.easeInQuint = function(t){ return t*t*t*t*t };
K.Easing.easeOutQuint = function(t){ return 1+(--t)*t*t*t*t };
K.Easing.easeInOutQuint = function(t){ return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t };
