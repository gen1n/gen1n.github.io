(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ERPScr1Heli_atlas_1", frames: [[826,155,70,35],[767,169,45,45],[577,168,70,35],[898,187,45,45],[705,169,60,37],[814,192,70,28],[577,205,70,28],[834,255,4,5],[847,100,4,7],[572,214,3,3],[705,208,57,34],[891,220,4,7],[1019,173,3,4],[938,49,2,3],[766,0,85,65],[1015,213,6,3],[1011,23,10,22],[673,255,12,7],[993,218,29,22],[431,249,22,14],[853,0,83,57],[649,255,13,10],[689,214,12,23],[40,242,39,23],[978,251,11,17],[481,242,27,16],[374,247,24,14],[157,242,36,20],[195,242,30,23],[904,234,34,32],[481,214,60,26],[1016,66,8,10],[812,255,8,4],[938,0,71,47],[766,67,58,50],[955,135,62,42],[940,251,15,19],[360,253,11,12],[342,253,16,10],[766,119,58,48],[942,49,72,42],[1019,152,3,5],[938,54,2,3],[849,67,2,3],[898,135,55,50],[1019,159,3,5],[1019,166,3,5],[1023,23,1,2],[0,242,38,26],[849,72,2,2],[1016,47,6,17],[945,187,7,18],[801,255,9,5],[741,244,20,17],[805,216,4,3],[886,210,9,8],[649,168,54,44],[853,222,17,10],[543,214,27,18],[717,244,22,17],[624,235,23,24],[689,244,26,15],[957,251,19,12],[322,253,18,11],[664,255,7,13],[543,235,42,32],[898,113,42,20],[1015,179,9,14],[1016,78,8,9],[1019,147,5,3],[945,207,7,8],[325,214,47,37],[374,214,55,31],[431,214,48,33],[764,216,39,37],[649,214,38,39],[942,93,70,40],[826,113,70,40],[81,242,36,24],[945,218,46,31],[325,0,250,212],[853,59,87,52],[0,0,323,240],[1011,0,13,21],[1014,93,10,26],[805,222,46,31],[826,67,21,31],[814,169,10,20],[528,242,12,22],[510,242,16,27],[955,179,58,37],[304,242,16,31],[1019,131,3,6],[993,242,15,28],[822,255,4,7],[400,247,29,11],[577,0,187,166],[828,255,4,7],[1019,139,3,6],[886,192,7,16],[1015,195,7,16],[1014,121,10,8],[777,255,10,7],[789,255,10,6],[872,222,17,10],[587,235,35,29],[826,100,19,11],[763,255,12,7],[1010,242,12,17],[455,249,22,13],[266,242,36,17],[119,242,36,22],[853,234,49,29],[227,242,37,17]]}
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



(lib.CachedBmp_522 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_521 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_519 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_518 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_523 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_517 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_520 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_516 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_512 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_508 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_510 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_513 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_515 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_509 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_514 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_506 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_505 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_504 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_502 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_500 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_501 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_503 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_507 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_498 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_495 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_497 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_493 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_494 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_496 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_499 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_492 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_488 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_487 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_486 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_485 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_490 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_491 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_489 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_482 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_483 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_484 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_478 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_481 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_480 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_479 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_476 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_477 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_474 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_475 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_473 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_470 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_472 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_469 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_467 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_471 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_468 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_466 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_465 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_463 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_461 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_464 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_459 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_462 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_458 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_460 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_455 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_457 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_456 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_454 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_452 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_453 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_451 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_413 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_449 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_448 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_450 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_411 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_412 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_407 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_406 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_410 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_408 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_409 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_402 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_401 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_405 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_404 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_403 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_400 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_397 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_394 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_396 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_392 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_398 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_391 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(94);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_393 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(95);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_395 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(96);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_389 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(97);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_390 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(98);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_387 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(99);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_386 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(100);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_384 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(101);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_385 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(102);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_388 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(103);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_383 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(104);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_381 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(105);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_382 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(106);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_380 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(107);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_379 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(108);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_378 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(109);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_375 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(110);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_377 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(111);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_374 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(112);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_376 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(113);
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


(lib.heliShadow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_523();
	this.instance.setTransform(-6.3,-3.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.heliShadow, new cjs.Rectangle(-6.3,-3.9,30,18.5), null);


(lib.Group = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_522();
	this.instance.setTransform(0,10.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_521();
	this.instance_1.setTransform(22.3,2.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_520();
	this.instance_2.setTransform(0.85,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,44.8,27.9), null);


(lib.Group_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_3 = new lib.CachedBmp_519();
	this.instance_3.setTransform(0,10.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_518();
	this.instance_4.setTransform(22.3,2.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_517();
	this.instance_5.setTransform(0.85,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,44.8,27.9), null);


(lib.flag_Connsvg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// flag_Conn_svg
	this.instance = new lib.CachedBmp_413();
	this.instance.setTransform(9.7,33.85,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_412();
	this.instance_1.setTransform(4.4,16.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_411();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_410();
	this.instance_3.setTransform(67.35,33.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_409();
	this.instance_4.setTransform(47.2,22.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_408();
	this.instance_5.setTransform(210.05,137.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,253.6,163.7);


(lib.flag_APS = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_407();
	this.instance.setTransform(4.4,25.55,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_406();
	this.instance_1.setTransform(1.9,12.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_405();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_404();
	this.instance_3.setTransform(93.4,72.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_403();
	this.instance_4.setTransform(88.95,69.7,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_402();
	this.instance_5.setTransform(82,65.85,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_401();
	this.instance_6.setTransform(77.7,58.95,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_400();
	this.instance_7.setTransform(70.95,58.05,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_403();
	this.instance_8.setTransform(66.4,53.8,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_398();
	this.instance_9.setTransform(55.65,44.3,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_397();
	this.instance_10.setTransform(47.5,37.4,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_396();
	this.instance_11.setTransform(38.7,33.35,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_395();
	this.instance_12.setTransform(24.4,17.25,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_394();
	this.instance_13.setTransform(117.7,96.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flag_APS, new cjs.Rectangle(0,0,146.7,114.7), null);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_393();
	this.instance.setTransform(-7.1,-1.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_392();
	this.instance_1.setTransform(0.8,-15.25,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_391();
	this.instance_2.setTransform(0.8,-15.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_390();
	this.instance_3.setTransform(-2.05,-15.25,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_389();
	this.instance_4.setTransform(-2.5,-15.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_388();
	this.instance_5.setTransform(-2.4,-18.25,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_387();
	this.instance_6.setTransform(-3.55,-16.8,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_386();
	this.instance_7.setTransform(0.05,-16.8,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_385();
	this.instance_8.setTransform(-2.45,-11.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_384();
	this.instance_9.setTransform(-2.45,-10.25,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_383();
	this.instance_10.setTransform(-4.2,-9.9,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_382();
	this.instance_11.setTransform(-4.6,-10.05,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_381();
	this.instance_12.setTransform(-8.95,-8.2,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_380();
	this.instance_13.setTransform(-2.95,-8.1,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_379();
	this.instance_14.setTransform(-2.95,-6.35,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_378();
	this.instance_15.setTransform(-5.5,-2.85,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_377();
	this.instance_16.setTransform(-8.95,-1.15,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_376();
	this.instance_17.setTransform(-9.1,4.6,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_375();
	this.instance_18.setTransform(-9.05,6.9,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_374();
	this.instance_19.setTransform(-12.35,4.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-18.2,24.5,36.8);


(lib.Tween1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_20 = new lib.flag_Connsvg("synched",0);
	this.instance_20.setTransform(9.15,4.6,1,1,0,0,0,126.8,81.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-117.6,-77.2,253.5,163.7);


(lib.heli_2svg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Group_1();
	this.instance.setTransform(85.9,61.15,1,1,0,0,0,22.3,13.8);
	this.instance.alpha = 0.1016;

	this.instance_1 = new lib.Group();
	this.instance_1.setTransform(85.7,61.1,1,1,0,0,0,22.3,13.8);
	this.instance_1.alpha = 0.1016;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:85.7,y:61.1},2).wait(2));

	// heli_2_svg
	this.instance_2 = new lib.CachedBmp_516();
	this.instance_2.setTransform(78.9,71.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_515();
	this.instance_3.setTransform(75.8,69.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_514();
	this.instance_4.setTransform(68.15,63.3,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_513();
	this.instance_5.setTransform(75.8,64.1,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_512();
	this.instance_6.setTransform(78.7,65.55,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_512();
	this.instance_7.setTransform(81.6,67.05,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_510();
	this.instance_8.setTransform(68.45,61.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_509();
	this.instance_9.setTransform(43.4,42,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_508();
	this.instance_10.setTransform(43.55,41.75,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_507();
	this.instance_11.setTransform(42.15,36.9,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_506();
	this.instance_12.setTransform(42.15,36.3,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_505();
	this.instance_13.setTransform(44,37.4,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_504();
	this.instance_14.setTransform(82.7,58.5,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_503();
	this.instance_15.setTransform(82.5,59.15,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_502();
	this.instance_16.setTransform(107.2,84.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_501();
	this.instance_17.setTransform(68.85,68,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_500();
	this.instance_18.setTransform(110.4,89.45,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_499();
	this.instance_19.setTransform(100.95,74.95,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_498();
	this.instance_20.setTransform(98.3,79.7,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_497();
	this.instance_21.setTransform(98.3,73.15,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_496();
	this.instance_22.setTransform(93.2,67.6,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_495();
	this.instance_23.setTransform(94.5,79.05,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_494();
	this.instance_24.setTransform(85.8,63.7,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_493();
	this.instance_25.setTransform(97.15,72.45,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_492();
	this.instance_26.setTransform(68.55,55.7,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_491();
	this.instance_27.setTransform(86.45,74.6,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_490();
	this.instance_28.setTransform(43.3,45.2,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_489();
	this.instance_29.setTransform(42.4,49.4,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_488();
	this.instance_30.setTransform(44.65,50.35,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_487();
	this.instance_31.setTransform(44.85,48.8,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_486();
	this.instance_32.setTransform(85.5,69.05,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_485();
	this.instance_33.setTransform(88.15,66.9,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_484();
	this.instance_34.setTransform(70,76.7,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_483();
	this.instance_35.setTransform(72.5,73.4,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_482();
	this.instance_36.setTransform(34.35,42.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34.4,36.3,87.30000000000001,61.400000000000006);


(lib.heli_1svg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.instance = new lib.Group_1();
	this.instance.setTransform(69.2,119.25,1,1,0,0,0,22.3,13.8);
	this.instance.alpha = 0.1602;

	this.instance_1 = new lib.Group();
	this.instance_1.setTransform(69.05,118.8,1,1,0,0,0,22.3,13.8);
	this.instance_1.alpha = 0.1016;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:69.05,y:118.8,alpha:0.1016},2).wait(2));

	// heli_1_svg
	this.instance_2 = new lib.CachedBmp_481();
	this.instance_2.setTransform(63,125.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_480();
	this.instance_3.setTransform(60.95,123.95,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_479();
	this.instance_4.setTransform(55.85,119,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_478();
	this.instance_5.setTransform(61.25,119.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_477();
	this.instance_6.setTransform(63.1,120.85,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_476();
	this.instance_7.setTransform(65,122,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_475();
	this.instance_8.setTransform(56.3,118.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_474();
	this.instance_9.setTransform(40.35,102.7,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_473();
	this.instance_10.setTransform(40.45,102.55,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_472();
	this.instance_11.setTransform(39.85,98.85,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_471();
	this.instance_12.setTransform(39.85,98.45,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_470();
	this.instance_13.setTransform(41.05,99.25,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_469();
	this.instance_14.setTransform(66.45,115.6,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_468();
	this.instance_15.setTransform(66.1,116.1,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_467();
	this.instance_16.setTransform(81.35,135.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_466();
	this.instance_17.setTransform(56.35,122.55,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_465();
	this.instance_18.setTransform(83,139.35,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_464();
	this.instance_19.setTransform(77.65,128.3,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_463();
	this.instance_20.setTransform(75.85,131.7,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_462();
	this.instance_21.setTransform(75.95,126.9,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_461();
	this.instance_22.setTransform(72.75,122.75,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_460();
	this.instance_23.setTransform(73.3,131.25,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_459();
	this.instance_24.setTransform(67.9,119.75,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_458();
	this.instance_25.setTransform(75.2,126.3,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_457();
	this.instance_26.setTransform(56.5,113.45,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_456();
	this.instance_27.setTransform(68.05,127.75,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_455();
	this.instance_28.setTransform(39.95,105.15,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_454();
	this.instance_29.setTransform(38.8,108.3,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_453();
	this.instance_30.setTransform(40.3,109.05,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_452();
	this.instance_31.setTransform(40.85,107.85,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_451();
	this.instance_32.setTransform(67.6,123.45,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_450();
	this.instance_33.setTransform(69.4,121.8,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_449();
	this.instance_34.setTransform(56.25,129,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_448();
	this.instance_35.setTransform(58,126.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.8,98.5,52.900000000000006,47);


(lib.buoy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(12.35,18.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.buoy, new cjs.Rectangle(0,0,24.5,36.8), null);


(lib.buoy_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// buoy
	this.instance_1 = new lib.buoy();
	this.instance_1.setTransform(105.5,73.4,1,1,-3.487,0,0,12.4,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-5.4382,y:75.95},29,cjs.Ease.quadInOut).to({rotation:0.0542,y:72.55},30,cjs.Ease.quadInOut).to({regX:12.5,rotation:2.7577,x:105.55,y:76.25},30,cjs.Ease.quadInOut).to({regX:12.6,regY:18.4,rotation:0.0166,x:105.65,y:73.15},30,cjs.Ease.quadInOut).to({regX:12.4,regY:18.3,rotation:-3.487,x:105.5,y:73.4},30,cjs.Ease.quadInOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(92.2,54.3,27.099999999999994,41.3);


(lib.Heli_Con = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// heli_con
	this.instance = new lib.heli_2svg("synched",0);
	this.instance.setTransform(437.25,263,1,1,7.2425,0,0,43.1,47.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(428.6,251.8,83.19999999999999,69.69999999999999);


(lib.buoymkccopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.buoy_1();
	this.instance.setTransform(12.35,18.25,1,1,-3.487,0,0,12.4,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.buoymkccopy, new cjs.Rectangle(96.8,49.2,26,38.3), null);


// stage content:
(lib.ERP_scr1_heli = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1969));

	// Heli_con
	this.instance = new lib.Heli_Con();
	this.instance.setTransform(-86.4,281.1,1,1,7.4885,0,0,437.4,261.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(369).to({_off:false},0).to({regX:437.8,regY:261.9,rotation:6.0155,x:206.3,y:443.35},274).to({regX:437.7,regY:261.4,rotation:-3.2277,x:284.55,y:486.4},57).to({regX:437.8,regY:261.6,rotation:-3.2277,x:284.7,y:486.6},40,cjs.Ease.quadOut).to({regX:437.9,regY:262.4,rotation:5.744,x:1675,y:1252.4},1228,cjs.Ease.cubicIn).wait(1));

	// flag_con
	this.instance_1 = new lib.Tween1_1("synched",0);
	this.instance_1.setTransform(-231.3,188.75,1,1,0,0,0,-2.1,-3.7);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(369).to({_off:false},0).to({regX:0,regY:0,x:152.4,y:403.05},331).to({x:152.35},40,cjs.Ease.quartOut).to({x:1530.55,y:1164.05},1228,cjs.Ease.cubicIn).wait(1));

	// shadow_con
	this.instance_2 = new lib.heliShadow();
	this.instance_2.setTransform(-52.75,494.35,1,1,0,0,0,8.8,5.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(369).to({_off:false},0).to({x:317.95,y:700.1},331).wait(40).to({x:1708.15,y:1465.1},1228,cjs.Ease.cubicIn).wait(1));

	// flag_APS
	this.instance_3 = new lib.flag_APS();
	this.instance_3.setTransform(-129.05,-69.85,1,1,0,0,0,73.5,58.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:170.05,y:110.05},329,cjs.Ease.quartOut).wait(40).to({x:1899.1,y:1150.9},1485,cjs.Ease.cubicIn).to({_off:true},1).wait(114));

	// heli_APS
	this.instance_4 = new lib.heli_1svg("synched",0);
	this.instance_4.setTransform(-56,-13.05,1,1,7.9375,0,0,37,101.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:65.2,regY:122,x:-28.15,y:12.65,startPosition:1},0).wait(1).to({rotation:7.9374,x:-25.5,y:14.25,startPosition:2},0).wait(1).to({x:-22.8,y:15.85,startPosition:3},0).wait(1).to({x:-20.1,y:17.45,startPosition:0},0).wait(1).to({x:-17.4,y:19.1,startPosition:1},0).wait(1).to({x:-14.7,y:20.7,startPosition:2},0).wait(1).to({x:-12,y:22.35,startPosition:3},0).wait(1).to({x:-9.3,y:24,startPosition:0},0).wait(1).to({x:-6.55,y:25.6,startPosition:1},0).wait(1).to({x:-3.85,y:27.25,startPosition:2},0).wait(1).to({x:-1.1,y:28.9,startPosition:3},0).wait(1).to({x:1.6,y:30.55,startPosition:0},0).wait(1).to({x:4.3,y:32.15,startPosition:1},0).wait(1).to({x:7,y:33.8,startPosition:2},0).wait(1).to({rotation:7.9373,x:9.75,y:35.45,startPosition:3},0).wait(1).to({x:12.45,y:37.1,startPosition:0},0).wait(1).to({x:15.15,y:38.75,startPosition:1},0).wait(1).to({x:17.9,y:40.35,startPosition:2},0).wait(1).to({x:20.6,y:42,startPosition:3},0).wait(1).to({x:23.3,y:43.65,startPosition:0},0).wait(1).to({x:26.05,y:45.25,startPosition:1},0).wait(1).to({x:28.75,y:46.9,startPosition:2},0).wait(1).to({x:31.4,y:48.5,startPosition:3},0).wait(1).to({x:34.1,y:50.1,startPosition:0},0).wait(1).to({x:36.8,y:51.75,startPosition:1},0).wait(1).to({x:39.45,y:53.35,startPosition:2},0).wait(1).to({x:42.15,y:54.95,startPosition:3},0).wait(1).to({x:44.8,y:56.55,startPosition:0},0).wait(1).to({x:47.4,y:58.15,startPosition:1},0).wait(1).to({x:50,y:59.7,startPosition:2},0).wait(1).to({x:52.6,y:61.3,startPosition:3},0).wait(1).to({rotation:7.9372,x:55.25,y:62.85,startPosition:0},0).wait(1).to({x:57.8,y:64.4,startPosition:1},0).wait(1).to({x:60.4,y:65.95,startPosition:2},0).wait(1).to({x:62.95,y:67.5,startPosition:3},0).wait(1).to({x:65.5,y:69.05,startPosition:0},0).wait(1).to({x:68.05,y:70.6,startPosition:1},0).wait(1).to({x:70.6,y:72.1,startPosition:2},0).wait(1).to({x:73.1,y:73.6,startPosition:3},0).wait(1).to({x:75.55,y:75.1,startPosition:0},0).wait(1).to({x:78.05,y:76.6,startPosition:1},0).wait(1).to({x:80.5,y:78.05,startPosition:2},0).wait(1).to({x:82.95,y:79.55,startPosition:3},0).wait(1).to({x:85.35,y:81,startPosition:0},0).wait(1).to({x:87.75,y:82.4,startPosition:1},0).wait(1).to({x:90.15,y:83.85,startPosition:2},0).wait(1).to({x:92.5,y:85.25,startPosition:3},0).wait(1).to({x:94.85,y:86.7,startPosition:0},0).wait(1).to({x:97.15,y:88.1,startPosition:1},0).wait(1).to({x:99.45,y:89.45,startPosition:2},0).wait(1).to({x:101.75,y:90.85,startPosition:3},0).wait(1).to({x:104,y:92.2,startPosition:0},0).wait(1).to({x:106.25,y:93.55,startPosition:1},0).wait(1).to({x:108.45,y:94.85,startPosition:2},0).wait(1).to({x:110.65,y:96.2,startPosition:3},0).wait(1).to({rotation:7.9371,x:112.8,y:97.5,startPosition:0},0).wait(1).to({x:114.95,y:98.8,startPosition:1},0).wait(1).to({x:117.1,y:100.1,startPosition:2},0).wait(1).to({x:119.2,y:101.35,startPosition:3},0).wait(1).to({x:121.3,y:102.6,startPosition:0},0).wait(1).to({x:123.35,y:103.85,startPosition:1},0).wait(1).to({x:125.4,y:105.1,startPosition:2},0).wait(1).to({x:127.45,y:106.3,startPosition:3},0).wait(1).to({x:129.4,y:107.5,startPosition:0},0).wait(1).to({x:131.4,y:108.7,startPosition:1},0).wait(1).to({x:133.35,y:109.85,startPosition:2},0).wait(1).to({x:135.3,y:111.05,startPosition:3},0).wait(1).to({x:137.2,y:112.2,startPosition:0},0).wait(1).to({x:139.1,y:113.3,startPosition:1},0).wait(1).to({x:140.95,y:114.45,startPosition:2},0).wait(1).to({x:142.8,y:115.55,startPosition:3},0).wait(1).to({x:144.6,y:116.65,startPosition:0},0).wait(1).to({x:146.45,y:117.75,startPosition:1},0).wait(1).to({x:148.2,y:118.8,startPosition:2},0).wait(1).to({x:149.95,y:119.85,startPosition:3},0).wait(1).to({x:151.7,y:120.9,startPosition:0},0).wait(1).to({x:153.4,y:121.95,startPosition:1},0).wait(1).to({x:155.1,y:122.95,startPosition:2},0).wait(1).to({x:156.75,y:123.95,startPosition:3},0).wait(1).to({x:158.4,y:124.95,startPosition:0},0).wait(1).to({x:160.05,y:125.95,startPosition:1},0).wait(1).to({x:161.65,y:126.9,startPosition:2},0).wait(1).to({x:163.25,y:127.85,startPosition:3},0).wait(1).to({x:164.8,y:128.8,startPosition:0},0).wait(1).to({x:166.35,y:129.7,startPosition:1},0).wait(1).to({rotation:7.937,x:167.9,y:130.6,startPosition:2},0).wait(1).to({x:169.4,y:131.5,startPosition:3},0).wait(1).to({x:170.85,y:132.4,startPosition:0},0).wait(1).to({x:172.35,y:133.25,startPosition:1},0).wait(1).to({x:173.8,y:134.15,startPosition:2},0).wait(1).to({x:175.2,y:135,startPosition:3},0).wait(1).to({x:176.6,y:135.85,startPosition:0},0).wait(1).to({x:178,y:136.65,startPosition:1},0).wait(1).to({x:179.35,y:137.5,startPosition:2},0).wait(1).to({x:180.7,y:138.3,startPosition:3},0).wait(1).to({x:182.05,y:139.1,startPosition:0},0).wait(1).to({x:183.35,y:139.9,startPosition:1},0).wait(1).to({x:184.65,y:140.65,startPosition:2},0).wait(1).to({x:185.9,y:141.45,startPosition:3},0).wait(1).to({x:187.15,y:142.2,startPosition:0},0).wait(1).to({x:188.4,y:142.9,startPosition:1},0).wait(1).to({x:189.6,y:143.65,startPosition:2},0).wait(1).to({x:190.8,y:144.35,startPosition:3},0).wait(1).to({x:192,y:145.1,startPosition:0},0).wait(1).to({x:193.15,y:145.8,startPosition:1},0).wait(1).to({x:194.3,y:146.45,startPosition:2},0).wait(1).to({x:195.4,y:147.15,startPosition:3},0).wait(1).to({x:196.55,y:147.8,startPosition:0},0).wait(1).to({x:197.6,y:148.5,startPosition:1},0).wait(1).to({x:198.7,y:149.15,startPosition:2},0).wait(1).to({x:199.75,y:149.75,startPosition:3},0).wait(1).to({x:200.8,y:150.4,startPosition:0},0).wait(1).to({x:201.85,y:151,startPosition:1},0).wait(1).to({x:202.85,y:151.6,startPosition:2},0).wait(1).to({x:203.85,y:152.2,startPosition:3},0).wait(1).to({x:204.8,y:152.8,startPosition:0},0).wait(1).to({x:205.8,y:153.4,startPosition:1},0).wait(1).to({x:206.75,y:153.95,startPosition:2},0).wait(1).to({x:207.65,y:154.5,startPosition:3},0).wait(1).to({rotation:7.9369,x:208.6,y:155.1,startPosition:0},0).wait(1).to({x:209.5,y:155.6,startPosition:1},0).wait(1).to({x:210.4,y:156.15,startPosition:2},0).wait(1).to({x:211.25,y:156.7,startPosition:3},0).wait(1).to({x:212.1,y:157.2,startPosition:0},0).wait(1).to({x:212.95,y:157.7,startPosition:1},0).wait(1).to({x:213.8,y:158.2,startPosition:2},0).wait(1).to({x:214.6,y:158.7,startPosition:3},0).wait(1).to({x:215.4,y:159.2,startPosition:0},0).wait(1).to({x:216.2,y:159.65,startPosition:1},0).wait(1).to({x:216.95,y:160.1,startPosition:2},0).wait(1).to({x:217.75,y:160.6,startPosition:3},0).wait(1).to({x:218.5,y:161.05,startPosition:0},0).wait(1).to({x:219.2,y:161.45,startPosition:1},0).wait(1).to({x:219.95,y:161.9,startPosition:2},0).wait(1).to({x:220.65,y:162.35,startPosition:3},0).wait(1).to({x:221.35,y:162.75,startPosition:0},0).wait(1).to({x:222,y:163.15,startPosition:1},0).wait(1).to({x:222.7,y:163.55,startPosition:2},0).wait(1).to({x:223.35,y:163.95,startPosition:3},0).wait(1).to({x:224,y:164.35,startPosition:0},0).wait(1).to({x:224.6,y:164.7,startPosition:1},0).wait(1).to({x:225.25,y:165.1,startPosition:2},0).wait(1).to({x:225.85,y:165.45,startPosition:3},0).wait(1).to({x:226.45,y:165.8,startPosition:0},0).wait(1).to({x:227.05,y:166.15,startPosition:1},0).wait(1).to({x:227.6,y:166.5,startPosition:2},0).wait(1).to({x:228.15,y:166.85,startPosition:3},0).wait(1).to({x:228.7,y:167.2,startPosition:0},0).wait(1).to({x:229.25,y:167.5,startPosition:1},0).wait(1).to({x:229.75,y:167.8,startPosition:2},0).wait(1).to({x:230.3,y:168.15,startPosition:3},0).wait(1).to({x:230.8,y:168.45,startPosition:0},0).wait(1).to({x:231.3,y:168.75,startPosition:1},0).wait(1).to({rotation:7.9368,x:231.75,y:169,startPosition:2},0).wait(1).to({x:232.25,y:169.3,startPosition:3},0).wait(1).to({x:232.7,y:169.6,startPosition:0},0).wait(1).to({x:233.15,y:169.85,startPosition:1},0).wait(1).to({x:233.6,y:170.1,startPosition:2},0).wait(1).to({x:234,y:170.4,startPosition:3},0).wait(1).to({x:234.45,y:170.65,startPosition:0},0).wait(1).to({x:234.85,y:170.9,startPosition:1},0).wait(1).to({x:235.25,y:171.1,startPosition:2},0).wait(1).to({x:235.65,y:171.35,startPosition:3},0).wait(1).to({x:236,y:171.6,startPosition:0},0).wait(1).to({x:236.4,y:171.8,startPosition:1},0).wait(1).to({x:236.75,y:172,startPosition:2},0).wait(1).to({x:237.1,y:172.25,startPosition:3},0).wait(1).to({x:237.45,y:172.45,startPosition:0},0).wait(1).to({x:237.75,y:172.65,startPosition:1},0).wait(1).to({x:238.1,y:172.85,startPosition:2},0).wait(1).to({x:238.4,y:173,startPosition:3},0).wait(1).to({x:238.7,y:173.2,startPosition:0},0).wait(1).to({x:239,y:173.4,startPosition:1},0).wait(1).to({x:239.3,y:173.55,startPosition:2},0).wait(1).to({x:239.55,y:173.7,startPosition:3},0).wait(1).to({x:239.85,y:173.9,startPosition:0},0).wait(1).to({x:240.1,y:174.05,startPosition:1},0).wait(1).to({x:240.35,y:174.2,startPosition:2},0).wait(1).to({x:240.6,y:174.35,startPosition:3},0).wait(1).to({x:240.85,y:174.5,startPosition:0},0).wait(1).to({x:241.05,y:174.6,startPosition:1},0).wait(1).to({x:241.3,y:174.75,startPosition:2},0).wait(1).to({rotation:7.9367,x:241.5,y:174.85,startPosition:3},0).wait(1).to({x:241.7,y:175,startPosition:0},0).wait(1).to({x:241.9,y:175.1,startPosition:1},0).wait(1).to({x:242.05,y:175.2,startPosition:2},0).wait(1).to({x:242.25,y:175.35,startPosition:3},0).wait(1).to({x:242.4,y:175.45,startPosition:0},0).wait(1).to({regX:37,regY:101.7,x:217.5,y:151.5,startPosition:3},0).to({regX:37.1,regY:101.8,scaleX:0.9999,scaleY:0.9999,rotation:-9.6891,x:241.8,y:166.2},96,cjs.Ease.quartOut).wait(1).to({regX:65.2,regY:122,rotation:-9.3472,x:272.85,y:181.55,startPosition:0},0).wait(1).to({rotation:-9.0157,x:272.8,y:181.8,startPosition:1},0).wait(1).to({rotation:-8.6944,y:182,startPosition:2},0).wait(1).to({rotation:-8.3833,y:182.2,startPosition:3},0).wait(1).to({rotation:-8.0821,x:272.75,y:182.45,startPosition:0},0).wait(1).to({rotation:-7.7907,y:182.55,startPosition:1},0).wait(1).to({rotation:-7.509,y:182.8,startPosition:2},0).wait(1).to({rotation:-7.2369,x:272.7,y:182.95,startPosition:3},0).wait(1).to({rotation:-6.9743,x:272.65,y:183.15,startPosition:0},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6.7209,y:183.25,startPosition:1},0).wait(1).to({rotation:-6.4767,x:272.6,y:183.4,startPosition:2},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-6.2416,x:272.55,y:183.55,startPosition:3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6.0154,x:272.6,y:183.7,startPosition:0},0).wait(1).to({rotation:-5.7981,x:272.5,y:183.8,startPosition:1},0).wait(1).to({rotation:-5.5894,x:272.55,y:183.95,startPosition:2},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-5.3893,x:272.5,y:184.15,startPosition:3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-5.1976,y:184.25,startPosition:0},0).wait(1).to({rotation:-5.0143,x:272.45,y:184.35,startPosition:1},0).wait(1).to({rotation:-4.8392,y:184.45,startPosition:2},0).wait(1).to({rotation:-4.6722,y:184.6,startPosition:3},0).wait(1).to({rotation:-4.5132,x:272.4,startPosition:0},0).wait(1).to({rotation:-4.3621,y:184.75,startPosition:1},0).wait(1).to({rotation:-4.2188,x:272.35,y:184.85,startPosition:2},0).wait(1).to({rotation:-4.0832,x:272.4,y:184.95,startPosition:3},0).wait(1).to({rotation:-3.9551,x:272.35,y:185,startPosition:0},0).wait(1).to({rotation:-3.8344,x:272.3,y:185.05,startPosition:1},0).wait(1).to({rotation:-3.7212,y:185.15,startPosition:2},0).wait(1).to({rotation:-3.6152,y:185.25,startPosition:3},0).wait(1).to({rotation:-3.5163,startPosition:0},0).wait(1).to({rotation:-3.4245,y:185.35,startPosition:1},0).wait(1).to({rotation:-3.3396,y:185.4,startPosition:2},0).wait(1).to({rotation:-3.2617,y:185.45,startPosition:3},0).wait(1).to({rotation:-3.1904,x:272.25,startPosition:0},0).wait(1).to({rotation:-3.1259,y:185.5,startPosition:1},0).wait(1).to({rotation:-3.0679,y:185.55,startPosition:2},0).wait(1).to({rotation:-3.0164,x:272.2,y:185.6,startPosition:3},0).wait(1).to({rotation:-2.9712,startPosition:0},0).wait(1).to({rotation:-2.9324,y:185.65,startPosition:1},0).wait(1).to({rotation:-2.8998,startPosition:2},0).wait(1).to({rotation:-2.8733,y:185.7,startPosition:3},0).wait(1).to({rotation:-2.8529,x:272.15,startPosition:0},0).wait(1).to({rotation:-2.8384,x:272.2,startPosition:1},0).wait(1).to({rotation:-2.8297,x:272.15,y:185.75,startPosition:2},0).wait(1).to({regX:37.1,regY:101.8,rotation:-2.8269,x:243.15,y:166.9,startPosition:3},0).wait(1).to({regX:65.2,regY:122,rotation:-2.7437,x:272.15,y:185.75,startPosition:0},0).wait(1).to({rotation:-2.6756,x:272.2,startPosition:1},0).wait(1).to({rotation:-2.617,x:272.15,startPosition:2},0).wait(1).to({rotation:-2.565,y:185.85,startPosition:3},0).wait(1).to({rotation:-2.5181,x:272.1,y:185.9,startPosition:0},0).wait(1).to({rotation:-2.475,startPosition:1},0).wait(1).to({rotation:-2.4351,y:185.95,startPosition:2},0).wait(1).to({rotation:-2.3978,x:272.05,y:185.9,startPosition:3},0).wait(1).to({rotation:-2.3626,x:272.1,y:185.95,startPosition:0},0).wait(1).to({rotation:-2.3293,x:272.05,startPosition:1},0).wait(1).to({rotation:-2.2975,y:186,startPosition:2},0).wait(1).to({rotation:-2.267,y:185.95,startPosition:3},0).wait(1).to({rotation:-2.2377,x:272,y:186,startPosition:0},0).wait(1).to({rotation:-2.2094,startPosition:1},0).wait(1).to({rotation:-2.182,startPosition:2},0).wait(1).to({rotation:-2.1553,y:186.05,startPosition:3},0).wait(1).to({rotation:-2.1292,startPosition:0},0).wait(1).to({rotation:-2.1037,startPosition:1},0).wait(1).to({rotation:-2.0787,x:271.95,y:186.1,startPosition:2},0).wait(1).to({rotation:-2.054,x:271.9,y:186.05,startPosition:3},0).wait(1).to({rotation:-2.0297,y:186.1,startPosition:0},0).wait(1).to({rotation:-2.0056,y:186.05,startPosition:1},0).wait(1).to({rotation:-1.9817,y:186.15,startPosition:2},0).wait(1).to({rotation:-1.958,startPosition:3},0).wait(1).to({rotation:-1.9343,startPosition:0},0).wait(1).to({rotation:-1.9106,x:271.85,y:186.2,startPosition:1},0).wait(1).to({rotation:-1.8868,startPosition:2},0).wait(1).to({rotation:-1.863,startPosition:3},0).wait(1).to({rotation:-1.839,startPosition:0},0).wait(1).to({rotation:-1.8147,y:186.25,startPosition:1},0).wait(1).to({rotation:-1.7902,y:186.2,startPosition:2},0).wait(1).to({rotation:-1.7652,y:186.25,startPosition:3},0).wait(1).to({rotation:-1.7399,x:271.8,y:186.2,startPosition:0},0).wait(1).to({rotation:-1.714,y:186.25,startPosition:1},0).wait(1).to({rotation:-1.6874,y:186.3,startPosition:2},0).wait(1).to({rotation:-1.6602,y:186.25,startPosition:3},0).wait(1).to({rotation:-1.6321,x:271.75,y:186.3,startPosition:0},0).wait(1).to({rotation:-1.6031,x:271.8,startPosition:1},0).wait(1).to({rotation:-1.5729,startPosition:2},0).wait(1).to({regX:37.1,regY:101.7,rotation:-1.5415,x:243.2,y:166.9,startPosition:3},0).to({regX:37,rotation:7.9375,x:1972.15,y:1207.7},1485,cjs.Ease.cubicIn).to({_off:true},1).wait(114));

	// heli_Shdw
	this.instance_5 = new lib.heliShadow();
	this.instance_5.setTransform(-26.95,251.95,1,1,0,0,0,8.8,5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:272.15,y:431.85},329,cjs.Ease.quartOut).wait(40).to({x:2001.2,y:1472.7},1485,cjs.Ease.cubicIn).to({_off:true},1).wait(114));

	// Layer_1_copy_copy
	this.instance_6 = new lib.buoy_1();
	this.instance_6.setTransform(435.9,751.15,1,1,0,0,0,105.4,73.4);

	this.instance_7 = new lib.buoymkccopy();
	this.instance_7.setTransform(239.95,651,1,1,0,0,0,12.3,18.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},5).wait(1964));

	// Layer_1_copy
	this.instance_8 = new lib.buoy_1();
	this.instance_8.setTransform(866.8,1016.75,1,1,0,0,0,105.4,73.4);

	this.instance_9 = new lib.buoymkccopy();
	this.instance_9.setTransform(676.7,912.7,1,1,0,0,0,12.3,18.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).to({state:[{t:this.instance_9}]},17).wait(1952));

	// Layer_1
	this.instance_10 = new lib.buoymkccopy();
	this.instance_10.setTransform(997.75,649.4,1,1,0,0,0,12.3,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1969));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(613.2,411.9,1412.2,1070.1);
// library properties:
lib.properties = {
	id: 'F8A3DF7FF6D29440921219E1461A5222',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#00CC99",
	opacity: 0.00,
	manifest: [
		{src:"images/ERPScr1Heli_atlas_1.png", id:"ERPScr1Heli_atlas_1"}
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
an.compositions['F8A3DF7FF6D29440921219E1461A5222'] = {
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