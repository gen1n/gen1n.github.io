(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ERPScr1BuoySharks_atlas_1", frames: [[0,55,29,11],[83,70,3,6],[122,55,4,7],[122,64,4,7],[118,0,7,16],[64,61,10,6],[88,70,3,6],[118,18,7,16],[115,46,10,7],[101,68,17,10],[101,55,19,11],[0,68,12,17],[115,36,10,8],[77,55,22,13],[51,0,35,29],[69,70,12,7],[38,31,37,17],[0,31,36,22],[14,70,17,8],[77,36,36,17],[33,70,14,8],[38,50,37,9],[31,61,31,7],[0,0,49,29],[88,0,28,34],[49,70,18,5]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_496 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_493 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_492 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_494 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_490 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_491 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_495 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_489 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_488 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_486 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_485 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_482 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_487 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_481 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_484 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_483 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_479 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_480 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_476 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_478 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_475 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_474 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_473 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_477 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_471 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_472 = function() {
	this.initialize(ss["ERPScr1BuoySharks_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_496();
	this.instance.setTransform(-7.1,-1.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_495();
	this.instance_1.setTransform(0.8,-15.25,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_494();
	this.instance_2.setTransform(0.8,-15.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_493();
	this.instance_3.setTransform(-2.05,-15.25,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_492();
	this.instance_4.setTransform(-2.5,-15.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_491();
	this.instance_5.setTransform(-2.4,-18.25,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_490();
	this.instance_6.setTransform(-3.55,-16.8,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_489();
	this.instance_7.setTransform(0.05,-16.8,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_488();
	this.instance_8.setTransform(-2.45,-11.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_487();
	this.instance_9.setTransform(-2.45,-10.25,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_486();
	this.instance_10.setTransform(-4.2,-9.9,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_485();
	this.instance_11.setTransform(-4.6,-10.05,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_484();
	this.instance_12.setTransform(-8.95,-8.2,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_483();
	this.instance_13.setTransform(-2.95,-8.1,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_482();
	this.instance_14.setTransform(-2.95,-6.35,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_481();
	this.instance_15.setTransform(-5.5,-2.85,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_480();
	this.instance_16.setTransform(-8.95,-1.15,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_479();
	this.instance_17.setTransform(-9.1,4.6,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_478();
	this.instance_18.setTransform(-9.05,6.9,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_477();
	this.instance_19.setTransform(-12.35,4.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-18.2,24.5,36.8);


(lib.a = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_476();
	this.instance.setTransform(7.1,-10.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_475();
	this.instance_1.setTransform(5.65,-6.05,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_474();
	this.instance_2.setTransform(-15.4,-10.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_473();
	this.instance_3.setTransform(-4.45,-9.1,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_472();
	this.instance_4.setTransform(-11,-7.3,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_471();
	this.instance_5.setTransform(-8.1,-6.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.a, new cjs.Rectangle(-15.4,-10.9,31,21.700000000000003), null);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.a = new lib.a();
	this.a.name = "a";
	this.a.setTransform(11,7.85,0.72,0.72,0,180,0);

	this.timeline.addTween(cjs.Tween.get(this.a).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(-0.1,0.1,22.400000000000002,15.6), null);


(lib.shark = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(12.1,8.55,1,1,0,0,0,12,8.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(66).to({skewY:180,x:12},1).wait(74).to({skewY:0,x:12.1},1).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,24.1,15.7);


(lib.buoy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(12.35,18.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.buoy, new cjs.Rectangle(0,0,24.5,36.8), null);


(lib.sharkAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// shark
	this.instance = new lib.shark();
	this.instance.setTransform(106.5,40.2,1,1,-14.9992,0,0,10.9,11.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-14.9985,guide:{path:[106.4,40.1,102.9,41.8,98,43.1,81.7,47.7,58.1,47.7,34.7,47.7,18.4,43.1,9.4,40.6,4.8,37.1,0.3,33.7,0.3,29.4,0.3,26.3,2.6,23.8]}},67).to({rotation:-14.9992,guide:{path:[2.6,23.7,5.2,20.7,10.6,18.4]}},7).to({regX:11,regY:11.8,rotation:0,guide:{path:[10.7,18.4,14,16.9,18.4,15.7,34.6,11.1,58.1,11.1,61.3,11.1,64.3,11.2]}},32).to({rotation:-12.5564,guide:{path:[64.3,11.3,83.9,11.8,98,15.7,111.1,19.4,114.7,24.9]}},36).to({regX:10.9,regY:11.9,rotation:-14.9992,guide:{path:[114.7,24.9,116.1,27,116.1,29.4,116.1,31.6,114.9,33.5]}},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-10.1,-0.9,138.1,54.5);


(lib.shark2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(12.1,8.55,1,1,0,0,0,12,8.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(33).to({skewY:180,x:12},1).wait(74).to({skewY:0,x:12.1},1).wait(41));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,24.1,15.7);


(lib.sharkAnim2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.shark2();
	this.instance.setTransform(53.6,47.7,1,1,0,0,0,9.9,11.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:10,rotation:14.9992,guide:{path:[53.6,47.7,33,47.3,18.4,43.2,14.9,42.2,12.1,41.1]}},23).to({rotation:2.0621,guide:{path:[12.1,41.1,0.3,36.4,0.3,29.4,0.3,29.1,0.4,28.8]}},10).to({regX:10.1,rotation:-13.4611,guide:{path:[0.3,28.8,0.9,20.7,17.8,15.8]}},12).to({regX:9.9,rotation:0,guide:{path:[17.9,15.9,18.1,15.8,18.4,15.7,34.6,11.1,58.1,11.1,58.4,11.1,58.7,11.1]}},22).to({regX:10,rotation:23.2273,guide:{path:[58.8,11.1,81.9,11.2,98,15.7,102.4,16.9,105.7,18.3]}},31).to({rotation:10.175,guide:{path:[105.7,18.3,115.4,22.5,116.1,28.5]}},10).to({rotation:-12.0124,guide:{path:[116.1,28.5,116.1,29,116.1,29.4,116.1,33.7,111.6,37.2,107.1,40.6,98,43.2,97,43.4,96,43.7]}},17).to({regX:9.9,rotation:0,guide:{path:[96,43.7,80.4,47.7,58.5,47.7]}},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.7,-0.7,137.7,52.6);


// stage content:
(lib.ERP_scr1_buoySharks = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(150));

	// buoy
	this.instance = new lib.buoy();
	this.instance.setTransform(105.5,73.4,1,1,-3.487,0,0,12.4,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-5.4382,y:75.95},29,cjs.Ease.quadInOut).to({rotation:0.0542,y:72.55},30,cjs.Ease.quadInOut).to({regX:12.5,rotation:2.7577,x:105.55,y:76.25},30,cjs.Ease.quadInOut).to({regX:12.6,regY:18.4,rotation:0.0166,x:105.65,y:73.15},30,cjs.Ease.quadInOut).to({regX:12.4,regY:18.3,rotation:-3.487,x:105.5,y:73.4},30,cjs.Ease.quadInOut).wait(1));

	// buoy_mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AxIqcMAg3gCAIBaW5Mgg3ACAgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAmASQAlATAygDQA0gDAigYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_1 = new cjs.Graphics().p("AxIqbMAg3gCBIBaW4Mgg3ACBgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAmASQAlATAygDQA0gDAigYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_2 = new cjs.Graphics().p("AxIqbMAg3gCBIBaW4Mgg3ACBgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAmASQAlATAygDQA0gDAigYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_3 = new cjs.Graphics().p("AxIqbMAg3gCBIBaW4Mgg3ACBgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAmASQAlATAygDQA0gEAigXQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_4 = new cjs.Graphics().p("AxJqaMAg3gCDIBcW4Mgg3ACDgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCALIghBrIgEALIACAWQghAYACAdQADAdAlASQAlATAygDQA0gEAigXQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgPg7IgZgMg");
	var mask_graphics_5 = new cjs.Graphics().p("AxJqZMAg3gCFIBcW4Mgg3ACFgAgiilIgIA9IAMAFIAAAFIgIAEQgKAGgCALIghBrIgEALIACAXQghAXACAdQADAdAlASQAmATAxgDQA0gEAjgXQAhgWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgPg7IgZgMg");
	var mask_graphics_6 = new cjs.Graphics().p("AxKqYMAg3gCHIBeW4Mgg3ACHgAgjilIgHA9IAMAFIAAAFIgIAEQgKAGgCALIghBrIgEALIACAXQghAXACAdQADAdAlASQAmATAygDQAzgEAjgXQAhgWgBgdQgBgdgigSIgBgSQgBgJgFgHIgwhrIAAgCQgFgGgIgDIgHgDIgBgFIALgIIgPg7IgagMg");
	var mask_graphics_7 = new cjs.Graphics().p("AxKqXMAg2gCJIBfW4Mgg2ACJgAgjilIgHA9IALAFIABAFIgIAEQgLAHgBAKIghBsIgEAKIACAXQghAXADAdQACAdAlASQAmATAygDQAzgEAjgXQAhgWgBgdQgBgdgigTIgBgRQgBgJgFgHIgwhrIAAgCQgFgGgIgDIgHgDIgBgFIALgIIgPg7IgagMg");
	var mask_graphics_8 = new cjs.Graphics().p("AxLqWMAg2gCLIBhW4Mgg2ACLgAgjilIgIA9IAMAFIABAFIgIAEQgLAHgBAKIghBsIgEAKIACAXQghAYADAcQACAdAlASQAmATAygDQAzgEAjgXQAigWgCgdQgBgdgigTIgBgRQgBgJgFgHIgwhrIgBgCQgFgGgHgEIgHgDIgBgEIALgIIgPg7IgagMg");
	var mask_graphics_9 = new cjs.Graphics().p("AxMqUMAg2gCOIBjW3Mgg2ACOgAgjilIgIA9IAMAFIABAFIgIAEQgLAHgBAKIghBsIgEALIACAWQghAYADAdQACAcAmATQAlASAygDQA0gEAigXQAigXgCgdQgBgcgigTIgBgRQgBgJgFgHIgxhrIAAgCQgFgHgHgDIgIgDIAAgFIALgHIgPg7IgagMg");
	var mask_graphics_10 = new cjs.Graphics().p("AxNqTMAg2gCRIBlW4Mgg2ACRgAgkilIgHA9IAMAFIAAAFIgHAEQgLAHgBAKIghBsIgEALIACAWQggAYACAdQADAdAlASQAmASAygDQAzgEAigXQAigXgCgdQAAgcgjgTIgBgRQgBgJgFgHIgxhrIAAgCQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_11 = new cjs.Graphics().p("AxOqRMAg2gCVIBnW4Mgg2ACVgAgkilIgHA9IAMAGIAAAEIgIAEQgKAHgBAKIghBsIgDALIABAWQggAYACAdQADAdAlASQAmASAygDQAzgEAjgYQAhgWgBgdQgBgcgjgTIgBgSQgBgJgFgGIgxhrIAAgCQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_12 = new cjs.Graphics().p("AxPqPMAg1gCYIBqW3Mgg1ACYgAgkilIgHA9IAMAGIAAAEIgIAEQgKAHgBAKIghBsIgDALIABAWQggAYACAdQADAdAlASQAmASAygDQA0gEAigYQAhgWgBgdQgBgdgjgSIgBgSQgBgJgFgGIgxhsIAAgBQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_13 = new cjs.Graphics().p("AxRqMMAg1gCdIBuW2Mgg1ACdgAgkilIgHA9IAMAGIAAAEIgIAEQgKAHgCAKIggBsIgDALIABAXQggAYADAcQACAdAmASQAmASAygEQAzgDAigYQAigXgCgcQgBgdgjgSIgBgSQgBgJgFgHIgxhrIAAgBQgFgHgIgDIgHgDIgBgFIALgHIgQg7IgagMg");
	var mask_graphics_14 = new cjs.Graphics().p("AxSqKMAg1gCiIBwW3Mgg1ACigAglilIgHA9IAMAGIABAEIgIAEQgLAHgBAKIggBtIgDAKIACAXQghAYADAdQADAdAlARQAmASAygEQAzgDAjgYQAhgXgCgdQgBgcgigTIgCgRQAAgJgFgHIgyhrIAAgBQgGgHgHgDIgIgDIAAgFIALgHIgQg7IgagMg");
	var mask_graphics_15 = new cjs.Graphics().p("AxUqHMAg1gCnIB0W2Mgg1ACngAglikIgHA8IAMAGIAAAEIgHAEQgLAHgBAKIgfBtIgEALIACAWQghAYADAdQADAdAmARQAmASAxgEQA0gEAigXQAhgXgBgdQgCgdgigSIgCgRQAAgJgFgHIgzhrIAAgBQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_16 = new cjs.Graphics().p("AxVqFMAg0gCrIB3W2Mgg0ACrgAgmikIgGA8IAMAGIAAAEIgHAEQgLAHgBAKIgfBtIgEALIACAWQggAYADAdQACAdAmASQAmASAygFQAzgEAigYQAigWgCgdQgCgdgigSIgCgSQAAgJgFgGIgzhrIAAgBQgFgHgHgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_17 = new cjs.Graphics().p("AxWqDMAgzgCvIB6W2MggzACvgAgmikIgGA8IAMAGIAAAEIgIAFQgKAGgBALIgfBsIgEALIACAWQggAZADAcQADAdAlASQAmASAygFQA0gEAigYQAhgXgCgdQgBgcgjgSIgBgSQgBgJgFgGIgzhrIAAgBQgFgHgHgDIgIgDIgBgFIALgHIgQg7IgagMg");
	var mask_graphics_18 = new cjs.Graphics().p("AxYqBMAg0gCzIB9W2Mgg0ACzgAgmikIgHA8IAMAGIABAEIgIAFQgKAHgBAKIgfBsIgEALIACAWQggAZADAdQADAcAmASQAmASAygFQAzgEAigYQAhgXgCgdQgBgcgjgSIgBgSQgBgJgFgGIgzhrIAAgCQgFgGgIgDIgHgDIgBgFIALgHIgQg7IgbgMg");
	var mask_graphics_19 = new cjs.Graphics().p("AxZp/MAgzgC3ICAW2MggzAC3gAgmikIgHA9IAMAFIABAFIgIAEQgKAHgCAKIgeBsIgEALIACAXQggAYADAdQADAdAmARQAmASAygFQAzgEAigYQAhgXgCgdQgBgdgjgSIgBgRQgBgJgFgHIgzhqIAAgCQgFgGgIgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_20 = new cjs.Graphics().p("Axap9MAgzgC6ICCW1MggzAC6gAgnikIgGA9IAMAFIABAFIgIAEQgLAHgBAKIgeBsIgEALIACAXQggAYADAdQADAdAmARQAmASAygFQAzgEAigYQAigXgDgdQgBgdgjgSIgBgRQgBgJgFgHIgzhqIAAgCQgGgGgHgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_21 = new cjs.Graphics().p("Axap8MAgygC8ICDW1MggyAC8gAgnikIgGA9IAMAFIAAAFIgHAEQgLAHgBAKIgeBtIgEAKIACAXQggAYAEAdQADAdAlARQAnASAxgFQA0gEAigYQAhgYgCgcQgCgdgjgSIgBgRQgBgJgFgHIgzhqIgBgCQgFgGgHgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_22 = new cjs.Graphics().p("Axbp6MAgygDAICFW1MggyADAgAgnikIgGA9IAMAFIAAAFIgHAEQgLAHgBAKIgeBtIgEALIADAWQggAYADAdQADAdAmARQAmASAygFQAzgEAigZQAhgXgCgdQgCgcgjgSIgBgRQgBgJgFgHIg0hqIAAgCQgFgGgHgDIgIgDIAAgFIAKgHIgQg7IgbgMg");
	var mask_graphics_23 = new cjs.Graphics().p("Axcp5MAgygDCICHW1MggyADCgAgnikIgGA9IAMAFIAAAFIgHAEQgLAHgBAKIgeBtIgDALIACAWQggAZADAcQADAdAmARQAmASAygFQAzgFAigYQAhgXgCgdQgCgcgjgSIgBgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIAAgFIAKgHIgRg7IgagMg");
	var mask_graphics_24 = new cjs.Graphics().p("Axcp4MAgxgDEICIW1MggxADEgAgnikIgGA9IAMAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAcAmARQAmASAygFQAzgFAigYQAhgXgCgdQgCgcgjgSIgBgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgHIgRg7IgagMg");
	var mask_graphics_25 = new cjs.Graphics().p("Axdp3MAgygDFICJW0MggyADFgAgoikIgFA9IAMAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAcAmARQAmASAygFQAzgFAigYQAhgXgCgdQgCgcgigSIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgHIgRg7IgagMg");
	var mask_graphics_26 = new cjs.Graphics().p("Axdp3MAgxgDGICKW1MggxADGgAgoikIgFA9IAMAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAcAmASQAmARAygFQAzgFAigYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgHIgRg7IgagMg");
	var mask_graphics_27 = new cjs.Graphics().p("Axep2MAgygDHICLW0MggyADHgAgoikIgGA9IANAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAdAmARQAnARAxgFQA0gFAhgYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgIIgRg6IgagMg");
	var mask_graphics_28 = new cjs.Graphics().p("Axep2MAgygDHICLW0MggyADHgAgoikIgGA9IANAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAdAmARQAnARAxgFQA0gFAhgYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgIgDIgHgDIgBgFIALgIIgRg6IgagMg");
	var mask_graphics_29 = new cjs.Graphics().p("Axep2MAgygDIICLW1MggyADIgAgoikIgGA9IAMAFIABAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAdAmARQAnARAxgFQA0gFAhgYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgIgDIgHgDIgBgFIALgIIgRg6IgagMg");
	var mask_graphics_30 = new cjs.Graphics().p("Axep2MAgygDHICLW0MggyADHgAgoikIgGA9IANAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAdAmARQAnARAxgFQA0gFAhgYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgIIgRg6IgagMg");
	var mask_graphics_31 = new cjs.Graphics().p("Axdp3MAgxgDGICKW1MggxADGgAgoikIgFA9IAMAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAcAmARQAmASAygFQAzgFAigYQAhgXgCgdQgCgdgigRIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgHIgRg7IgagMg");
	var mask_graphics_32 = new cjs.Graphics().p("Axdp4MAgygDEICJW1MggyADEgAgnikIgGA9IAMAFIAAAFIgIAEQgKAHgBAKIgeBtIgDALIACAWQggAZADAdQADAcAmARQAmASAygFQAzgFAigYQAhgXgCgdQgCgcgigSIgCgSQgBgJgFgGIg0hqIAAgCQgFgGgHgDIgIgDIgBgFIALgHIgRg7IgagMg");
	var mask_graphics_33 = new cjs.Graphics().p("Axcp6MAgygDAICHW1MggyADAgAgnikIgGA9IAMAFIAAAFIgHAEQgLAHgBAKIgeBtIgEALIADAWQggAZADAcQADAdAmARQAmASAygFQAzgEAigZQAhgXgCgdQgCgcgjgSIgBgSQgBgIgFgHIg0hqIAAgCQgFgGgHgDIgIgDIAAgFIAKgHIgRg7IgagMg");
	var mask_graphics_34 = new cjs.Graphics().p("Axap8MAgygC8ICDW1MggyAC8gAgnikIgGA9IAMAFIAAAFIgHAEQgLAHgBAKIgeBtIgEAKIACAXQggAYAEAdQADAdAlARQAnASAxgFQA0gEAigYQAhgYgCgcQgCgdgjgSIgBgRQgBgJgFgHIgzhqIgBgCQgFgGgHgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_35 = new cjs.Graphics().p("AxZp+MAgzgC4ICAW1MggzAC4gAgnikIgGA9IAMAFIABAFIgIAEQgKAHgCAKIgeBsIgEALIACAXQggAYADAdQADAdAmARQAmASAygFQAzgEAigYQAhgXgCgdQgBgdgjgSIgBgRQgBgJgFgHIgzhqIAAgCQgFgGgIgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_36 = new cjs.Graphics().p("AxXqBMAgzgCyIB8W1MggzACygAgmikIgGA8IAMAGIAAAEIgIAFQgKAHgBAKIgfBsIgEALIACAWQggAZADAdQADAcAlASQAnASAxgFQA0gEAigYQAhgXgCgdQgBgcgjgSIgBgSQgBgJgFgGIgzhrIAAgCQgFgGgIgDIgHgDIgBgFIALgHIgQg7IgagMg");
	var mask_graphics_37 = new cjs.Graphics().p("AxVqFMAg0gCrIB3W2Mgg0ACrgAgmikIgGA8IAMAGIAAAEIgHAEQgLAHgBAKIgfBtIgEALIACAWQggAYADAdQACAdAmASQAmASAygFQAzgEAigYQAigWgCgdQgCgdgigSIgCgSQAAgJgFgGIgzhrIAAgBQgFgHgHgDIgIgDIAAgFIAKgHIgQg7IgagMg");
	var mask_graphics_38 = new cjs.Graphics().p("AxTqJMAg1gCkIByW3Mgg1ACkgAglilIgHA9IAMAGIABAEIgIAEQgLAHgBAKIgfBtIgEAKIACAXQghAYADAdQADAdAlARQAmASAygEQA0gEAigXQAhgXgCgdQgBgcgigTIgCgRQAAgJgFgHIgyhrIgBgBQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_39 = new cjs.Graphics().p("AxQqNMAg1gCbIBsW2Mgg1ACbgAgkilIgHA9IAMAGIAAAEIgIAEQgKAHgCAKIggBsIgDALIABAWQggAYADAdQACAdAmASQAmASAxgDQA0gEAigYQAigWgCgdQgBgdgjgSIgBgSQgBgJgFgGIgxhsIAAgBQgFgHgHgDIgIgDIgBgFIALgHIgPg7IgagMg");
	var mask_graphics_40 = new cjs.Graphics().p("AxNqSMAg2gCSIBlW3Mgg2ACSgAgkilIgHA9IAMAFIAAAFIgHAEQgLAHgBAKIghBsIgEALIACAWQggAYACAdQADAdAlASQAmASAygDQAzgEAigXQAigXgBgdQgBgcgjgTIgBgRQgBgJgFgHIgxhrIAAgCQgFgHgHgDIgIgDIAAgFIAKgHIgPg7IgagMg");
	var mask_graphics_41 = new cjs.Graphics().p("AxKqYMAg3gCHIBeW4Mgg3ACHgAgjilIgHA9IAMAFIAAAFIgIAEQgLAHgBAKIghBrIgEALIACAXQghAXACAdQADAdAlASQAmATAygDQAzgEAjgXQAhgWgBgdQgBgdgigSIgBgSQgBgJgFgHIgwhrIAAgCQgFgGgIgDIgHgDIgBgFIALgIIgPg7IgagMg");
	var mask_graphics_42 = new cjs.Graphics().p("AxGqeMAg3gB8IBWW5Mgg3AB8gAgiilIgIA8IAMAGIAAAFIgHAEQgLAGgBAKIgiBsIgEALIABAWQggAYACAdQACAdAlASQAmATAygDQAzgDAjgXQAigWgCgdQAAgdgigTIgBgRQgBgJgFgHIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIALgHIgPg8IgagMg");
	var mask_graphics_43 = new cjs.Graphics().p("AxCqkMAg3gBwIBOW5Mgg3ABwgAghilIgIA8IAMAGIAAAEIgIAEQgLAHgBAKIgiBsIgEAKIABAXQghAXACAdQACAdAlASQAmATAygCQAzgDAjgXQAigWgBgdQgBgcgigTIgBgSQAAgJgFgHIgvhsIAAgBQgFgHgIgDIgHgDIAAgFIAKgHIgOg8IgagMg");
	var mask_graphics_44 = new cjs.Graphics().p("Aw+qrMAg4gBjIBFW6Mgg4ABjgAggimIgJA9IAMAGIAAAEIgHAEQgLAHgCAKIgjBrIgEALIACAWQghAXABAdQACAdAlATQAmATAygCQAzgDAjgWQAigWgBgdQAAgcgigUIgBgRQAAgJgFgHIgvhtIAAgBQgFgHgHgDIgIgDIAAgFIALgHIgOg8IgagMg");
	var mask_graphics_45 = new cjs.Graphics().p("Aw6qxMAg5gBWIA8W5Mgg5ABWgAgfimIgJA9IAMAGIAAAEIgIAEQgLAGgBAKIgkBrIgEALIABAXQghAXACAcQABAdAlATQAmAUAxgCQA0gCAjgXQAigVAAgdQgBgdghgTIgBgSQgBgJgEgHIguhsIAAgCQgFgHgHgDIgIgDIAAgFIALgHIgOg7IgZgNg");
	var mask_graphics_46 = new cjs.Graphics().p("Aw2q4MAg6gBJIAzW6Mgg6ABJgAgeimIgJA8IALAGIABAFIgIAEQgLAGgCAKIgkBrIgEALIABAWQghAXABAdQACAdAkATQAlAUAygCQA0gCAjgWQAigVAAgdQAAgdgigUIAAgRQgBgJgFgHIgthtIAAgCQgFgGgHgEIgHgDIgBgFIALgHIgNg7IgZgNg");
	var mask_graphics_47 = new cjs.Graphics().p("Awyq9MAg6gA/IArW6Mgg6AA/gAgdimIgKA8IAMAGIAAAFIgIAEQgLAGgBAKIglBrIgEAKIAAAXQghAWABAdQACAdAkAUQAlATAygBQA0gCAjgWQAjgVgBgdQAAgcghgUIgBgSQAAgJgFgHIgshtIAAgBQgFgHgHgDIgIgEIAAgFIALgHIgNg7IgZgNg");
	var mask_graphics_48 = new cjs.Graphics().p("AwvrDMAg6gA0IAlW7Mgg6AA0gAgcimIgKA8IALAGIABAFIgIADQgLAHgCAKIglBqIgEALIAAAWQghAXABAdQABAdAlATQAlAUAygBQAzgBAjgWQAjgVAAgdQAAgdghgUIgBgRQAAgJgFgHIgshuIAAgBQgFgHgHgDIgHgEIgBgFIALgGIgMg8IgagNg");
	var mask_graphics_49 = new cjs.Graphics().p("AwsrHMAg7gArIAeW6Mgg7AArgAgbimIgLA8IAMAGIAAAFIgIADQgLAGgCAKIglBrIgFAKIABAXQgiAWABAdQABAdAlAUQAlAUAygBQAzgBAkgWQAigVAAgdQABgcgigUIAAgSQAAgJgFgHIgshtIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgMg8IgagNg");
	var mask_graphics_50 = new cjs.Graphics().p("AwprMMAg7gAiIAYW7Mgg7AAigAgbinIgKA9IALAGIAAAEIgIAEQgKAGgCAKIgnBqIgEALIABAWQgiAXABAdQABAcAkAUQAlAVAygBQAzgBAkgVQAjgVAAgdQAAgdghgUIAAgRQAAgJgFgHIgrhuIAAgCQgFgHgHgDIgIgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_51 = new cjs.Graphics().p("AwmrQMAg7gAaIASW7Mgg7AAagAgainIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgnBqIgEALIAAAWQghAWAAAdQABAdAlAUQAkAVAygBQA0gBAkgVQAigVAAgdQABgcghgVIAAgRQgBgJgEgHIgrhuIAAgCQgFgHgHgDIgHgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_52 = new cjs.Graphics().p("AwkrTMAg7gAUIAOW7Mgg7AAUgAgainIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgnBqIgEAKIAAAXQgiAWABAdQABAdAkAUQAlAUAyAAQAzgBAkgVQAjgUAAgdQABgdghgUIgBgSQAAgJgEgHIgrhuIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_53 = new cjs.Graphics().p("AwirWMAg7gAOIAKW7Mgg7AAOgAgZinIgLA8IALAHIAAAEIgIAEQgLAGgCAKIgnBqIgEAKIAAAXQgiAVABAdQAAAdAlAVQAkAUAyAAQA0AAAkgWQAigUABgdQABgcgigVIAAgSQAAgJgEgHIgrhuIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgLg8IgZgNg");
	var mask_graphics_54 = new cjs.Graphics().p("AwgrYMAg7gAKIAGW7Mgg7AAKgAgZinIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAlAVAyAAQAzAAAkgVQAjgVAAgdQABgcghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_55 = new cjs.Graphics().p("AwfraMAg7gAGIAEW7Mgg7AAGgAgYinIgMA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgLg8IgagNg");
	var mask_graphics_56 = new cjs.Graphics().p("AwdrcMAg6gACIACW7Mgg7AACgAgYinIgLA8IALAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgEgHIgqhvIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgLg8IgagNg");
	var mask_graphics_57 = new cjs.Graphics().p("AwcLeIAA27MAg7AAAIAAW7gAgXinIgMA8IAMAHIAAAEIgIAEQgLAFgCALIgoBpIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_58 = new cjs.Graphics().p("AwdLdIAB27MAg7AACIgBW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgEAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgcghgVIAAgSQAAgJgEgHIgqhuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_59 = new cjs.Graphics().p("AweLdIAC27MAg7AACIgCW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_60 = new cjs.Graphics().p("AwdLdIAB27MAg7AACIgCW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgEAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgcghgVIAAgSQAAgJgEgHIgqhuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_61 = new cjs.Graphics().p("AweLdIAC27MAg7AACIgCW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_62 = new cjs.Graphics().p("AweLcIAC27MAg7AAEIgCW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_63 = new cjs.Graphics().p("AwfLbIAE27MAg7AAGIgEW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_64 = new cjs.Graphics().p("AwgLaIAG27MAg7AAIIgGW7gAgXinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAkAVAzAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_65 = new cjs.Graphics().p("AwgLZIAH27MAg6AAKIgHW7gAgXinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAzAAQAzAAAkgVQAjgTAAgdQACgdghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIAMgGIgLg8IgagOg");
	var mask_graphics_66 = new cjs.Graphics().p("AwhLYIAJ27MAg6AAMIgJW7gAgXinIgMA8IAMAGIAAAFIgIADQgLAGgDAKIgoBpIgFALIAAAWQgiAWAAAdQABAdAkAUQAkAWAzAAQAyAAAlgUQAjgUAAgdQABgdgggVIAAgRQAAgJgFgHIgphvIABgCQgFgHgHgDIgHgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_67 = new cjs.Graphics().p("AwjLWIAM27MAg7AAQIgMW7gAgXinIgMA8IAMAGIAAAFIgIADQgLAGgCAKIgpBpIgFALIAAAWQgiAWAAAdQAAAdAkAUQAlAWAzAAQAyAAAkgUQAjgUABgdQABgdgggVIAAgRQAAgJgFgHIgohvIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_68 = new cjs.Graphics().p("AwkLUIAO27MAg7AAUIgOW7gAgWinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgpBpIgFALIAAAWQgiAVAAAdQAAAdAkAVQAkAVAzABQAzAAAkgUQAjgUABgdQABgcghgWIABgRQAAgJgFgHIgohvIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_69 = new cjs.Graphics().p("AwlLSIAR27MAg6AAYIgRW7gAgWinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgpBpIgFAKIAAAXQgiAVAAAdQAAAdAkAVQAkAVAzABQAyABAlgVQAjgUABgdQABgcghgVIAAgSQABgJgFgHIgohvIAAgBQgEgIgHgDIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_70 = new cjs.Graphics().p("AwnLQIAU27MAg7AAcIgUW7gAgWinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgpBpIgFAKIAAAXQgjAVAAAdQABAdAjAVQAlAVAzABQAyABAkgVQAkgTAAgdQACgdghgVIAAgSQAAgJgEgHIgohvIAAgBQgEgHgHgEIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_71 = new cjs.Graphics().p("AwpLNIAY27MAg7AAiIgYW7gAgVinIgNA7IAMAHIAAAFIgIADQgMAGgCAKIgpBpIgFAKIAAAXQgjAUAAAdQAAAdAkAWQAkAVAzABQAzABAkgVQAjgTABgdQACgdghgVIAAgSQAAgJgEgHIgohvIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_72 = new cjs.Graphics().p("AwqLKIAb26MAg6AAnIgbW6gAgVinIgMA7IALAHIAAAFIgIADQgLAGgDAKIgqBoIgEALIgBAWQgiAVAAAdQAAAdAkAVQAkAWAzABQAyABAkgUQAkgUABgdQABgcgggWIAAgRQAAgJgEgHIgnhwIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgKg8IgagOg");
	var mask_graphics_73 = new cjs.Graphics().p("AwsLHIAf26MAg6AAtIgfW6gAgUinIgNA7IALAHIAAAEIgIAEQgLAGgCAKIgrBoIgEALIgBAWQgiAVAAAdQgBAdAkAVQAkAWAzABQAzABAkgUQAjgTACgdQABgdgggWIAAgRQAAgJgEgHIgnhwIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgJg8IgagOg");
	var mask_graphics_74 = new cjs.Graphics().p("AwvLEIAk27MAg7AA0IgkW7gAgUioIgNA8IAMAHIgBAEIgIAEQgLAFgCAKIgrBpIgEAKIgBAXQgjAUAAAdQAAAdAkAWQAkAWAzABQAyABAkgUQAkgTABgdQACgcghgWIABgSQAAgJgEgHIgnhvIAAgCQgEgHgHgEIgIgDIAAgFIAMgHIgKg8IgagOg");
	var mask_graphics_75 = new cjs.Graphics().p("AwxLBIAp27MAg6AA6IgpW7gAgTioIgOA8IAMAHIAAAEIgIAEQgMAFgCAKIgrBpIgFAKIAAAWQgjAVAAAdQAAAdAjAWQAkAWAzABQAyABAlgUQAkgTABgdQACgcghgWIABgSQAAgJgEgHIgnhvIAAgCQgEgHgHgEIgHgDIAAgFIALgGIgJg9IgagOg");
	var mask_graphics_76 = new cjs.Graphics().p("AwzK+IAt27MAg6ABAIgtW7gAgTioIgNA8IALAHIAAAEIgIAEQgLAFgDAKIgrBoIgFALIAAAWQgjAVAAAdQgBAdAkAVQAjAWAzACQAzABAlgTQAjgTABgdQACgdgggWIABgRQAAgJgEgHIgnhwIAAgCQgEgHgHgDIgHgEIAAgFIALgGIgJg9IgZgOg");
	var mask_graphics_77 = new cjs.Graphics().p("Aw1K7IAx26MAg6ABFIgxW6gAgSioIgOA8IALAHIAAAEIgIADQgLAGgCAKIgsBoIgFAKIAAAXQgjAUgBAdQAAAdAjAWQAkAWAzACQAyACAlgUQAkgTABgdQACgcgggXIAAgRQABgJgFgHIglhwIAAgBQgFgIgGgDIgIgEIAAgFIAMgGIgJg9IgagOg");
	var mask_graphics_78 = new cjs.Graphics().p("Aw2K4IA026MAg5ABLIg0W6gAgSioIgOA8IAMAHIgBAEIgIADQgLAGgCAKIgsBoIgFAKIgBAXQgiAUgBAdQAAAdAjAWQAkAWAzACQAyACAlgUQAjgTACgdQACgcgggWIAAgSQABgJgFgHIglhwIAAgBQgEgIgHgDIgIgEIABgFIALgGIgJg8IgagPg");
	var mask_graphics_79 = new cjs.Graphics().p("Aw4K2IA326MAg6ABPIg3W6gAgSioIgNA8IALAHIAAAEIgIADQgMAGgCAKIgsBoIgFAKIgBAXQgjAUAAAdQgBAdAjAWQAkAWAzACQAzACAkgUQAkgTACgcQACgdgggWIAAgSQABgJgFgHIglhwIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgJg8IgZgPg");
	var mask_graphics_80 = new cjs.Graphics().p("Aw5K0IA626MAg5ABTIg6W6gAgRioIgOA8IALAHIAAAEIgIADQgLAGgDAKIgsBoIgFAKIgBAWQgjAUAAAdQgBAdAjAWQAkAXAzACQAyACAlgUQAkgSABgdQADgdghgWIABgRQAAgJgEgIIglhwIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgagPg");
	var mask_graphics_81 = new cjs.Graphics().p("Aw6KyIA826MAg5ABXIg8W6gAgRioIgOA8IALAHIAAAEIgIADQgLAGgDAKIgsBnIgFALIgBAWQgjAUgBAdQAAAdAjAWQAjAXAzACQAzACAlgUQAkgSABgdQACgcgggXIABgRQAAgJgEgHIglhxIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_82 = new cjs.Graphics().p("Aw8KwIBA26MAg5ABbIhAW6gAgRioIgOA8IALAHIAAAEIgIADQgLAGgDAKIgsBnIgFALIgBAWQgjAUgBAdQAAAdAjAWQAjAXAzACQAzACAkgTQAkgTACgdQACgcgggXIABgRQAAgJgEgHIglhwIABgCQgFgHgHgEIgHgEIAAgFIAMgGIgJg8IgZgPg");
	var mask_graphics_83 = new cjs.Graphics().p("Aw8KvIBB26MAg4ABeIhBW5gAgRioIgOA7IAMAIIgBAEIgIADQgLAGgDAKIgsBnIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAXAzACQAyACAlgTQAkgTACgdQACgcgggXIABgRQAAgJgEgHIgkhwIAAgCQgFgHgGgEIgIgEIAAgFIAMgGIgJg8IgZgPg");
	var mask_graphics_84 = new cjs.Graphics().p("Aw9KtIBD25MAg4ABgIhDW5gAgQioIgPA7IAMAHIgBAFIgIADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAWAzADQAyACAlgTQAkgTACgdQACgcgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgIgEIABgFIALgGIgIg8IgagPg");
	var mask_graphics_85 = new cjs.Graphics().p("Aw+KsIBE25MAg5ABiIhEW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAWAzADQAyACAlgTQAkgSACgdQACgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgIgEIABgFIALgGIgIg8IgagPg");
	var mask_graphics_86 = new cjs.Graphics().p("Aw+KrIBF25MAg4ABkIhFW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAjAWAzADQAzACAlgTQAkgSACgdQACgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_87 = new cjs.Graphics().p("Aw/KrIBG25MAg5ABkIhGW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjATgBAdQgBAdAjAXQAjAWAzADQAzACAlgTQAkgSABgdQADgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_88 = new cjs.Graphics().p("Aw/KrIBH26MAg4ABlIhHW6gAgQioIgOA7IALAHIAAAFIgIADQgMAFgCAKIgtBoIgFAKIgBAXQgjATgBAdQgBAdAjAXQAjAWAzADQAzACAlgTQAkgSABgdQADgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_89 = new cjs.Graphics().p("Aw/KqIBH25MAg4ABmIhHW5gAgQioIgOA7IALAHIAAAFIgIADQgMAFgCAKIgtBoIgFAKIgBAXQgjATgBAdQgBAdAjAXQAjAWAzADQAzACAlgTQAkgSABgdQADgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_90 = new cjs.Graphics().p("Aw/KrIBH26MAg4ABlIhGW6gAgQioIgOA7IALAHIAAAFIgIADQgMAFgCAKIgtBoIgFAKIgBAXQgjATgBAdQgBAdAjAXQAjAWAzADQAzACAlgTQAkgSABgdQADgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_91 = new cjs.Graphics().p("Aw/KrIBG25MAg5ABkIhGW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjATgBAdQgBAdAjAXQAjAWAzADQAzACAlgTQAkgSABgdQADgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_92 = new cjs.Graphics().p("Aw+KrIBF25MAg4ABkIhFW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAjAWAzADQAzACAlgTQAkgSACgdQACgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_93 = new cjs.Graphics().p("Aw+KsIBE25MAg5ABiIhEW5gAgQioIgOA7IALAHIAAAFIgJADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAWAzADQAyACAlgTQAkgSACgdQACgdgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgIgEIABgFIALgGIgIg8IgagPg");
	var mask_graphics_94 = new cjs.Graphics().p("Aw9KtIBC25MAg5ABgIhCW5gAgQioIgPA7IAMAHIgBAFIgIADQgLAGgCAJIgtBoIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAWAzADQAyACAlgTQAkgTACgdQACgcgggWIABgSQAAgJgEgHIgkhwIAAgCQgEgHgHgEIgIgEIABgFIALgGIgIg8IgagPg");
	var mask_graphics_95 = new cjs.Graphics().p("Aw8KvIBB26MAg4ABdIhBW6gAgRioIgOA7IAMAHIgBAFIgIADQgLAGgDAKIgsBnIgFAKIgBAXQgjAUgBAdQgBAdAjAWQAkAXAzACQAyACAlgTQAkgTACgdQACgcgggXIABgRQAAgJgEgHIgkhwIAAgCQgFgHgGgEIgIgEIAAgFIAMgGIgJg8IgZgPg");
	var mask_graphics_96 = new cjs.Graphics().p("Aw7KwIA/26MAg4ABbIg/W6gAgRioIgOA8IALAHIAAAEIgIADQgLAGgDAKIgsBnIgFALIgBAWQgjAUgBAdQAAAdAjAWQAjAXAzACQAzACAkgTQAkgTACgdQACgcgggXIABgRQAAgJgEgHIglhwIABgCQgFgHgHgEIgHgEIAAgFIAMgGIgJg8IgZgPg");
	var mask_graphics_97 = new cjs.Graphics().p("Aw6KyIA826MAg5ABXIg8W6gAgRioIgOA8IALAHIAAAEIgIADQgLAGgDAKIgsBnIgFALIgBAWQgjAUgBAdQAAAdAjAWQAjAXAzACQAzACAlgUQAkgSABgdQACgcgggXIABgRQAAgJgEgHIglhxIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgZgPg");
	var mask_graphics_98 = new cjs.Graphics().p("Aw5K0IA626MAg5ABTIg6W6gAgRioIgOA8IALAHIAAAEIgIADQgMAGgCAKIgsBoIgFAKIgBAWQgjAVAAAdQgBAdAjAVQAkAXAzACQAyACAlgUQAkgSABgdQADgdghgWIABgRQAAgJgEgIIglhwIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgIg8IgagPg");
	var mask_graphics_99 = new cjs.Graphics().p("Aw4K2IA326MAg6ABPIg3W6gAgSioIgNA8IALAHIAAAEIgIADQgMAGgCAKIgsBoIgFAKIgBAXQgjAUAAAdQgBAdAjAWQAkAWAzACQAzACAkgUQAkgTACgcQACgdgggWIAAgSQABgJgFgHIglhwIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgJg8IgZgPg");
	var mask_graphics_100 = new cjs.Graphics().p("Aw2K4IA026MAg5ABLIg0W6gAgSioIgOA8IAMAHIgBAEIgIADQgLAGgCAKIgsBoIgFAKIgBAXQgiAUgBAdQAAAdAjAWQAkAWAzACQAyACAlgUQAjgTACgdQACgcgggWIAAgSQABgJgFgHIglhwIAAgBQgEgIgHgDIgIgEIABgFIALgGIgJg8IgagPg");
	var mask_graphics_101 = new cjs.Graphics().p("Aw0K7IAw26MAg5ABFIgwW6gAgSioIgOA8IALAHIAAAEIgIADQgLAGgCAKIgsBoIgFALIAAAWQgjAUgBAdQAAAdAjAWQAkAWAzACQAyACAlgUQAkgTABgdQACgcgggXIAAgRQABgJgFgHIglhwIAAgBQgFgIgGgDIgIgEIAAgFIAMgGIgJg9IgagOg");
	var mask_graphics_102 = new cjs.Graphics().p("AwzK+IAt26MAg6AA/IgtW6gAgTioIgNA8IALAHIAAAEIgIAEQgLAFgDAKIgrBoIgFALIAAAWQgjAVAAAdQgBAdAkAVQAkAWAyACQAzABAlgTQAjgTACgdQABgdgggWIABgRQAAgJgEgHIgnhwIAAgCQgEgHgHgDIgHgEIAAgFIALgGIgJg9IgZgOg");
	var mask_graphics_103 = new cjs.Graphics().p("AwxLBIAo26MAg7AA5IgoW6gAgTioIgOA8IAMAHIAAAEIgIAEQgMAFgCAKIgrBpIgFAKIAAAXQgjAUAAAdQAAAdAjAWQAkAWAzABQAyABAlgUQAkgTABgdQACgcghgWIABgSQAAgJgEgHIgnhvIAAgCQgEgHgHgEIgHgDIAAgFIALgGIgJg9IgagOg");
	var mask_graphics_104 = new cjs.Graphics().p("AwuLEIAj26MAg6AAzIgjW6gAgUioIgNA8IALAHIAAAEIgIAEQgLAFgCAKIgrBpIgEAKIgBAXQgiAUgBAdQAAAdAkAWQAkAWAzABQAyABAlgUQAjgTABgdQACgdghgVIABgSQAAgJgEgHIgnhvIAAgCQgEgHgHgEIgIgDIAAgFIAMgHIgKg8IgagOg");
	var mask_graphics_105 = new cjs.Graphics().p("AwsLIIAf27MAg6AAsIgfW7gAgUinIgNA7IALAHIAAAFIgIADQgLAGgCAKIgrBoIgEALIgBAWQgiAVAAAdQAAAdAjAVQAkAWAzABQAzABAkgUQAjgTACgdQABgdgggWIAAgRQAAgJgEgHIgnhwIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgJg8IgagOg");
	var mask_graphics_106 = new cjs.Graphics().p("AwqLLIAb27MAg6AAmIgbW7gAgVinIgNA7IAMAHIAAAFIgIADQgLAGgDAKIgqBoIgEALIgBAWQgiAVAAAdQAAAdAkAVQAkAWAzABQAyABAlgUQAjgUABgdQABgcgggWIAAgRQAAgJgEgHIgohwIABgBQgFgHgHgEIgHgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_107 = new cjs.Graphics().p("AwoLNIAX26MAg6AAhIgXW6gAgVinIgNA7IAMAHIAAAFIgJADQgLAGgCAKIgpBpIgFAKIAAAXQgjAVAAAdQAAAdAkAVQAkAVAzABQAzABAkgVQAjgTABgdQACgdghgVIAAgSQAAgJgEgHIgohvIAAgBQgEgHgHgEIgHgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_108 = new cjs.Graphics().p("AwnLQIAU27MAg7AAcIgUW7gAgWinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgpBpIgFAKIAAAXQgjAVABAdQAAAdAjAVQAlAVAzABQAyABAkgVQAkgTAAgdQACgdghgVIAAgSQAAgJgEgHIgohvIAAgBQgEgHgHgEIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_109 = new cjs.Graphics().p("AwlLSIAQ26MAg7AAXIgQW6gAgWinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgpBpIgFALIAAAWQgiAVAAAdQAAAdAkAVQAkAVAzABQAyABAlgVQAjgUABgdQABgcghgWIAAgRQABgJgFgHIgohvIAAgCQgFgHgGgDIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_110 = new cjs.Graphics().p("AwjLVIAN27MAg6AASIgNW7gAgWinIgNA8IAMAGIAAAFIgIADQgLAGgCAKIgpBpIgFALIAAAWQgiAVAAAdQAAAdAkAVQAkAWAzAAQAzAAAkgUQAjgUABgdQABgcghgWIABgRQAAgJgFgHIgohvIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgLg8IgZgOg");
	var mask_graphics_111 = new cjs.Graphics().p("AwiLWIAK26MAg7AAPIgKW6gAgXinIgMA8IAMAGIAAAFIgIADQgLAGgCAKIgpBpIgFALIAAAWQgiAWAAAdQABAdAjAUQAlAWAzAAQAyAAAkgUQAjgUABgdQABgdgggVIAAgRQAAgJgFgHIgohvIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_112 = new cjs.Graphics().p("AwhLYIAI27MAg7AAMIgIW7gAgXinIgMA8IAMAGIAAAFIgIADQgMAGgCAKIgoBqIgFAKIAAAWQgiAWAAAdQABAdAkAVQAkAVAzAAQAyAAAlgVQAjgTAAgdQACgdghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgHgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_113 = new cjs.Graphics().p("AwgLaIAG27MAg7AAIIgGW7gAgXinIgMA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAkAVAzAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_114 = new cjs.Graphics().p("AwfLbIAE27MAg7AAGIgEW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAkAVAzAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgKg8IgagOg");
	var mask_graphics_115 = new cjs.Graphics().p("AweLcIAD27MAg6AAEIgDW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_116 = new cjs.Graphics().p("AweLdIAC27MAg7AACIgCW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_117 = new cjs.Graphics().p("AwdLdIAB27MAg7AACIgBW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgEAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgcghgVIAAgSQAAgJgEgHIgqhuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_118 = new cjs.Graphics().p("AwdLeIAB27MAg6AAAIAAW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgEAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgcghgVIAAgSQAAgJgEgHIgqhuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_119 = new cjs.Graphics().p("AwdLeIAA27MAg7AAAIAAW7gAgYinIgLA8IALAGIAAAFIgIADQgLAGgCAKIgoBqIgFAKIAAAXQgiAVABAdQAAAdAkAVQAlAVAyAAQAzAAAkgVQAjgUABgdQABgcghgVIAAgSQAAgJgFgHIgphuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_120 = new cjs.Graphics().p("AwdLeIAA27MAg7AAAIAAW7gAgYinIgLA8IALAHIAAAEIgIADQgLAGgCAKIgoBqIgEAKIAAAXQgiAVAAAdQABAdAkAVQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgcghgVIAAgSQAAgJgEgHIgqhuIAAgCQgEgHgHgDIgIgEIAAgFIALgGIgLg8IgagOg");
	var mask_graphics_121 = new cjs.Graphics().p("AwdrdMAg7AAAIAAW7Mgg7AAAgAgYinIgMA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgFgHIgphvIAAgBQgFgHgHgDIgHgEIAAgFIALgHIgLg7IgagOg");
	var mask_graphics_122 = new cjs.Graphics().p("AwercMAg7gACIACW7Mgg7AACgAgYinIgMA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgLg8IgagNg");
	var mask_graphics_123 = new cjs.Graphics().p("AwerbMAg7gAEIACW7Mgg7AAEgAgYinIgMA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAkAVAyAAQA0AAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgLg8IgagNg");
	var mask_graphics_124 = new cjs.Graphics().p("AwfraMAg7gAGIAEW7Mgg7AAGgAgZinIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWAAAdQABAdAkAUQAlAVAyAAQAzAAAkgVQAjgUAAgdQABgdghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_125 = new cjs.Graphics().p("AwgrYMAg7gAKIAGW7Mgg7AAKgAgZinIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgoBpIgEALIAAAWQgiAWABAdQAAAdAkAUQAlAVAyAAQAzAAAkgVQAjgVABgdQAAgcghgVIAAgRQAAgJgEgHIgqhvIAAgBQgFgHgHgEIgHgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_126 = new cjs.Graphics().p("AwirWMAg7gAOIAKW7Mgg7AAOgAgZinIgLA8IALAHIAAAEIgIAEQgLAGgBAKIgoBqIgEAKIAAAXQgiAVABAdQAAAdAlAVQAkAUAyAAQA0AAAkgWQAigUABgdQABgcgigVIAAgSQAAgJgEgHIgrhuIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgLg8IgZgNg");
	var mask_graphics_127 = new cjs.Graphics().p("AwjrUMAg7gASIAMW7Mgg7AASgAgZinIgLA8IALAHIAAAEIgIAEQgLAGgCAKIgnBqIgEAKIAAAXQgiAWABAdQABAdAkAUQAlAUAyAAQAzAAAkgWQAjgUAAgdQABgdghgUIgBgSQAAgJgEgHIgrhuIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgLg8IgagNg");
	var mask_graphics_128 = new cjs.Graphics().p("AwlrSMAg7gAWIAQW7Mgg7AAWgAgainIgLA8IAMAHIAAAEIgIAEQgLAGgCAKIgnBqIgEAKIAAAXQgiAWABAdQABAdAkAUQAlAVAygBQAzgBAkgVQAjgUAAgdQABgdghgUIgBgSQAAgJgEgHIgrhuIAAgBQgEgHgHgEIgIgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_129 = new cjs.Graphics().p("AwnrPMAg7gAcIAUW7Mgg7AAcgAgainIgLA9IAMAGIAAAEIgIAEQgLAGgCAKIgnBqIgEALIAAAWQghAWABAdQAAAdAlAUQAkAVAygBQA0gBAkgVQAigVAAgdQABgcghgVIAAgRQgBgJgEgHIgrhuIAAgCQgFgHgHgDIgHgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_130 = new cjs.Graphics().p("AwprMMAg7gAiIAYW7Mgg7AAigAgbinIgKA9IALAGIAAAEIgIAEQgKAGgCAKIgnBqIgEALIABAWQgiAWABAdQABAdAkAUQAlAVAygBQAzgBAkgVQAjgVAAgdQAAgdghgUIAAgRQAAgJgFgHIgrhuIAAgCQgFgHgHgDIgIgDIAAgFIALgHIgMg8IgZgNg");
	var mask_graphics_131 = new cjs.Graphics().p("AwrrJMAg7gAoIAcW7Mgg7AAogAgbimIgLA8IAMAGIAAAFIgIADQgLAGgBAKIgmBrIgFAKIABAXQgiAWABAdQABAdAlAUQAlAUAygBQAzgBAkgWQAigUAAgdQABgdgigUIAAgSQAAgJgFgHIgshtIAAgCQgEgHgHgDIgIgDIAAgFIALgHIgMg8IgagNg");
	var mask_graphics_132 = new cjs.Graphics().p("AwtrFMAg6gAwIAhW7Mgg6AAwgAgcimIgKA8IAMAGIAAAFIgIADQgLAHgCAKIglBqIgFALIABAWQgiAWACAdQABAdAkAUQAlAUAygBQA0gBAjgWQAjgVAAgdQAAgcgigVIAAgRQAAgJgFgHIgshtIAAgCQgFgHgHgDIgHgEIAAgFIALgGIgNg8IgZgNg");
	var mask_graphics_133 = new cjs.Graphics().p("AwwrBMAg6gA3IAnW6Mgg6AA3gAgcimIgKA8IALAGIAAAFIgHADQgLAHgCAKIglBqIgEALIAAAWQghAXABAdQABAdAlATQAlAUAygBQAzgBAkgWQAigVAAgdQAAgdghgUIgBgRQAAgJgFgHIgshuIAAgBQgFgHgHgDIgIgEIAAgFIALgGIgMg8IgagNg");
	var mask_graphics_134 = new cjs.Graphics().p("Awzq9MAg6gBAIAtW7Mgg6ABAgAgdimIgKA8IAMAGIAAAFIgIAEQgLAGgBAKIglBrIgEAKIAAAXQghAWABAdQACAdAkAUQAmATAygBQAzgCAjgWQAjgVgBgdQAAgcghgUIgBgSQAAgJgFgHIgshtIgBgBQgEgHgHgDIgIgEIAAgFIALgHIgNg7IgagNg");
	var mask_graphics_135 = new cjs.Graphics().p("Aw1q5MAg5gBIIAyW7Mgg5ABIgAgeimIgJA8IAMAGIAAAFIgIAEQgLAGgCAKIgkBrIgEALIABAWQgiAXACAdQABAdAlATQAlAUAygCQA0gCAjgWQAigVAAgdQAAgdgigUIAAgRQgBgJgFgHIgthtIAAgBQgFgHgHgEIgHgDIgBgFIALgHIgNg7IgZgNg");
	var mask_graphics_136 = new cjs.Graphics().p("Aw4q1MAg5gBPIA4W6Mgg5ABPgAgeimIgKA8IAMAHIAAAEIgIAEQgKAGgCAKIgkBrIgEALIABAWQghAXABAdQACAdAlATQAlAUAygCQAzgCAkgWQAigWgBgdQAAgcgigUIAAgRQgBgJgEgHIguhtIAAgCQgFgGgHgEIgIgDIAAgFIALgHIgNg7IgagNg");
	var mask_graphics_137 = new cjs.Graphics().p("Aw6qxMAg5gBXIA8W6Mgg5ABXgAgfimIgJA9IAMAGIAAAEIgIAEQgLAGgBAKIgkBsIgEAKIABAXQghAXACAdQABAcAlATQAmAUAygCQAzgCAjgXQAigVAAgdQgBgdghgTIgBgSQgBgJgEgHIguhsIAAgCQgFgHgHgDIgIgDIAAgFIAKgHIgNg7IgagNg");
	var mask_graphics_138 = new cjs.Graphics().p("Aw8qtMAg4gBeIBBW5Mgg4ABegAgfimIgJA9IAMAGIAAAEIgIAEQgLAHgBAKIgkBrIgEAKIABAXQghAXACAdQACAdAlATQAlATAygCQA0gCAjgXQAigWgBgdQAAgcgigUIgBgRQAAgJgFgHIgvhsIAAgCQgFgHgHgDIgHgDIgBgFIALgHIgOg7IgZgNg");
	var mask_graphics_139 = new cjs.Graphics().p("Aw+qqMAg4gBkIBFW5Mgg4ABkgAggimIgJA9IAMAGIAAAEIgHAEQgLAHgCAKIgjBrIgEALIACAWQghAXABAdQACAdAlATQAmATAygCQAzgDAjgWQAigWgBgdQAAgcgigUIgBgRQAAgJgFgHIgvhtIAAgBQgFgHgHgDIgIgDIAAgFIALgHIgOg8IgagMg");
	var mask_graphics_140 = new cjs.Graphics().p("AxAqoMAg4gBpIBJW6Mgg4ABpgAggimIgJA9IAMAGIAAAEIgIAEQgKAHgCAKIgiBrIgEALIABAWQghAYACAdQACAcAlATQAlATAygCQA0gDAigXQAigVgBgdQAAgdgigTIgBgSQAAgJgFgGIgvhtIAAgBQgFgHgHgDIgIgDIAAgFIALgHIgOg8IgagMg");
	var mask_graphics_141 = new cjs.Graphics().p("AxCqlMAg4gBuIBNW5Mgg4ABugAghilIgIA8IAMAGIAAAEIgIAEQgLAHgBAKIgiBrIgEALIABAXQghAXACAdQACAdAlASQAmATAygCQAzgDAjgXQAigWgBgdQgBgcgigTIgBgSQAAgJgFgHIgvhsIAAgBQgFgHgHgDIgIgDIAAgFIAKgHIgOg8IgagMg");
	var mask_graphics_142 = new cjs.Graphics().p("AxDqjMAg4gByIBPW5Mgg4ABygAghilIgIA8IAMAGIAAAFIgIADQgLAHgBAKIgiBsIgEAKIABAXQghAXACAdQACAdAlASQAmATAygCQAzgDAjgXQAigWgBgdQgBgcgigUIgBgRQAAgJgFgHIgvhsIgBgBQgEgHgIgDIgHgDIgBgFIALgHIgOg8IgagMg");
	var mask_graphics_143 = new cjs.Graphics().p("AxEqhMAg3gB2IBSW5Mgg3AB2gAghilIgIA8IALAGIABAFIgIADQgLAHgBAKIgiBsIgEAKIABAXQghAXACAdQADAdAlATQAlATAygDQA0gDAigXQAigWgBgdQAAgdgjgTIgBgRQAAgJgFgHIgwhsIAAgBQgFgHgHgDIgHgDIgBgFIALgHIgOg8IgagMg");
	var mask_graphics_144 = new cjs.Graphics().p("AxFqfMAg3gB5IBUW4Mgg3AB5gAgiilIgIA8IAMAGIAAAFIgHAEQgLAGgBAKIgiBsIgEALIABAWQggAYACAcQACAdAlATQAmATAygDQAzgDAjgXQAhgWgBgdQAAgdgjgTIgBgRQAAgJgFgHIgwhsIAAgBQgFgHgHgDIgIgDIAAgFIALgHIgPg8IgZgMg");
	var mask_graphics_145 = new cjs.Graphics().p("AxGqeMAg3gB8IBWW5Mgg3AB8gAgiilIgIA8IAMAGIAAAFIgHAEQgLAGgBAKIgiBsIgEALIABAWQggAYACAdQACAcAlATQAmATAygDQAzgDAjgXQAigWgCgdQAAgdgigTIgBgRQgBgJgFgHIgwhsIAAgBQgFgHgHgDIgIgDIAAgFIALgHIgPg8IgagMg");
	var mask_graphics_146 = new cjs.Graphics().p("AxHqdMAg3gB9IBYW4Mgg3AB9gAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAlASQAmATAygDQAzgDAjgYQAigWgBgdQgBgcgigTIgBgSQgBgIgFgHIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_147 = new cjs.Graphics().p("AxHqcMAg3gB/IBYW4Mgg3AB/gAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAlASQAmATAygDQAzgDAjgYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_148 = new cjs.Graphics().p("AxIqcMAg4gCAIBZW5Mgg4ACAgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAlASQAmATAygDQA0gDAigYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");
	var mask_graphics_149 = new cjs.Graphics().p("AxIqcMAg3gCAIBaW5Mgg3ACAgAgiilIgIA8IAMAGIAAAFIgIAEQgKAGgCAKIghBsIgEALIABAWQggAYACAdQACAdAmASQAlATAygDQA0gDAigYQAigWgBgdQgBgcgigTIgBgSQgBgJgFgGIgwhsIAAgCQgFgGgHgDIgIgDIAAgFIAKgIIgOg7IgagMg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:105.5181,y:73.4528}).wait(1).to({graphics:mask_graphics_1,x:105.5682,y:73.4957}).wait(1).to({graphics:mask_graphics_2,x:105.5845,y:73.5189}).wait(1).to({graphics:mask_graphics_3,x:105.5632,y:73.5743}).wait(1).to({graphics:mask_graphics_4,x:105.5498,y:73.6114}).wait(1).to({graphics:mask_graphics_5,x:105.5487,y:73.6309}).wait(1).to({graphics:mask_graphics_6,x:105.5589,y:73.6842}).wait(1).to({graphics:mask_graphics_7,x:105.5297,y:73.8188}).wait(1).to({graphics:mask_graphics_8,x:105.5601,y:73.8861}).wait(1).to({graphics:mask_graphics_9,x:105.5497,y:73.9836}).wait(1).to({graphics:mask_graphics_10,x:105.5516,y:74.0633}).wait(1).to({graphics:mask_graphics_11,x:105.5646,y:74.2269}).wait(1).to({graphics:mask_graphics_12,x:105.5368,y:74.3206}).wait(1).to({graphics:mask_graphics_13,x:105.5201,y:74.4983}).wait(1).to({graphics:mask_graphics_14,x:105.561,y:74.7048}).wait(1).to({graphics:mask_graphics_15,x:105.5124,y:74.8497}).wait(1).to({graphics:mask_graphics_16,x:105.5017,y:75.0051}).wait(1).to({graphics:mask_graphics_17,x:105.4834,y:75.1816}).wait(1).to({graphics:mask_graphics_18,x:105.504,y:75.2742}).wait(1).to({graphics:mask_graphics_19,x:105.5138,y:75.4356}).wait(1).to({graphics:mask_graphics_20,x:105.5114,y:75.5647}).wait(1).to({graphics:mask_graphics_21,x:105.4993,y:75.661}).wait(1).to({graphics:mask_graphics_22,x:105.5265,y:75.7261}).wait(1).to({graphics:mask_graphics_23,x:105.5425,y:75.8573}).wait(1).to({graphics:mask_graphics_24,x:105.4995,y:75.8584}).wait(1).to({graphics:mask_graphics_25,x:105.4968,y:75.9267}).wait(1).to({graphics:mask_graphics_26,x:105.5318,y:75.9628}).wait(1).to({graphics:mask_graphics_27,x:105.5061,y:76.0176}).wait(1).to({graphics:mask_graphics_28,x:105.5208,y:76.0396}).wait(1).to({graphics:mask_graphics_29,x:105.4318,y:76.0306}).wait(1).to({graphics:mask_graphics_30,x:105.415,y:76.0047}).wait(1).to({graphics:mask_graphics_31,x:105.4256,y:75.9751}).wait(1).to({graphics:mask_graphics_32,x:105.4552,y:75.9933}).wait(1).to({graphics:mask_graphics_33,x:105.4626,y:75.9105}).wait(1).to({graphics:mask_graphics_34,x:105.4419,y:75.825}).wait(1).to({graphics:mask_graphics_35,x:105.4904,y:75.7372}).wait(1).to({graphics:mask_graphics_36,x:105.4645,y:75.6946}).wait(1).to({graphics:mask_graphics_37,x:105.4578,y:75.5498}).wait(1).to({graphics:mask_graphics_38,x:105.474,y:75.4006}).wait(1).to({graphics:mask_graphics_39,x:105.4594,y:75.2992}).wait(1).to({graphics:mask_graphics_40,x:105.4661,y:75.1424}).wait(1).to({graphics:mask_graphics_41,x:105.4915,y:74.9305}).wait(1).to({graphics:mask_graphics_42,x:105.436,y:74.7665}).wait(1).to({graphics:mask_graphics_43,x:105.4486,y:74.5447}).wait(1).to({graphics:mask_graphics_44,x:105.4756,y:74.3173}).wait(1).to({graphics:mask_graphics_45,x:105.5532,y:74.1856}).wait(1).to({graphics:mask_graphics_46,x:105.5535,y:73.9576}).wait(1).to({graphics:mask_graphics_47,x:105.5319,y:73.7824}).wait(1).to({graphics:mask_graphics_48,x:105.5864,y:73.606}).wait(1).to({graphics:mask_graphics_49,x:105.5695,y:73.435}).wait(1).to({graphics:mask_graphics_50,x:105.5796,y:73.3184}).wait(1).to({graphics:mask_graphics_51,x:105.5678,y:73.1546}).wait(1).to({graphics:mask_graphics_52,x:105.5381,y:73.0413}).wait(1).to({graphics:mask_graphics_53,x:105.5375,y:72.9363}).wait(1).to({graphics:mask_graphics_54,x:105.5677,y:72.9335}).wait(1).to({graphics:mask_graphics_55,x:105.5266,y:72.7861}).wait(1).to({graphics:mask_graphics_56,x:105.4891,y:72.7442}).wait(1).to({graphics:mask_graphics_57,x:105.4702,y:72.7531}).wait(1).to({graphics:mask_graphics_58,x:105.4702,y:72.719}).wait(1).to({graphics:mask_graphics_59,x:105.429,y:72.5986}).wait(1).to({graphics:mask_graphics_60,x:105.4936,y:72.7033}).wait(1).to({graphics:mask_graphics_61,x:105.4936,y:72.787}).wait(1).to({graphics:mask_graphics_62,x:105.5069,y:72.7917}).wait(1).to({graphics:mask_graphics_63,x:105.5032,y:72.8689}).wait(1).to({graphics:mask_graphics_64,x:105.5337,y:72.9186}).wait(1).to({graphics:mask_graphics_65,x:105.4986,y:73.0409}).wait(1).to({graphics:mask_graphics_66,x:105.4973,y:73.1329}).wait(1).to({graphics:mask_graphics_67,x:105.532,y:73.2485}).wait(1).to({graphics:mask_graphics_68,x:105.4993,y:73.3856}).wait(1).to({graphics:mask_graphics_69,x:105.4994,y:73.494}).wait(1).to({graphics:mask_graphics_70,x:105.4849,y:73.7234}).wait(1).to({graphics:mask_graphics_71,x:105.5047,y:73.9253}).wait(1).to({graphics:mask_graphics_72,x:105.5072,y:74.0985}).wait(1).to({graphics:mask_graphics_73,x:105.4936,y:74.3416}).wait(1).to({graphics:mask_graphics_74,x:105.5132,y:74.5587}).wait(1).to({graphics:mask_graphics_75,x:105.4823,y:74.8232}).wait(1).to({graphics:mask_graphics_76,x:105.5154,y:75.014}).wait(1).to({graphics:mask_graphics_77,x:105.5152,y:75.2378}).wait(1).to({graphics:mask_graphics_78,x:105.477,y:75.434}).wait(1).to({graphics:mask_graphics_79,x:105.5077,y:75.61}).wait(1).to({graphics:mask_graphics_80,x:105.5029,y:75.7651}).wait(1).to({graphics:mask_graphics_81,x:105.465,y:75.8461}).wait(1).to({graphics:mask_graphics_82,x:105.4932,y:76.0072}).wait(1).to({graphics:mask_graphics_83,x:105.4859,y:76.0975}).wait(1).to({graphics:mask_graphics_84,x:105.4971,y:76.2148}).wait(1).to({graphics:mask_graphics_85,x:105.4728,y:76.2611}).wait(1).to({graphics:mask_graphics_86,x:105.4659,y:76.3861}).wait(1).to({graphics:mask_graphics_87,x:105.4746,y:76.3885}).wait(1).to({graphics:mask_graphics_88,x:105.4994,y:76.4212}).wait(1).to({graphics:mask_graphics_89,x:105.3948,y:76.3347}).wait(1).to({graphics:mask_graphics_90,x:105.3999,y:76.4239}).wait(1).to({graphics:mask_graphics_91,x:105.4262,y:76.3896}).wait(1).to({graphics:mask_graphics_92,x:105.4159,y:76.3861}).wait(1).to({graphics:mask_graphics_93,x:105.4256,y:76.3606}).wait(1).to({graphics:mask_graphics_94,x:105.3998,y:76.3143}).wait(1).to({graphics:mask_graphics_95,x:105.4409,y:76.1938}).wait(1).to({graphics:mask_graphics_96,x:105.4481,y:76.1035}).wait(1).to({graphics:mask_graphics_97,x:105.4238,y:76.0403}).wait(1).to({graphics:mask_graphics_98,x:105.4124,y:75.955}).wait(1).to({graphics:mask_graphics_99,x:105.4182,y:75.7983}).wait(1).to({graphics:mask_graphics_100,x:105.4414,y:75.6702}).wait(1).to({graphics:mask_graphics_101,x:105.4298,y:75.4668}).wait(1).to({graphics:mask_graphics_102,x:105.4343,y:75.2437}).wait(1).to({graphics:mask_graphics_103,x:105.4529,y:75.147}).wait(1).to({graphics:mask_graphics_104,x:105.4872,y:74.9277}).wait(1).to({graphics:mask_graphics_105,x:105.4699,y:74.7073}).wait(1).to({graphics:mask_graphics_106,x:105.4868,y:74.5094}).wait(1).to({graphics:mask_graphics_107,x:105.4866,y:74.3329}).wait(1).to({graphics:mask_graphics_108,x:105.469,y:74.1779}).wait(1).to({graphics:mask_graphics_109,x:105.4868,y:74.0437}).wait(1).to({graphics:mask_graphics_110,x:105.4863,y:73.8825}).wait(1).to({graphics:mask_graphics_111,x:105.5212,y:73.7922}).wait(1).to({graphics:mask_graphics_112,x:105.4892,y:73.6761}).wait(1).to({graphics:mask_graphics_113,x:105.4896,y:73.5786}).wait(1).to({graphics:mask_graphics_114,x:105.5263,y:73.5075}).wait(1).to({graphics:mask_graphics_115,x:105.4968,y:73.4062}).wait(1).to({graphics:mask_graphics_116,x:105.4512,y:73.3747}).wait(1).to({graphics:mask_graphics_117,x:105.4686,y:73.3695}).wait(1).to({graphics:mask_graphics_118,x:105.4436,y:73.3373}).wait(1).to({graphics:mask_graphics_119,x:105.3755,y:73.1783}).wait(1).to({graphics:mask_graphics_120,x:105.4202,y:73.3143}).wait(1).to({graphics:mask_graphics_121,x:105.4081,y:73.3246}).wait(1).to({graphics:mask_graphics_122,x:105.4585,y:73.3022}).wait(1).to({graphics:mask_graphics_123,x:105.478,y:73.2525}).wait(1).to({graphics:mask_graphics_124,x:105.4676,y:73.2739}).wait(1).to({graphics:mask_graphics_125,x:105.4773,y:73.2663}).wait(1).to({graphics:mask_graphics_126,x:105.4556,y:73.3286}).wait(1).to({graphics:mask_graphics_127,x:105.453,y:73.3136}).wait(1).to({graphics:mask_graphics_128,x:105.4716,y:73.318}).wait(1).to({graphics:mask_graphics_129,x:105.4577,y:73.3439}).wait(1).to({graphics:mask_graphics_130,x:105.465,y:73.3893}).wait(1).to({graphics:mask_graphics_131,x:105.4882,y:73.3552}).wait(1).to({graphics:mask_graphics_132,x:105.4804,y:73.3936}).wait(1).to({graphics:mask_graphics_133,x:105.4907,y:73.4493}).wait(1).to({graphics:mask_graphics_134,x:105.4668,y:73.4254}).wait(1).to({graphics:mask_graphics_135,x:105.4428,y:73.4515}).wait(1).to({graphics:mask_graphics_136,x:105.4472,y:73.4555}).wait(1).to({graphics:mask_graphics_137,x:105.4341,y:73.4879}).wait(1).to({graphics:mask_graphics_138,x:105.4481,y:73.4997}).wait(1).to({graphics:mask_graphics_139,x:105.3958,y:73.4884}).wait(1).to({graphics:mask_graphics_140,x:105.3722,y:73.4576}).wait(1).to({graphics:mask_graphics_141,x:105.38,y:73.5069}).wait(1).to({graphics:mask_graphics_142,x:105.3661,y:73.4841}).wait(1).to({graphics:mask_graphics_143,x:105.3864,y:73.5408}).wait(1).to({graphics:mask_graphics_144,x:105.3865,y:73.5265}).wait(1).to({graphics:mask_graphics_145,x:105.3697,y:73.5433}).wait(1).to({graphics:mask_graphics_146,x:105.3827,y:73.5391}).wait(1).to({graphics:mask_graphics_147,x:105.3783,y:73.5134}).wait(1).to({graphics:mask_graphics_148,x:105.4058,y:73.5205}).wait(1).to({graphics:mask_graphics_149,x:105.5181,y:73.4528}).wait(1));

	// Layer_5
	this.instance_1 = new lib.sharkAnim2();
	this.instance_1.setTransform(104.2,104.7,1,1,0,0,0,54.8,43.7);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(150));

	// shark
	this.shark1 = new lib.sharkAnim();
	this.shark1.name = "shark1";
	this.shark1.setTransform(106.35,84.35,1,1,0,0,0,58.6,23.8);

	var maskedShapeInstanceList = [this.shark1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shark1).wait(150));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(197.2,127.3,-31,-14.700000000000003);
// library properties:
lib.properties = {
	id: '02E20548E755CB468B1807ED5D9C75D0',
	width: 210,
	height: 146,
	fps: 30,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{src:"images/ERPScr1BuoySharks_atlas_1.png", id:"ERPScr1BuoySharks_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['02E20548E755CB468B1807ED5D9C75D0'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;