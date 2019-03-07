/*
lottie.loadAnimation({
  container: animContainer, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // the path to the animation json
});
*/
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
		prerender: false,
		autoplay: false,
		path: 'data.json'
	}, anim;

	anim = lottie.loadAnimation(animData);
 anim.addEventListener('DOMLoaded', onDOMLoaded);
 //anim.setSpeed(15);

function onDOMLoaded(e){
  
 animationWindow.onclick = function(e){
  if(anim.currentFrame == 0){
   anim.playSegments([anim.currentFrame, 20], true);
      
  } else {
   
   anim.playSegments([anim.currentFrame, 0], true)
  }
 }
}

