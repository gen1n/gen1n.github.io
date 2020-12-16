"use strict";
var select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  }, 
  animationWindow = select('#animContainer'),    
    animData = {
		wrapper: animationWindow,
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: true,
		path: 'data.json'
	}, anim;


anim = lottie.loadAnimation(animData);
 anim.addEventListener('DOMLoaded', onDOMLoaded);