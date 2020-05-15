(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ERPScr1Heli_atlas_1", frames: [[767,169,45,45],[826,155,70,35],[577,168,70,35],[814,192,70,28],[577,205,70,28],[898,187,45,45],[705,169,60,37],[834,255,4,5],[847,100,4,7],[1019,173,3,4],[572,214,3,3],[938,49,2,3],[891,220,4,7],[705,208,57,34],[689,214,12,23],[766,0,85,65],[1015,213,6,3],[649,255,13,10],[1011,23,10,22],[673,255,12,7],[993,218,29,22],[904,234,34,32],[853,0,83,57],[431,249,22,14],[481,242,27,16],[157,242,36,20],[374,247,24,14],[195,242,30,23],[40,242,39,23],[978,251,11,17],[940,251,15,19],[481,214,60,26],[360,253,11,12],[1016,66,8,10],[812,255,8,4],[955,135,62,42],[766,67,58,50],[938,0,71,47],[766,119,58,48],[938,54,2,3],[942,49,72,42],[342,253,16,10],[898,135,55,50],[1019,152,3,5],[1019,159,3,5],[849,67,2,3],[849,72,2,2],[1023,23,1,2],[0,242,38,26],[1019,166,3,5],[945,187,7,18],[805,216,4,3],[886,210,9,8],[741,244,20,17],[853,222,17,10],[1016,47,6,17],[649,168,54,44],[801,255,9,5],[543,214,27,18],[957,251,19,12],[624,235,23,24],[664,255,7,13],[689,244,26,15],[322,253,18,11],[717,244,22,17],[898,113,42,20],[1016,78,8,9],[543,235,42,32],[1015,179,9,14],[1019,147,5,3],[945,207,7,8],[325,214,47,37],[649,214,38,39],[431,214,48,33],[764,216,39,37],[942,93,70,40],[826,113,70,40],[374,214,55,31],[325,0,250,212],[945,218,46,31],[81,242,36,24],[0,0,323,240],[853,59,87,52],[805,222,46,31],[1014,93,10,26],[528,242,12,22],[510,242,16,27],[826,67,21,31],[993,242,15,28],[814,169,10,20],[1011,0,13,21],[304,242,16,31],[955,179,58,37],[1019,131,3,6],[1019,139,3,6],[400,247,29,11],[577,0,187,166],[822,255,4,7],[828,255,4,7],[789,255,10,6],[777,255,10,7],[886,192,7,16],[1015,195,7,16],[872,222,17,10],[1014,121,10,8],[763,255,12,7],[1010,242,12,17],[826,100,19,11],[455,249,22,13],[587,235,35,29],[266,242,36,17],[119,242,36,22],[227,242,37,17],[853,234,49,29]]}
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



(lib.CachedBmp_788 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_786 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_789 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_784 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_787 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_785 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_790 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_783 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_780 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_782 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_775 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_776 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_779 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_777 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_774 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_781 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_773 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_770 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_772 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_771 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_769 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_766 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_768 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_767 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_764 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_761 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_760 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_763 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_765 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_762 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_758 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_759 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_756 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_755 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_754 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_757 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_752 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_753 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_750 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_748 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_751 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_749 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_746 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_744 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_743 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_747 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_740 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_741 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_742 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_745 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_739 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_738 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_735 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_734 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_732 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_737 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_733 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_736 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_730 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_729 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_731 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_727 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_726 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_725 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_728 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_724 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_721 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_722 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_723 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_719 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_720 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_718 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_717 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_716 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_715 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_679 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_678 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_680 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(77);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_677 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(78);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_673 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(79);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_674 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(80);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_676 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(81);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_675 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(82);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_672 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(83);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_668 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(84);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_667 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(85);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_664 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(86);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_671 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(87);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_665 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(88);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_670 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(89);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_669 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(90);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_663 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(91);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_661 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(92);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_827 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(93);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_829 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(94);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_830 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(95);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_662 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(96);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_828 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(97);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_826 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(98);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_825 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(99);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_822 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(100);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_824 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(101);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_823 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(102);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_820 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(103);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_821 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(104);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_817 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(105);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_816 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(106);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_819 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(107);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_815 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(108);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_818 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(109);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_812 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(110);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_814 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(111);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_813 = function() {
	this.initialize(ss["ERPScr1Heli_atlas_1"]);
	this.gotoAndStop(112);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_811 = function() {
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
	this.instance = new lib.CachedBmp_790();
	this.instance.setTransform(-6.3,-3.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.heliShadow, new cjs.Rectangle(-6.3,-3.9,30,18.5), null);


(lib.Group = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_789();
	this.instance.setTransform(0,10.35,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_788();
	this.instance_1.setTransform(22.3,2.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_787();
	this.instance_2.setTransform(0.85,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,44.8,27.9), null);


(lib.Group_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_3 = new lib.CachedBmp_786();
	this.instance_3.setTransform(0,10.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_785();
	this.instance_4.setTransform(22.3,2.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_784();
	this.instance_5.setTransform(0.85,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,44.8,27.9), null);


(lib.flag_Connsvg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// flag_Conn_svg
	this.instance = new lib.CachedBmp_680();
	this.instance.setTransform(9.7,33.85,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_679();
	this.instance_1.setTransform(4.4,16.55,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_678();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_677();
	this.instance_3.setTransform(67.35,33.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_676();
	this.instance_4.setTransform(47.2,22.6,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_675();
	this.instance_5.setTransform(210.05,137.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,253.6,163.7);


(lib.flag_APS = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_674();
	this.instance.setTransform(4.4,25.55,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_673();
	this.instance_1.setTransform(1.9,12.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_672();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_671();
	this.instance_3.setTransform(93.4,72.85,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_670();
	this.instance_4.setTransform(88.95,69.7,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_669();
	this.instance_5.setTransform(82,65.85,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_668();
	this.instance_6.setTransform(77.7,58.95,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_667();
	this.instance_7.setTransform(70.95,58.05,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_670();
	this.instance_8.setTransform(66.4,53.8,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_665();
	this.instance_9.setTransform(55.65,44.3,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_664();
	this.instance_10.setTransform(47.5,37.4,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_663();
	this.instance_11.setTransform(38.7,33.35,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_662();
	this.instance_12.setTransform(24.4,17.25,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_661();
	this.instance_13.setTransform(117.7,96.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.flag_APS, new cjs.Rectangle(0,0,146.7,114.7), null);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_830();
	this.instance.setTransform(-7.1,-1.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_829();
	this.instance_1.setTransform(0.8,-15.25,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_828();
	this.instance_2.setTransform(0.8,-15.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_827();
	this.instance_3.setTransform(-2.05,-15.25,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_826();
	this.instance_4.setTransform(-2.5,-15.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_825();
	this.instance_5.setTransform(-2.4,-18.25,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_824();
	this.instance_6.setTransform(-3.55,-16.8,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_823();
	this.instance_7.setTransform(0.05,-16.8,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_822();
	this.instance_8.setTransform(-2.45,-11.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_821();
	this.instance_9.setTransform(-2.45,-10.25,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_820();
	this.instance_10.setTransform(-4.2,-9.9,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_819();
	this.instance_11.setTransform(-4.6,-10.05,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_818();
	this.instance_12.setTransform(-8.95,-8.2,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_817();
	this.instance_13.setTransform(-2.95,-8.1,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_816();
	this.instance_14.setTransform(-2.95,-6.35,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_815();
	this.instance_15.setTransform(-5.5,-2.85,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_814();
	this.instance_16.setTransform(-8.95,-1.15,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_813();
	this.instance_17.setTransform(-9.1,4.6,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_812();
	this.instance_18.setTransform(-9.05,6.9,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_811();
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
	this.instance_2 = new lib.CachedBmp_783();
	this.instance_2.setTransform(78.9,71.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_782();
	this.instance_3.setTransform(75.8,69.75,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_781();
	this.instance_4.setTransform(68.15,63.3,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_780();
	this.instance_5.setTransform(75.8,64.1,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_779();
	this.instance_6.setTransform(78.7,65.55,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_779();
	this.instance_7.setTransform(81.6,67.05,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_777();
	this.instance_8.setTransform(68.45,61.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_776();
	this.instance_9.setTransform(43.4,42,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_775();
	this.instance_10.setTransform(43.55,41.75,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_774();
	this.instance_11.setTransform(42.15,36.9,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_773();
	this.instance_12.setTransform(42.15,36.3,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_772();
	this.instance_13.setTransform(44,37.4,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_771();
	this.instance_14.setTransform(82.7,58.5,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_770();
	this.instance_15.setTransform(82.5,59.15,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_769();
	this.instance_16.setTransform(107.2,84.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_768();
	this.instance_17.setTransform(68.85,68,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_767();
	this.instance_18.setTransform(110.4,89.45,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_766();
	this.instance_19.setTransform(100.95,74.95,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_765();
	this.instance_20.setTransform(98.3,79.7,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_764();
	this.instance_21.setTransform(98.3,73.15,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_763();
	this.instance_22.setTransform(93.2,67.6,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_762();
	this.instance_23.setTransform(94.5,79.05,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_761();
	this.instance_24.setTransform(85.8,63.7,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_760();
	this.instance_25.setTransform(97.15,72.45,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_759();
	this.instance_26.setTransform(68.55,55.7,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_758();
	this.instance_27.setTransform(86.45,74.6,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_757();
	this.instance_28.setTransform(43.3,45.2,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_756();
	this.instance_29.setTransform(42.4,49.4,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_755();
	this.instance_30.setTransform(44.65,50.35,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_754();
	this.instance_31.setTransform(44.85,48.8,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_753();
	this.instance_32.setTransform(85.5,69.05,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_752();
	this.instance_33.setTransform(88.15,66.9,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_751();
	this.instance_34.setTransform(70,76.7,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_750();
	this.instance_35.setTransform(72.5,73.4,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_749();
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
	this.instance_2 = new lib.CachedBmp_748();
	this.instance_2.setTransform(63,125.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_747();
	this.instance_3.setTransform(60.95,123.95,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_746();
	this.instance_4.setTransform(55.85,119,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_745();
	this.instance_5.setTransform(61.25,119.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_744();
	this.instance_6.setTransform(63.1,120.85,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_743();
	this.instance_7.setTransform(65,122,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_742();
	this.instance_8.setTransform(56.3,118.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_741();
	this.instance_9.setTransform(40.35,102.7,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_740();
	this.instance_10.setTransform(40.45,102.55,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_739();
	this.instance_11.setTransform(39.85,98.85,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_738();
	this.instance_12.setTransform(39.85,98.45,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_737();
	this.instance_13.setTransform(41.05,99.25,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_736();
	this.instance_14.setTransform(66.45,115.6,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_735();
	this.instance_15.setTransform(66.1,116.1,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_734();
	this.instance_16.setTransform(81.35,135.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_733();
	this.instance_17.setTransform(56.35,122.55,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_732();
	this.instance_18.setTransform(83,139.35,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_731();
	this.instance_19.setTransform(77.65,128.3,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_730();
	this.instance_20.setTransform(75.85,131.7,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_729();
	this.instance_21.setTransform(75.95,126.9,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_728();
	this.instance_22.setTransform(72.75,122.75,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_727();
	this.instance_23.setTransform(73.3,131.25,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_726();
	this.instance_24.setTransform(67.9,119.75,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_725();
	this.instance_25.setTransform(75.2,126.3,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_724();
	this.instance_26.setTransform(56.5,113.45,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_723();
	this.instance_27.setTransform(68.05,127.75,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_722();
	this.instance_28.setTransform(39.95,105.15,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_721();
	this.instance_29.setTransform(38.8,108.3,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_720();
	this.instance_30.setTransform(40.3,109.05,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_719();
	this.instance_31.setTransform(40.85,107.85,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_718();
	this.instance_32.setTransform(67.6,123.45,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_717();
	this.instance_33.setTransform(69.4,121.8,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_716();
	this.instance_34.setTransform(56.25,129,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_715();
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
	this.instance = new lib.buoy();
	this.instance.setTransform(12.35,18.25,1,1,-3.487,0,0,12.4,18.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.buoymkccopy, new cjs.Rectangle(0.2,-0.1,25.400000000000002,37.6), null);


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

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(369).to({_off:false},0).to({regX:437.8,regY:261.9,rotation:6.0155,x:206.3,y:443.35},274).to({regX:437.7,regY:261.4,rotation:-3.2277,x:284.55,y:486.4},57).to({regX:437.8,regY:261.6,rotation:-3.2277,x:284.7,y:486.6},40,cjs.Ease.quadOut).to({regX:437.9,rotation:4.8572,x:576.1,y:647},594,cjs.Ease.cubicIn).wait(1).to({regX:469.5,regY:286.8,rotation:4.858,x:606.35,y:675.3},0).wait(1).to({rotation:4.8588,x:607.35,y:675.8},0).wait(1).to({rotation:4.8596,x:608.3,y:676.35},0).wait(1).to({rotation:4.8603,x:609.25,y:676.85},0).wait(1).to({rotation:4.8611,x:610.25,y:677.45},0).wait(1).to({rotation:4.8619,x:611.2,y:677.95},0).wait(1).to({rotation:4.8627,x:612.2,y:678.5},0).wait(1).to({rotation:4.8635,x:613.15,y:679},0).wait(1).to({rotation:4.8642,x:614.15,y:679.55},0).wait(1).to({rotation:4.865,x:615.15,y:680.1},0).wait(1).to({rotation:4.8658,x:616.1,y:680.6},0).wait(1).to({rotation:4.8666,x:617.05,y:681.15},0).wait(1).to({rotation:4.8674,x:618.05,y:681.75},0).wait(1).to({rotation:4.8682,x:619.05,y:682.3},0).wait(1).to({rotation:4.869,x:620.05,y:682.85},0).wait(1).to({rotation:4.8698,x:621.05,y:683.35},0).wait(1).to({rotation:4.8706,x:622.05,y:683.9},0).wait(1).to({rotation:4.8714,x:623.05,y:684.45},0).wait(1).to({rotation:4.8722,x:624.05,y:685},0).wait(1).to({rotation:4.873,x:625.05,y:685.6},0).wait(1).to({rotation:4.8739,x:626.05,y:686.15},0).wait(1).to({rotation:4.8747,x:627.05,y:686.7},0).wait(1).to({rotation:4.8755,x:628.1,y:687.25},0).wait(1).to({rotation:4.8763,x:629.05,y:687.8},0).wait(1).to({rotation:4.8771,x:630.05,y:688.35},0).wait(1).to({rotation:4.8779,x:631.1,y:688.9},0).wait(1).to({rotation:4.8788,x:632.1,y:689.45},0).wait(1).to({rotation:4.8796,x:633.15,y:690.05},0).wait(1).to({rotation:4.8804,x:634.2,y:690.65},0).wait(1).to({rotation:4.8813,x:635.2,y:691.2},0).wait(1).to({rotation:4.8821,x:636.25,y:691.75},0).wait(1).to({rotation:4.8829,x:637.3,y:692.3},0).wait(1).to({rotation:4.8838,x:638.35,y:692.9},0).wait(1).to({rotation:4.8846,x:639.4,y:693.5},0).wait(1).to({rotation:4.8854,x:640.4,y:694.05},0).wait(1).to({rotation:4.8863,x:641.4,y:694.65},0).wait(1).to({rotation:4.8871,x:642.5,y:695.2},0).wait(1).to({rotation:4.888,x:643.55,y:695.8},0).wait(1).to({rotation:4.8888,x:644.6,y:696.35},0).wait(1).to({rotation:4.8897,x:645.65,y:696.95},0).wait(1).to({rotation:4.8905,x:646.7,y:697.55},0).wait(1).to({rotation:4.8914,x:647.8,y:698.15},0).wait(1).to({rotation:4.8923,x:648.85,y:698.7},0).wait(1).to({rotation:4.8931,x:649.9,y:699.3},0).wait(1).to({rotation:4.894,x:651,y:699.9},0).wait(1).to({rotation:4.8948,x:652.05,y:700.45},0).wait(1).to({rotation:4.8957,x:653.1,y:701.05},0).wait(1).to({rotation:4.8966,x:654.15,y:701.65},0).wait(1).to({rotation:4.8974,x:655.25,y:702.25},0).wait(1).to({rotation:4.8983,x:656.35,y:702.85},0).wait(1).to({rotation:4.8992,x:657.45,y:703.45},0).wait(1).to({rotation:4.9001,x:658.5,y:704.05},0).wait(1).to({rotation:4.901,x:659.6,y:704.65},0).wait(1).to({rotation:4.9018,x:660.7,y:705.25},0).wait(1).to({rotation:4.9027,x:661.8,y:705.85},0).wait(1).to({rotation:4.9036,x:662.9,y:706.5},0).wait(1).to({rotation:4.9045,x:664,y:707.1},0).wait(1).to({rotation:4.9054,x:665.15,y:707.7},0).wait(1).to({rotation:4.9063,x:666.2,y:708.3},0).wait(1).to({rotation:4.9072,x:667.25,y:708.9},0).wait(1).to({rotation:4.9081,x:668.35,y:709.5},0).wait(1).to({rotation:4.909,x:669.5,y:710.15},0).wait(1).to({rotation:4.9099,x:670.6,y:710.75},0).wait(1).to({rotation:4.9108,x:671.75,y:711.35},0).wait(1).to({rotation:4.9117,x:672.85,y:712},0).wait(1).to({rotation:4.9126,x:674,y:712.6},0).wait(1).to({rotation:4.9135,x:675.1,y:713.2},0).wait(1).to({rotation:4.9144,x:676.25,y:713.85},0).wait(1).to({rotation:4.9153,x:677.4,y:714.5},0).wait(1).to({rotation:4.9162,x:678.5,y:715.1},0).wait(1).to({rotation:4.9172,x:679.65,y:715.75},0).wait(1).to({rotation:4.9181,x:680.8,y:716.35},0).wait(1).to({rotation:4.919,x:681.95,y:717},0).wait(1).to({rotation:4.9199,x:683.1,y:717.6},0).wait(1).to({rotation:4.9209,x:684.25,y:718.25},0).wait(1).to({rotation:4.9218,x:685.4,y:718.9},0).wait(1).to({rotation:4.9227,x:686.55,y:719.55},0).wait(1).to({rotation:4.9236,x:687.7,y:720.15},0).wait(1).to({rotation:4.9246,x:688.85,y:720.8},0).wait(1).to({rotation:4.9255,x:690.05,y:721.45},0).wait(1).to({rotation:4.9265,x:691.15,y:722.05},0).wait(1).to({rotation:4.9274,x:692.35,y:722.75},0).wait(1).to({rotation:4.9284,x:693.5,y:723.4},0).wait(1).to({rotation:4.9293,x:694.7,y:724.05},0).wait(1).to({rotation:4.9302,x:695.85,y:724.65},0).wait(1).to({rotation:4.9312,x:697.05,y:725.3},0).wait(1).to({rotation:4.9322,x:698.25,y:725.95},0).wait(1).to({rotation:4.9331,x:699.45,y:726.6},0).wait(1).to({rotation:4.9341,x:700.65,y:727.3},0).wait(1).to({rotation:4.935,x:701.8,y:727.95},0).wait(1).to({rotation:4.936,x:703,y:728.6},0).wait(1).to({rotation:4.937,x:704.15,y:729.25},0).wait(1).to({rotation:4.9379,x:705.35,y:729.9},0).wait(1).to({rotation:4.9389,x:706.6,y:730.55},0).wait(1).to({rotation:4.9399,x:707.8,y:731.25},0).wait(1).to({rotation:4.9408,x:709,y:731.95},0).wait(1).to({rotation:4.9418,x:710.2,y:732.6},0).wait(1).to({rotation:4.9428,x:711.45,y:733.25},0).wait(1).to({rotation:4.9438,x:712.65,y:733.9},0).wait(1).to({rotation:4.9448,x:713.9,y:734.55},0).wait(1).to({rotation:4.9457,x:715.05,y:735.3},0).wait(1).to({rotation:4.9467,x:716.3,y:735.95},0).wait(1).to({rotation:4.9477,x:717.5,y:736.6},0).wait(1).to({rotation:4.9487,x:718.75,y:737.3},0).wait(1).to({rotation:4.9497,x:720,y:737.95},0).wait(1).to({rotation:4.9507,x:721.25,y:738.65},0).wait(1).to({rotation:4.9517,x:722.45,y:739.3},0).wait(1).to({rotation:4.9527,x:723.7,y:740.05},0).wait(1).to({rotation:4.9537,x:724.95,y:740.7},0).wait(1).to({rotation:4.9547,x:726.2,y:741.4},0).wait(1).to({rotation:4.9557,x:727.45,y:742.05},0).wait(1).to({rotation:4.9567,x:728.65,y:742.75},0).wait(1).to({rotation:4.9577,x:729.95,y:743.4},0).wait(1).to({rotation:4.9588,x:731.2,y:744.1},0).wait(1).to({rotation:4.9598,x:732.45,y:744.8},0).wait(1).to({rotation:4.9608,x:733.75,y:745.5},0).wait(1).to({rotation:4.9618,x:735,y:746.2},0).wait(1).to({rotation:4.9628,x:736.25,y:746.9},0).wait(1).to({rotation:4.9639,x:737.55,y:747.55},0).wait(1).to({rotation:4.9649,x:738.85,y:748.3},0).wait(1).to({rotation:4.9659,x:740.05,y:749},0).wait(1).to({rotation:4.967,x:741.35,y:749.7},0).wait(1).to({rotation:4.968,x:742.65,y:750.4},0).wait(1).to({rotation:4.969,x:743.95,y:751.1},0).wait(1).to({rotation:4.9701,x:745.2,y:751.8},0).wait(1).to({rotation:4.9711,x:746.5,y:752.55},0).wait(1).to({rotation:4.9722,x:747.8,y:753.25},0).wait(1).to({rotation:4.9732,x:749.1,y:754},0).wait(1).to({rotation:4.9742,x:750.4,y:754.7},0).wait(1).to({rotation:4.9753,x:751.75,y:755.4},0).wait(1).to({rotation:4.9763,x:753.05,y:756.1},0).wait(1).to({rotation:4.9774,x:754.3,y:756.85},0).wait(1).to({rotation:4.9785,x:755.55,y:757.6},0).wait(1).to({rotation:4.9795,x:756.9,y:758.3},0).wait(1).to({rotation:4.9806,x:758.2,y:759},0).wait(1).to({rotation:4.9816,x:759.55,y:759.75},0).wait(1).to({rotation:4.9827,x:760.85,y:760.5},0).wait(1).to({rotation:4.9838,x:762.2,y:761.25},0).wait(1).to({rotation:4.9849,x:763.5,y:761.95},0).wait(1).to({rotation:4.9859,x:764.85,y:762.65},0).wait(1).to({rotation:4.987,x:766.15,y:763.4},0).wait(1).to({rotation:4.9881,x:767.5,y:764.15},0).wait(1).to({rotation:4.9892,x:768.85,y:764.9},0).wait(1).to({rotation:4.9902,x:770.2,y:765.65},0).wait(1).to({rotation:4.9913,x:771.55,y:766.35},0).wait(1).to({rotation:4.9924,x:772.9,y:767.1},0).wait(1).to({rotation:4.9935,x:774.25,y:767.85},0).wait(1).to({rotation:4.9946,x:775.6,y:768.6},0).wait(1).to({rotation:4.9957,x:776.95,y:769.35},0).wait(1).to({rotation:4.9968,x:778.25,y:770.1},0).wait(1).to({rotation:4.9979,x:779.65,y:770.85},0).wait(1).to({rotation:4.999,x:781,y:771.6},0).wait(1).to({rotation:5.0001,x:782.4,y:772.35},0).wait(1).to({rotation:5.0012,x:783.75,y:773.15},0).wait(1).to({rotation:5.0023,x:785.15,y:773.9},0).wait(1).to({rotation:5.0034,x:786.5,y:774.65},0).wait(1).to({rotation:5.0045,x:787.9,y:775.4},0).wait(1).to({rotation:5.0056,x:789.3,y:776.15},0).wait(1).to({rotation:5.0068,x:790.65,y:776.9},0).wait(1).to({rotation:5.0079,x:792,y:777.7},0).wait(1).to({rotation:5.009,x:793.4,y:778.45},0).wait(1).to({rotation:5.0101,x:794.8,y:779.2},0).wait(1).to({rotation:5.0113,x:796.2,y:779.95},0).wait(1).to({rotation:5.0124,x:797.6,y:780.75},0).wait(1).to({rotation:5.0135,x:799.05,y:781.55},0).wait(1).to({rotation:5.0146,x:800.45,y:782.3},0).wait(1).to({rotation:5.0158,x:801.85,y:783.1},0).wait(1).to({rotation:5.0169,x:803.2,y:783.85},0).wait(1).to({rotation:5.0181,x:804.65,y:784.6},0).wait(1).to({rotation:5.0192,x:806.05,y:785.4},0).wait(1).to({rotation:5.0203,x:807.5,y:786.2},0).wait(1).to({rotation:5.0215,x:808.9,y:787},0).wait(1).to({rotation:5.0226,x:810.35,y:787.75},0).wait(1).to({rotation:5.0238,x:811.75,y:788.55},0).wait(1).to({rotation:5.0249,x:813.2,y:789.3},0).wait(1).to({rotation:5.0261,x:814.65,y:790.15},0).wait(1).to({rotation:5.0273,x:816.05,y:790.95},0).wait(1).to({rotation:5.0284,x:817.5,y:791.7},0).wait(1).to({rotation:5.0296,x:818.9,y:792.5},0).wait(1).to({rotation:5.0307,x:820.35,y:793.3},0).wait(1).to({rotation:5.0319,x:821.8,y:794.1},0).wait(1).to({rotation:5.0331,x:823.3,y:794.9},0).wait(1).to({rotation:5.0342,x:824.75,y:795.7},0).wait(1).to({rotation:5.0354,x:826.2,y:796.5},0).wait(1).to({rotation:5.0366,x:827.6,y:797.3},0).wait(1).to({rotation:5.0378,x:829.1,y:798.1},0).wait(1).to({rotation:5.039,x:830.55,y:798.95},0).wait(1).to({rotation:5.0401,x:832,y:799.75},0).wait(1).to({rotation:5.0413,x:833.5,y:800.55},0).wait(1).to({rotation:5.0425,x:834.95,y:801.35},0).wait(1).to({rotation:5.0437,x:836.45,y:802.15},0).wait(1).to({rotation:5.0449,x:837.95,y:803},0).wait(1).to({rotation:5.0461,x:839.4,y:803.8},0).wait(1).to({rotation:5.0473,x:840.85,y:804.6},0).wait(1).to({rotation:5.0485,x:842.3,y:805.4},0).wait(1).to({rotation:5.0497,x:843.8,y:806.25},0).wait(1).to({rotation:5.0509,x:845.3,y:807.1},0).wait(1).to({rotation:5.0521,x:846.8,y:807.9},0).wait(1).to({rotation:5.0533,x:848.3,y:808.7},0).wait(1).to({rotation:5.0545,x:849.8,y:809.55},0).wait(1).to({rotation:5.0557,x:851.3,y:810.35},0).wait(1).to({rotation:5.0569,x:852.75,y:811.2},0).wait(1).to({rotation:5.0582,x:854.3,y:812.05},0).wait(1).to({rotation:5.0594,x:855.8,y:812.85},0).wait(1).to({rotation:5.0606,x:857.3,y:813.7},0).wait(1).to({rotation:5.0618,x:858.85,y:814.5},0).wait(1).to({rotation:5.063,x:860.35,y:815.4},0).wait(1).to({rotation:5.0643,x:861.9,y:816.25},0).wait(1).to({rotation:5.0655,x:863.4,y:817.05},0).wait(1).to({rotation:5.0667,x:864.9,y:817.9},0).wait(1).to({rotation:5.068,x:866.45,y:818.7},0).wait(1).to({rotation:5.0692,x:868,y:819.6},0).wait(1).to({rotation:5.0704,x:869.5,y:820.45},0).wait(1).to({rotation:5.0717,x:871.05,y:821.3},0).wait(1).to({rotation:5.0729,x:872.6,y:822.1},0).wait(1).to({rotation:5.0742,x:874.15,y:822.95},0).wait(1).to({rotation:5.0754,x:875.7,y:823.85},0).wait(1).to({rotation:5.0767,x:877.2,y:824.7},0).wait(1).to({rotation:5.0779,x:878.8,y:825.5},0).wait(1).to({rotation:5.0792,x:880.35,y:826.35},0).wait(1).to({rotation:5.0804,x:881.9,y:827.2},0).wait(1).to({rotation:5.0817,x:883.45,y:828.1},0).wait(1).to({rotation:5.083,x:885.05,y:828.95},0).wait(1).to({rotation:5.0842,x:886.6,y:829.8},0).wait(1).to({rotation:5.0855,x:888.2,y:830.65},0).wait(1).to({rotation:5.0868,x:889.7,y:831.5},0).wait(1).to({rotation:5.088,x:891.3,y:832.4},0).wait(1).to({rotation:5.0893,x:892.9,y:833.25},0).wait(1).to({rotation:5.0906,x:894.45,y:834.15},0).wait(1).to({rotation:5.0918,x:896.05,y:835},0).wait(1).to({rotation:5.0931,x:897.65,y:835.85},0).wait(1).to({rotation:5.0944,x:899.25,y:836.8},0).wait(1).to({rotation:5.0957,x:900.85,y:837.65},0).wait(1).to({rotation:5.097,x:902.4,y:838.5},0).wait(1).to({rotation:5.0983,x:904,y:839.4},0).wait(1).to({rotation:5.0996,x:905.6,y:840.3},0).wait(1).to({rotation:5.1008,x:907.2,y:841.15},0).wait(1).to({rotation:5.1021,x:908.8,y:842.05},0).wait(1).to({rotation:5.1034,x:910.4,y:842.9},0).wait(1).to({rotation:5.1047,x:912.05,y:843.8},0).wait(1).to({rotation:5.106,x:913.65,y:844.75},0).wait(1).to({rotation:5.1073,x:915.25,y:845.6},0).wait(1).to({rotation:5.1086,x:916.85,y:846.5},0).wait(1).to({rotation:5.1099,x:918.5,y:847.35},0).wait(1).to({rotation:5.1113,x:920.1,y:848.25},0).wait(1).to({rotation:5.1126,x:921.75,y:849.2},0).wait(1).to({rotation:5.1139,x:923.4,y:850.1},0).wait(1).to({rotation:5.1152,x:925,y:850.95},0).wait(1).to({rotation:5.1165,x:926.65,y:851.85},0).wait(1).to({rotation:5.1178,x:928.2,y:852.8},0).wait(1).to({rotation:5.1192,x:929.85,y:853.7},0).wait(1).to({rotation:5.1205,x:931.5,y:854.6},0).wait(1).to({rotation:5.1218,x:933.15,y:855.5},0).wait(1).to({rotation:5.1231,x:934.8,y:856.4},0).wait(1).to({rotation:5.1245,x:936.45,y:857.35},0).wait(1).to({rotation:5.1258,x:938.1,y:858.25},0).wait(1).to({rotation:5.1271,x:939.7,y:859.15},0).wait(1).to({rotation:5.1285,x:941.4,y:860.05},0).wait(1).to({rotation:5.1298,x:943.05,y:860.95},0).wait(1).to({rotation:5.1312,x:944.7,y:861.9},0).wait(1).to({rotation:5.1325,x:946.4,y:862.8},0).wait(1).to({rotation:5.1338,x:948.05,y:863.7},0).wait(1).to({rotation:5.1352,x:949.75,y:864.6},0).wait(1).to({rotation:5.1365,x:951.35,y:865.6},0).wait(1).to({rotation:5.1379,x:953.05,y:866.5},0).wait(1).to({rotation:5.1392,x:954.75,y:867.4},0).wait(1).to({rotation:5.1406,x:956.4,y:868.3},0).wait(1).to({rotation:5.142,x:958.1,y:869.25},0).wait(1).to({rotation:5.1433,x:959.8,y:870.2},0).wait(1).to({rotation:5.1447,x:961.5,y:871.15},0).wait(1).to({rotation:5.146,x:963.2,y:872.05},0).wait(1).to({rotation:5.1474,x:964.85,y:872.95},0).wait(1).to({rotation:5.1488,x:966.55,y:873.95},0).wait(1).to({rotation:5.1501,x:968.25,y:874.85},0).wait(1).to({rotation:5.1515,x:969.95,y:875.8},0).wait(1).to({rotation:5.1529,x:971.65,y:876.7},0).wait(1).to({rotation:5.1543,x:973.4,y:877.65},0).wait(1).to({rotation:5.1557,x:975.1,y:878.65},0).wait(1).to({rotation:5.157,x:976.75,y:879.55},0).wait(1).to({rotation:5.1584,x:978.5,y:880.5},0).wait(1).to({rotation:5.1598,x:980.2,y:881.45},0).wait(1).to({rotation:5.1612,x:981.95,y:882.4},0).wait(1).to({rotation:5.1626,x:983.65,y:883.35},0).wait(1).to({rotation:5.164,x:985.4,y:884.3},0).wait(1).to({rotation:5.1654,x:987.15,y:885.25},0).wait(1).to({rotation:5.1668,x:988.85,y:886.2},0).wait(1).to({rotation:5.1682,x:990.55,y:887.2},0).wait(1).to({rotation:5.1696,x:992.3,y:888.1},0).wait(1).to({rotation:5.171,x:994.05,y:889.05},0).wait(1).to({rotation:5.1724,x:995.8,y:890},0).wait(1).to({rotation:5.1738,x:997.55,y:891},0).wait(1).to({rotation:5.1752,x:999.3,y:891.95},0).wait(1).to({rotation:5.1766,x:1001,y:892.9},0).wait(1).to({rotation:5.178,x:1002.75,y:893.85},0).wait(1).to({rotation:5.1794,x:1004.5,y:894.85},0).wait(1).to({rotation:5.1808,x:1006.25,y:895.85},0).wait(1).to({rotation:5.1822,x:1008.05,y:896.8},0).wait(1).to({rotation:5.1837,x:1009.8,y:897.75},0).wait(1).to({rotation:5.1851,x:1011.55,y:898.75},0).wait(1).to({rotation:5.1865,x:1013.3,y:899.65},0).wait(1).to({rotation:5.1879,x:1015,y:900.65},0).wait(1).to({rotation:5.1893,x:1016.8,y:901.6},0).wait(1).to({rotation:5.1908,x:1018.55,y:902.6},0).wait(1).to({rotation:5.1922,x:1020.35,y:903.55},0).wait(1).to({rotation:5.1936,x:1022.15,y:904.55},0).wait(1).to({rotation:5.1951,x:1023.9,y:905.5},0).wait(1).to({rotation:5.1965,x:1025.7,y:906.5},0).wait(1).to({rotation:5.198,x:1027.45,y:907.5},0).wait(1).to({rotation:5.1994,x:1029.25,y:908.5},0).wait(1).to({rotation:5.2008,x:1031.05,y:909.45},0).wait(1).to({rotation:5.2023,x:1032.85,y:910.45},0).wait(1).to({rotation:5.2037,x:1034.65,y:911.45},0).wait(1).to({rotation:5.2052,x:1036.45,y:912.45},0).wait(1).to({rotation:5.2066,x:1038.2,y:913.4},0).wait(1).to({rotation:5.2081,x:1040,y:914.4},0).wait(1).to({rotation:5.2095,x:1041.8,y:915.4},0).wait(1).to({rotation:5.211,x:1043.6,y:916.4},0).wait(1).to({rotation:5.2124,x:1045.45,y:917.4},0).wait(1).to({rotation:5.2139,x:1047.25,y:918.4},0).wait(1).to({rotation:5.2154,x:1049.05,y:919.4},0).wait(1).to({rotation:5.2168,x:1050.9,y:920.4},0).wait(1).to({rotation:5.2183,x:1052.65,y:921.4},0).wait(1).to({rotation:5.2198,x:1054.5,y:922.4},0).wait(1).to({rotation:5.2212,x:1056.3,y:923.4},0).wait(1).to({rotation:5.2227,x:1058.15,y:924.4},0).wait(1).to({rotation:5.2242,x:1060,y:925.4},0).wait(1).to({rotation:5.2257,x:1061.8,y:926.4},0).wait(1).to({rotation:5.2271,x:1063.6,y:927.4},0).wait(1).to({rotation:5.2286,x:1065.45,y:928.45},0).wait(1).to({rotation:5.2301,x:1067.3,y:929.45},0).wait(1).to({rotation:5.2316,x:1069.15,y:930.45},0).wait(1).to({rotation:5.2331,x:1071,y:931.45},0).wait(1).to({rotation:5.2345,x:1072.85,y:932.5},0).wait(1).to({rotation:5.236,x:1074.7,y:933.5},0).wait(1).to({rotation:5.2375,x:1076.5,y:934.5},0).wait(1).to({rotation:5.239,x:1078.35,y:935.55},0).wait(1).to({rotation:5.2405,x:1080.2,y:936.6},0).wait(1).to({rotation:5.242,x:1082.05,y:937.6},0).wait(1).to({rotation:5.2435,x:1083.9,y:938.6},0).wait(1).to({rotation:5.245,x:1085.8,y:939.6},0).wait(1).to({rotation:5.2465,x:1087.65,y:940.7},0).wait(1).to({rotation:5.248,x:1089.45,y:941.7},0).wait(1).to({rotation:5.2495,x:1091.35,y:942.7},0).wait(1).to({rotation:5.251,x:1093.2,y:943.75},0).wait(1).to({rotation:5.2525,x:1095.1,y:944.8},0).wait(1).to({rotation:5.254,x:1096.9,y:945.8},0).wait(1).to({rotation:5.2555,x:1098.8,y:946.85},0).wait(1).to({rotation:5.2571,x:1100.7,y:947.85},0).wait(1).to({rotation:5.2586,x:1102.5,y:948.95},0).wait(1).to({rotation:5.2601,x:1104.4,y:949.95},0).wait(1).to({rotation:5.2616,x:1106.3,y:951},0).wait(1).to({rotation:5.2631,x:1108.2,y:952},0).wait(1).to({rotation:5.2646,x:1110.1,y:953.1},0).wait(1).to({rotation:5.2662,x:1112,y:954.1},0).wait(1).to({rotation:5.2677,x:1113.85,y:955.15},0).wait(1).to({rotation:5.2692,x:1115.75,y:956.2},0).wait(1).to({rotation:5.2708,x:1117.65,y:957.25},0).wait(1).to({rotation:5.2723,x:1119.55,y:958.3},0).wait(1).to({rotation:5.2738,x:1121.45,y:959.35},0).wait(1).to({rotation:5.2754,x:1123.35,y:960.35},0).wait(1).to({rotation:5.2769,x:1125.2,y:961.45},0).wait(1).to({rotation:5.2784,x:1127.15,y:962.5},0).wait(1).to({rotation:5.28,x:1129.05,y:963.55},0).wait(1).to({rotation:5.2815,x:1130.95,y:964.55},0).wait(1).to({rotation:5.283,x:1132.9,y:965.65},0).wait(1).to({rotation:5.2846,x:1134.8,y:966.7},0).wait(1).to({rotation:5.2861,x:1136.75,y:967.75},0).wait(1).to({rotation:5.2877,x:1138.6,y:968.8},0).wait(1).to({rotation:5.2892,x:1140.55,y:969.9},0).wait(1).to({rotation:5.2908,x:1142.45,y:970.95},0).wait(1).to({rotation:5.2923,x:1144.4,y:971.95},0).wait(1).to({rotation:5.2939,x:1146.35,y:973},0).wait(1).to({rotation:5.2954,x:1148.25,y:974.1},0).wait(1).to({rotation:5.297,x:1150.15,y:975.15},0).wait(1).to({rotation:5.2986,x:1152.1,y:976.2},0).wait(1).to({rotation:5.3001,x:1154.05,y:977.25},0).wait(1).to({rotation:5.3017,x:1156,y:978.35},0).wait(1).to({rotation:5.3033,x:1157.95,y:979.4},0).wait(1).to({rotation:5.3048,x:1159.9,y:980.45},0).wait(1).to({rotation:5.3064,x:1161.85,y:981.55},0).wait(1).to({rotation:5.308,x:1163.75,y:982.65},0).wait(1).to({rotation:5.3095,x:1165.7,y:983.7},0).wait(1).to({rotation:5.3111,x:1167.65,y:984.75},0).wait(1).to({rotation:5.3127,x:1169.6,y:985.8},0).wait(1).to({rotation:5.3142,x:1171.55,y:986.95},0).wait(1).to({rotation:5.3158,x:1173.5,y:988},0).wait(1).to({rotation:5.3174,x:1175.45,y:989.05},0).wait(1).to({rotation:5.319,x:1177.4,y:990.15},0).wait(1).to({rotation:5.3206,x:1179.3,y:991.25},0).wait(1).to({rotation:5.3222,x:1181.3,y:992.3},0).wait(1).to({rotation:5.3237,x:1183.25,y:993.4},0).wait(1).to({rotation:5.3253,x:1185.25,y:994.45},0).wait(1).to({rotation:5.3269,x:1187.2,y:995.6},0).wait(1).to({rotation:5.3285,x:1189.15,y:996.65},0).wait(1).to({rotation:5.3301,x:1191.1,y:997.75},0).wait(1).to({rotation:5.3317,x:1193.1,y:998.8},0).wait(1).to({rotation:5.3333,x:1195.1,y:999.95},0).wait(1).to({rotation:5.3349,x:1197.1,y:1001},0).wait(1).to({rotation:5.3365,x:1199.05,y:1002.1},0).wait(1).to({rotation:5.3381,x:1201,y:1003.15},0).wait(1).to({rotation:5.3397,x:1203,y:1004.3},0).wait(1).to({rotation:5.3413,x:1205,y:1005.4},0).wait(1).to({rotation:5.3429,x:1207,y:1006.45},0).wait(1).to({rotation:5.3445,x:1209,y:1007.6},0).wait(1).to({rotation:5.3461,x:1211,y:1008.7},0).wait(1).to({rotation:5.3477,x:1212.95,y:1009.75},0).wait(1).to({rotation:5.3493,x:1214.95,y:1010.85},0).wait(1).to({rotation:5.3509,x:1216.95,y:1012},0).wait(1).to({rotation:5.3525,x:1218.95,y:1013.1},0).wait(1).to({rotation:5.3541,x:1220.95,y:1014.2},0).wait(1).to({rotation:5.3558,x:1222.95,y:1015.25},0).wait(1).to({rotation:5.3574,x:1225,y:1016.4},0).wait(1).to({rotation:5.359,x:1226.95,y:1017.5},0).wait(1).to({rotation:5.3606,x:1228.95,y:1018.6},0).wait(1).to({rotation:5.3622,x:1230.95,y:1019.7},0).wait(1).to({rotation:5.3639,x:1233,y:1020.85},0).wait(1).to({rotation:5.3655,x:1235,y:1021.95},0).wait(1).to({rotation:5.3671,x:1237,y:1023.05},0).wait(1).to({rotation:5.3687,x:1239,y:1024.15},0).wait(1).to({rotation:5.3704,x:1241.05,y:1025.3},0).wait(1).to({rotation:5.372,x:1243.05,y:1026.4},0).wait(1).to({rotation:5.3736,x:1245.1,y:1027.5},0).wait(1).to({rotation:5.3753,x:1247.15,y:1028.65},0).wait(1).to({rotation:5.3769,x:1249.15,y:1029.75},0).wait(1).to({rotation:5.3785,x:1251.15,y:1030.85},0).wait(1).to({rotation:5.3802,x:1253.2,y:1031.95},0).wait(1).to({rotation:5.3818,x:1255.2,y:1033.1},0).wait(1).to({rotation:5.3834,x:1257.25,y:1034.2},0).wait(1).to({rotation:5.3851,x:1259.3,y:1035.3},0).wait(1).to({rotation:5.3867,x:1261.3,y:1036.45},0).wait(1).to({rotation:5.3884,x:1263.3,y:1037.6},0).wait(1).to({rotation:5.39,x:1265.35,y:1038.7},0).wait(1).to({rotation:5.3917,x:1267.4,y:1039.8},0).wait(1).to({rotation:5.3933,x:1269.45,y:1040.95},0).wait(1).to({rotation:5.395,x:1271.5,y:1042.1},0).wait(1).to({rotation:5.3966,x:1273.55,y:1043.2},0).wait(1).to({rotation:5.3983,x:1275.55,y:1044.3},0).wait(1).to({rotation:5.3999,x:1277.6,y:1045.5},0).wait(1).to({rotation:5.4016,x:1279.65,y:1046.6},0).wait(1).to({rotation:5.4032,x:1281.75,y:1047.7},0).wait(1).to({rotation:5.4049,x:1283.8,y:1048.8},0).wait(1).to({rotation:5.4065,x:1285.85,y:1049.95},0).wait(1).to({rotation:5.4082,x:1287.85,y:1051.1},0).wait(1).to({rotation:5.4099,x:1289.95,y:1052.2},0).wait(1).to({rotation:5.4115,x:1292,y:1053.35},0).wait(1).to({rotation:5.4132,x:1294.1,y:1054.5},0).wait(1).to({rotation:5.4149,x:1296.15,y:1055.65},0).wait(1).to({rotation:5.4165,x:1298.25,y:1056.75},0).wait(1).to({rotation:5.4182,x:1300.25,y:1057.95},0).wait(1).to({rotation:5.4199,x:1302.35,y:1059.05},0).wait(1).to({rotation:5.4215,x:1304.4,y:1060.2},0).wait(1).to({rotation:5.4232,x:1306.5,y:1061.3},0).wait(1).to({rotation:5.4249,x:1308.55,y:1062.5},0).wait(1).to({rotation:5.4265,x:1310.65,y:1063.6},0).wait(1).to({rotation:5.4282,x:1312.7,y:1064.75},0).wait(1).to({rotation:5.4299,x:1314.75,y:1065.9},0).wait(1).to({rotation:5.4316,x:1316.85,y:1067.05},0).wait(1).to({rotation:5.4333,x:1318.95,y:1068.2},0).wait(1).to({rotation:5.4349,x:1321.05,y:1069.35},0).wait(1).to({rotation:5.4366,x:1323.15,y:1070.5},0).wait(1).to({rotation:5.4383,x:1325.2,y:1071.65},0).wait(1).to({rotation:5.44,x:1327.25,y:1072.8},0).wait(1).to({rotation:5.4417,x:1329.35,y:1073.95},0).wait(1).to({rotation:5.4434,x:1331.45,y:1075.15},0).wait(1).to({rotation:5.445,x:1333.55,y:1076.25},0).wait(1).to({rotation:5.4467,x:1335.65,y:1077.4},0).wait(1).to({rotation:5.4484,x:1337.75,y:1078.55},0).wait(1).to({rotation:5.4501,x:1339.8,y:1079.75},0).wait(1).to({rotation:5.4518,x:1341.9,y:1080.9},0).wait(1).to({rotation:5.4535,x:1344,y:1082.05},0).wait(1).to({rotation:5.4552,x:1346.1,y:1083.2},0).wait(1).to({rotation:5.4569,x:1348.2,y:1084.35},0).wait(1).to({rotation:5.4586,x:1350.3,y:1085.5},0).wait(1).to({rotation:5.4603,x:1352.4,y:1086.65},0).wait(1).to({rotation:5.462,x:1354.5,y:1087.85},0).wait(1).to({rotation:5.4637,x:1356.6,y:1089},0).wait(1).to({rotation:5.4654,x:1358.75,y:1090.15},0).wait(1).to({rotation:5.4671,x:1360.85,y:1091.3},0).wait(1).to({rotation:5.4688,x:1362.95,y:1092.5},0).wait(1).to({rotation:5.4705,x:1365.05,y:1093.65},0).wait(1).to({rotation:5.4722,x:1367.15,y:1094.8},0).wait(1).to({rotation:5.4739,x:1369.3,y:1096},0).wait(1).to({rotation:5.4756,x:1371.4,y:1097.15},0).wait(1).to({rotation:5.4773,x:1373.55,y:1098.3},0).wait(1).to({rotation:5.479,x:1375.65,y:1099.55},0).wait(1).to({rotation:5.4808,x:1377.75,y:1100.7},0).wait(1).to({rotation:5.4825,x:1379.9,y:1101.85},0).wait(1).to({rotation:5.4842,x:1382.05,y:1103},0).wait(1).to({rotation:5.4859,x:1384.15,y:1104.2},0).wait(1).to({rotation:5.4876,x:1386.25,y:1105.35},0).wait(1).to({rotation:5.4893,x:1388.4,y:1106.5},0).wait(1).to({rotation:5.4911,x:1390.5,y:1107.75},0).wait(1).to({rotation:5.4928,x:1392.65,y:1108.9},0).wait(1).to({rotation:5.4945,x:1394.8,y:1110.05},0).wait(1).to({rotation:5.4962,x:1396.95,y:1111.2},0).wait(1).to({rotation:5.4979,x:1399.05,y:1112.45},0).wait(1).to({rotation:5.4997,x:1401.2,y:1113.6},0).wait(1).to({rotation:5.5014,x:1403.35,y:1114.75},0).wait(1).to({rotation:5.5031,x:1405.5,y:1115.95},0).wait(1).to({rotation:5.5048,x:1407.65,y:1117.15},0).wait(1).to({rotation:5.5066,x:1409.8,y:1118.25},0).wait(1).to({rotation:5.5083,x:1411.9,y:1119.45},0).wait(1).to({rotation:5.51,x:1414.05,y:1120.65},0).wait(1).to({rotation:5.5118,x:1416.2,y:1121.8},0).wait(1).to({rotation:5.5135,x:1418.35,y:1123},0).wait(1).to({rotation:5.5152,x:1420.45,y:1124.15},0).wait(1).to({rotation:5.517,x:1422.6,y:1125.4},0).wait(1).to({rotation:5.5187,x:1424.7,y:1126.55},0).wait(1).to({rotation:5.5204,x:1426.9,y:1127.7},0).wait(1).to({rotation:5.5222,x:1429.05,y:1128.95},0).wait(1).to({rotation:5.5239,x:1431.2,y:1130.1},0).wait(1).to({rotation:5.5256,x:1433.35,y:1131.3},0).wait(1).to({rotation:5.5274,x:1435.55,y:1132.45},0).wait(1).to({rotation:5.5291,x:1437.65,y:1133.7},0).wait(1).to({rotation:5.5309,x:1439.8,y:1134.85},0).wait(1).to({rotation:5.5326,x:1442,y:1136.05},0).wait(1).to({rotation:5.5344,x:1444.15,y:1137.3},0).wait(1).to({rotation:5.5361,x:1446.35,y:1138.45},0).wait(1).to({rotation:5.5378,x:1448.45,y:1139.65},0).wait(1).to({rotation:5.5396,x:1450.65,y:1140.8},0).wait(1).to({rotation:5.5413,x:1452.8,y:1142.05},0).wait(1).to({rotation:5.5431,x:1455,y:1143.25},0).wait(1).to({rotation:5.5448,x:1457.15,y:1144.4},0).wait(1).to({rotation:5.5466,x:1459.35,y:1145.65},0).wait(1).to({rotation:5.5483,x:1461.45,y:1146.85},0).wait(1).to({rotation:5.5501,x:1463.65,y:1148},0).wait(1).to({rotation:5.5518,x:1465.85,y:1149.2},0).wait(1).to({rotation:5.5536,x:1468,y:1150.45},0).wait(1).to({rotation:5.5554,x:1470.2,y:1151.6},0).wait(1).to({rotation:5.5571,x:1472.4,y:1152.8},0).wait(1).to({rotation:5.5589,x:1474.5,y:1154.05},0).wait(1).to({rotation:5.5606,x:1476.7,y:1155.2},0).wait(1).to({rotation:5.5624,x:1478.9,y:1156.4},0).wait(1).to({rotation:5.5641,x:1481.1,y:1157.6},0).wait(1).to({rotation:5.5659,x:1483.3,y:1158.85},0).wait(1).to({rotation:5.5677,x:1485.45,y:1160.05},0).wait(1).to({rotation:5.5694,x:1487.6,y:1161.2},0).wait(1).to({rotation:5.5712,x:1489.8,y:1162.45},0).wait(1).to({rotation:5.573,x:1492,y:1163.65},0).wait(1).to({rotation:5.5747,x:1494.2,y:1164.85},0).wait(1).to({rotation:5.5765,x:1496.4,y:1166.05},0).wait(1).to({rotation:5.5783,x:1498.5,y:1167.3},0).wait(1).to({rotation:5.58,x:1500.7,y:1168.45},0).wait(1).to({rotation:5.5818,x:1502.9,y:1169.65},0).wait(1).to({rotation:5.5836,x:1505.1,y:1170.9},0).wait(1).to({rotation:5.5853,x:1507.3,y:1172.1},0).wait(1).to({rotation:5.5871,x:1509.5,y:1173.3},0).wait(1).to({rotation:5.5889,x:1511.65,y:1174.5},0).wait(1).to({rotation:5.5907,x:1513.85,y:1175.75},0).wait(1).to({rotation:5.5924,x:1516.1,y:1176.95},0).wait(1).to({rotation:5.5942,x:1518.3,y:1178.15},0).wait(1).to({rotation:5.596,x:1520.5,y:1179.4},0).wait(1).to({rotation:5.5978,x:1522.7,y:1180.6},0).wait(1).to({rotation:5.5995,x:1524.85,y:1181.8},0).wait(1).to({rotation:5.6013,x:1527.1,y:1183},0).wait(1).to({rotation:5.6031,x:1529.3,y:1184.25},0).wait(1).to({rotation:5.6049,x:1531.5,y:1185.45},0).wait(1).to({rotation:5.6066,x:1533.7,y:1186.65},0).wait(1).to({rotation:5.6084,x:1535.9,y:1187.9},0).wait(1).to({rotation:5.6102,x:1538.1,y:1189.1},0).wait(1).to({rotation:5.612,x:1540.3,y:1190.3},0).wait(1).to({rotation:5.6138,x:1542.55,y:1191.45},0).wait(1).to({rotation:5.6156,x:1544.75,y:1192.7},0).wait(1).to({rotation:5.6173,x:1547,y:1193.95},0).wait(1).to({rotation:5.6191,x:1549.15,y:1195.15},0).wait(1).to({rotation:5.6209,x:1551.4,y:1196.4},0).wait(1).to({rotation:5.6227,x:1553.6,y:1197.6},0).wait(1).to({rotation:5.6245,x:1555.85,y:1198.8},0).wait(1).to({rotation:5.6263,x:1558.05,y:1200.05},0).wait(1).to({rotation:5.6281,x:1560.25,y:1201.25},0).wait(1).to({rotation:5.6299,x:1562.45,y:1202.5},0).wait(1).to({rotation:5.6317,x:1564.7,y:1203.7},0).wait(1).to({rotation:5.6334,x:1566.9,y:1204.95},0).wait(1).to({rotation:5.6352,x:1569.15,y:1206.15},0).wait(1).to({rotation:5.637,x:1571.4,y:1207.35},0).wait(1).to({rotation:5.6388,x:1573.55,y:1208.65},0).wait(1).to({rotation:5.6406,x:1575.75,y:1209.85},0).wait(1).to({rotation:5.6424,x:1578,y:1211.05},0).wait(1).to({rotation:5.6442,x:1580.2,y:1212.25},0).wait(1).to({rotation:5.646,x:1582.45,y:1213.55},0).wait(1).to({rotation:5.6478,x:1584.7,y:1214.75},0).wait(1).to({rotation:5.6496,x:1586.9,y:1215.95},0).wait(1).to({rotation:5.6514,x:1589.1,y:1217.25},0).wait(1).to({rotation:5.6532,x:1591.35,y:1218.45},0).wait(1).to({rotation:5.655,x:1593.6,y:1219.65},0).wait(1).to({rotation:5.6568,x:1595.85,y:1220.85},0).wait(1).to({rotation:5.6586,x:1598.1,y:1222.15},0).wait(1).to({rotation:5.6604,x:1600.25,y:1223.35},0).wait(1).to({rotation:5.6622,x:1602.5,y:1224.6},0).wait(1).to({rotation:5.664,x:1604.75,y:1225.85},0).wait(1).to({rotation:5.6658,x:1607,y:1227.05},0).wait(1).to({rotation:5.6676,x:1609.25,y:1228.3},0).wait(1).to({rotation:5.6694,x:1611.45,y:1229.55},0).wait(1).to({rotation:5.6712,x:1613.7,y:1230.75},0).wait(1).to({rotation:5.673,x:1615.95,y:1232},0).wait(1).to({rotation:5.6749,x:1618.2,y:1233.2},0).wait(1).to({rotation:5.6767,x:1620.45,y:1234.5},0).wait(1).to({rotation:5.6785,x:1622.65,y:1235.7},0).wait(1).to({rotation:5.6803,x:1624.9,y:1236.95},0).wait(1).to({rotation:5.6821,x:1627.15,y:1238.2},0).wait(1).to({rotation:5.6839,x:1629.4,y:1239.4},0).wait(1).to({rotation:5.6857,x:1631.65,y:1240.65},0).wait(1).to({rotation:5.6875,x:1633.9,y:1241.85},0).wait(1).to({rotation:5.6893,x:1636.1,y:1243.15},0).wait(1).to({rotation:5.6912,x:1638.4,y:1244.35},0).wait(1).to({rotation:5.693,x:1640.65,y:1245.6},0).wait(1).to({rotation:5.6948,x:1642.9,y:1246.85},0).wait(1).to({rotation:5.6966,x:1645.15,y:1248.1},0).wait(1).to({rotation:5.6984,x:1647.35,y:1249.3},0).wait(1).to({rotation:5.7002,x:1649.65,y:1250.6},0).wait(1).to({rotation:5.702,x:1651.9,y:1251.85},0).wait(1).to({rotation:5.7039,x:1654.1,y:1253.05},0).wait(1).to({rotation:5.7057,x:1656.35,y:1254.3},0).wait(1).to({rotation:5.7075,x:1658.65,y:1255.55},0).wait(1).to({rotation:5.7093,x:1660.85,y:1256.8},0).wait(1).to({rotation:5.7111,x:1663.1,y:1258},0).wait(1).to({rotation:5.713,x:1665.35,y:1259.25},0).wait(1).to({rotation:5.7148,x:1667.65,y:1260.5},0).wait(1).to({rotation:5.7166,x:1669.9,y:1261.7},0).wait(1).to({rotation:5.7184,x:1672.1,y:1263},0).wait(1).to({rotation:5.7202,x:1674.4,y:1264.2},0).wait(1).to({rotation:5.7221,x:1676.65,y:1265.45},0).wait(1).to({rotation:5.7239,x:1678.95,y:1266.7},0).wait(1).to({rotation:5.7257,x:1681.2,y:1267.95},0).wait(1).to({rotation:5.7275,x:1683.45,y:1269.2},0).wait(1).to({rotation:5.7294,x:1685.7,y:1270.45},0).wait(1).to({rotation:5.7312,x:1687.95,y:1271.7},0).wait(1).to({rotation:5.733,x:1690.25,y:1272.95},0).wait(1).to({rotation:5.7349,x:1692.5,y:1274.2},0).wait(1).to({rotation:5.7367,x:1694.8,y:1275.4},0).wait(1).to({rotation:5.7385,x:1697.05,y:1276.7},0).wait(1).to({rotation:5.7403,x:1699.3,y:1277.95},0).wait(1).to({rotation:5.7422,x:1701.55,y:1279.15},0).wait(1).to({regX:437.9,regY:262.4,rotation:5.744,x:1675,y:1252.4},0).wait(1));

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

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:65.2,regY:122,x:-27.05,y:13.3,startPosition:1},0).wait(1).to({x:-23.35,y:15.5,startPosition:2},0).wait(1).to({rotation:7.9374,x:-19.7,y:17.7,startPosition:3},0).wait(1).to({x:-16.1,y:19.9,startPosition:0},0).wait(1).to({x:-12.6,y:22,startPosition:1},0).wait(1).to({x:-9.1,y:24.15,startPosition:2},0).wait(1).to({x:-5.65,y:26.2,startPosition:3},0).wait(1).to({x:-2.25,y:28.25,startPosition:0},0).wait(1).to({x:1.1,y:30.25,startPosition:1},0).wait(1).to({x:4.45,y:32.25,startPosition:2},0).wait(1).to({x:7.7,y:34.25,startPosition:3},0).wait(1).to({x:10.9,y:36.15,startPosition:0},0).wait(1).to({rotation:7.9373,x:14.1,y:38.05,startPosition:1},0).wait(1).to({x:17.2,y:39.95,startPosition:2},0).wait(1).to({x:20.3,y:41.8,startPosition:3},0).wait(1).to({x:23.35,y:43.65,startPosition:0},0).wait(1).to({x:26.35,y:45.45,startPosition:1},0).wait(1).to({x:29.3,y:47.25,startPosition:2},0).wait(1).to({x:32.25,y:49,startPosition:3},0).wait(1).to({x:35.1,y:50.75,startPosition:0},0).wait(1).to({x:37.95,y:52.45,startPosition:1},0).wait(1).to({x:40.75,y:54.15,startPosition:2},0).wait(1).to({x:43.55,y:55.8,startPosition:3},0).wait(1).to({x:46.3,y:57.45,startPosition:0},0).wait(1).to({x:48.9,y:59.05,startPosition:1},0).wait(1).to({rotation:7.9372,x:51.6,y:60.65,startPosition:2},0).wait(1).to({x:54.2,y:62.25,startPosition:3},0).wait(1).to({x:56.8,y:63.8,startPosition:0},0).wait(1).to({x:59.35,y:65.35,startPosition:1},0).wait(1).to({x:61.9,y:66.85,startPosition:2},0).wait(1).to({x:64.4,y:68.35,startPosition:3},0).wait(1).to({x:66.85,y:69.85,startPosition:0},0).wait(1).to({x:69.25,y:71.3,startPosition:1},0).wait(1).to({x:71.65,y:72.75,startPosition:2},0).wait(1).to({x:74.05,y:74.15,startPosition:3},0).wait(1).to({x:76.35,y:75.6,startPosition:0},0).wait(1).to({x:78.7,y:76.95,startPosition:1},0).wait(1).to({x:80.95,y:78.35,startPosition:2},0).wait(1).to({x:83.2,y:79.7,startPosition:3},0).wait(1).to({x:85.45,y:81.05,startPosition:0},0).wait(1).to({rotation:7.9371,x:87.6,y:82.35,startPosition:1},0).wait(1).to({x:89.8,y:83.65,startPosition:2},0).wait(1).to({x:91.95,y:84.95,startPosition:3},0).wait(1).to({x:94.05,y:86.2,startPosition:0},0).wait(1).to({x:96.1,y:87.45,startPosition:1},0).wait(1).to({x:98.2,y:88.7,startPosition:2},0).wait(1).to({x:100.2,y:89.95,startPosition:3},0).wait(1).to({x:102.25,y:91.15,startPosition:0},0).wait(1).to({x:104.2,y:92.35,startPosition:1},0).wait(1).to({x:106.15,y:93.5,startPosition:2},0).wait(1).to({x:108.1,y:94.7,startPosition:3},0).wait(1).to({x:110.05,y:95.85,startPosition:0},0).wait(1).to({x:111.9,y:96.95,startPosition:1},0).wait(1).to({x:113.8,y:98.1,startPosition:2},0).wait(1).to({x:115.65,y:99.2,startPosition:3},0).wait(1).to({x:117.45,y:100.3,startPosition:0},0).wait(1).to({x:119.25,y:101.4,startPosition:1},0).wait(1).to({x:121.05,y:102.45,startPosition:2},0).wait(1).to({x:122.8,y:103.5,startPosition:3},0).wait(1).to({rotation:7.937,x:124.5,y:104.55,startPosition:0},0).wait(1).to({x:126.25,y:105.6,startPosition:1},0).wait(1).to({x:127.95,y:106.6,startPosition:2},0).wait(1).to({x:129.6,y:107.6,startPosition:3},0).wait(1).to({x:131.25,y:108.6,startPosition:0},0).wait(1).to({x:132.9,y:109.6,startPosition:1},0).wait(1).to({x:134.5,y:110.55,startPosition:2},0).wait(1).to({x:136.1,y:111.55,startPosition:3},0).wait(1).to({x:137.7,y:112.5,startPosition:0},0).wait(1).to({x:139.25,y:113.4,startPosition:1},0).wait(1).to({x:140.8,y:114.35,startPosition:2},0).wait(1).to({x:142.35,y:115.25,startPosition:3},0).wait(1).to({x:143.85,y:116.15,startPosition:0},0).wait(1).to({x:145.35,y:117.05,startPosition:1},0).wait(1).to({x:146.8,y:117.95,startPosition:2},0).wait(1).to({x:148.25,y:118.85,startPosition:3},0).wait(1).to({x:149.7,y:119.7,startPosition:0},0).wait(1).to({x:151.15,y:120.55,startPosition:1},0).wait(1).to({x:152.55,y:121.4,startPosition:2},0).wait(1).to({x:153.95,y:122.25,startPosition:3},0).wait(1).to({x:155.3,y:123.05,startPosition:0},0).wait(1).to({x:156.65,y:123.9,startPosition:1},0).wait(1).to({x:158,y:124.7,startPosition:2},0).wait(1).to({x:159.35,y:125.5,startPosition:3},0).wait(1).to({rotation:7.9369,x:160.65,y:126.3,startPosition:0},0).wait(1).to({x:161.95,y:127.05,startPosition:1},0).wait(1).to({x:163.25,y:127.85,startPosition:2},0).wait(1).to({x:164.5,y:128.6,startPosition:3},0).wait(1).to({x:165.75,y:129.35,startPosition:0},0).wait(1).to({x:167,y:130.05,startPosition:1},0).wait(1).to({x:168.25,y:130.8,startPosition:2},0).wait(1).to({x:169.45,y:131.55,startPosition:3},0).wait(1).to({x:170.65,y:132.25,startPosition:0},0).wait(1).to({x:171.85,y:132.95,startPosition:1},0).wait(1).to({x:173,y:133.65,startPosition:2},0).wait(1).to({x:174.15,y:134.35,startPosition:3},0).wait(1).to({x:175.3,y:135.05,startPosition:0},0).wait(1).to({x:176.45,y:135.75,startPosition:1},0).wait(1).to({x:177.6,y:136.4,startPosition:2},0).wait(1).to({x:178.7,y:137.1,startPosition:3},0).wait(1).to({x:179.8,y:137.75,startPosition:0},0).wait(1).to({x:180.9,y:138.4,startPosition:1},0).wait(1).to({x:181.95,y:139.05,startPosition:2},0).wait(1).to({x:183,y:139.7,startPosition:3},0).wait(1).to({x:184.05,y:140.35,startPosition:0},0).wait(1).to({x:185.1,y:140.95,startPosition:1},0).wait(1).to({x:186.15,y:141.55,startPosition:2},0).wait(1).to({x:187.15,y:142.2,startPosition:3},0).wait(1).to({x:188.15,y:142.8,startPosition:0},0).wait(1).to({x:189.15,y:143.4,startPosition:1},0).wait(1).to({x:190.15,y:144,startPosition:2},0).wait(1).to({x:191.15,y:144.55,startPosition:3},0).wait(1).to({x:192.1,y:145.15,startPosition:0},0).wait(1).to({x:193.05,y:145.75,startPosition:1},0).wait(1).to({x:194,y:146.3,startPosition:2},0).wait(1).to({x:194.95,y:146.85,startPosition:3},0).wait(1).to({x:195.85,y:147.4,startPosition:0},0).wait(1).to({x:196.75,y:147.95,startPosition:1},0).wait(1).to({rotation:7.9368,x:197.65,y:148.5,startPosition:2},0).wait(1).to({x:198.55,y:149.05,startPosition:3},0).wait(1).to({x:199.45,y:149.6,startPosition:0},0).wait(1).to({x:200.3,y:150.1,startPosition:1},0).wait(1).to({x:201.2,y:150.6,startPosition:2},0).wait(1).to({x:202.05,y:151.15,startPosition:3},0).wait(1).to({x:202.9,y:151.65,startPosition:0},0).wait(1).to({x:203.75,y:152.15,startPosition:1},0).wait(1).to({x:204.55,y:152.65,startPosition:2},0).wait(1).to({x:205.4,y:153.15,startPosition:3},0).wait(1).to({x:206.2,y:153.65,startPosition:0},0).wait(1).to({x:207,y:154.1,startPosition:1},0).wait(1).to({x:207.8,y:154.6,startPosition:2},0).wait(1).to({x:208.6,y:155.05,startPosition:3},0).wait(1).to({x:209.35,y:155.55,startPosition:0},0).wait(1).to({x:210.15,y:156,startPosition:1},0).wait(1).to({x:210.9,y:156.45,startPosition:2},0).wait(1).to({x:211.65,y:156.9,startPosition:3},0).wait(1).to({x:212.4,y:157.35,startPosition:0},0).wait(1).to({x:213.15,y:157.8,startPosition:1},0).wait(1).to({x:213.85,y:158.25,startPosition:2},0).wait(1).to({x:214.6,y:158.7,startPosition:3},0).wait(1).to({x:215.3,y:159.1,startPosition:0},0).wait(1).to({x:216,y:159.55,startPosition:1},0).wait(1).to({x:216.7,y:159.95,startPosition:2},0).wait(1).to({x:217.4,y:160.4,startPosition:3},0).wait(1).to({x:218.1,y:160.8,startPosition:0},0).wait(1).to({x:218.75,y:161.2,startPosition:1},0).wait(1).to({x:219.45,y:161.6,startPosition:2},0).wait(1).to({x:220.1,y:162,startPosition:3},0).wait(1).to({x:220.75,y:162.4,startPosition:0},0).wait(1).to({x:221.4,y:162.8,startPosition:1},0).wait(1).to({x:222.05,y:163.2,startPosition:2},0).wait(1).to({x:222.7,y:163.55,startPosition:3},0).wait(1).to({x:223.35,y:163.95,startPosition:0},0).wait(1).to({x:223.95,y:164.3,startPosition:1},0).wait(1).to({x:224.55,y:164.7,startPosition:2},0).wait(1).to({x:225.2,y:165.05,startPosition:3},0).wait(1).to({x:225.8,y:165.4,startPosition:0},0).wait(1).to({x:226.4,y:165.8,startPosition:1},0).wait(1).to({x:227,y:166.15,startPosition:2},0).wait(1).to({x:227.55,y:166.5,startPosition:3},0).wait(1).to({x:228.15,y:166.85,startPosition:0},0).wait(1).to({x:228.7,y:167.2,startPosition:1},0).wait(1).to({x:229.3,y:167.55,startPosition:2},0).wait(1).to({x:229.85,y:167.85,startPosition:3},0).wait(1).to({x:230.4,y:168.2,startPosition:0},0).wait(1).to({x:230.95,y:168.55,startPosition:1},0).wait(1).to({x:231.5,y:168.85,startPosition:2},0).wait(1).to({x:232.05,y:169.2,startPosition:3},0).wait(1).to({x:232.55,y:169.5,startPosition:0},0).wait(1).to({x:233.1,y:169.8,startPosition:1},0).wait(1).to({x:233.6,y:170.15,startPosition:2},0).wait(1).to({rotation:7.9367,x:234.15,y:170.45,startPosition:3},0).wait(1).to({x:234.65,y:170.75,startPosition:0},0).wait(1).to({x:235.15,y:171.05,startPosition:1},0).wait(1).to({x:235.65,y:171.35,startPosition:2},0).wait(1).to({x:236.15,y:171.65,startPosition:3},0).wait(1).to({x:236.65,y:171.95,startPosition:0},0).wait(1).to({x:237.15,y:172.25,startPosition:1},0).wait(1).to({x:237.6,y:172.55,startPosition:2},0).wait(1).to({x:238.1,y:172.8,startPosition:3},0).wait(1).to({x:238.55,y:173.1,startPosition:0},0).wait(1).to({x:239,y:173.4,startPosition:1},0).wait(1).to({x:239.5,y:173.65,startPosition:2},0).wait(1).to({x:239.95,y:173.95,startPosition:3},0).wait(1).to({x:240.4,y:174.2,startPosition:0},0).wait(1).to({x:240.85,y:174.5,startPosition:1},0).wait(1).to({x:241.3,y:174.75,startPosition:2},0).wait(1).to({x:241.7,y:175,startPosition:3},0).wait(1).to({x:242.15,y:175.25,startPosition:0},0).wait(1).to({regX:37,regY:101.7,x:217.5,y:151.5,startPosition:3},0).wait(1).to({regX:65.2,regY:122,rotation:7.553,x:243.3,y:175.65,startPosition:0},0).wait(1).to({rotation:7.1756,x:243.95,y:175.8,startPosition:1},0).wait(1).to({rotation:6.8045,x:244.65,y:175.95,startPosition:2},0).wait(1).to({rotation:6.4395,x:245.3,y:176.1,startPosition:3},0).wait(1).to({rotation:6.0807,x:245.95,y:176.2,startPosition:0},0).wait(1).to({rotation:5.7279,x:246.55,y:176.35,startPosition:1},0).wait(1).to({rotation:5.3809,x:247.15,y:176.45,startPosition:2},0).wait(1).to({rotation:5.0398,x:247.8,y:176.6,startPosition:3},0).wait(1).to({rotation:4.7044,x:248.4,y:176.75,startPosition:0},0).wait(1).to({rotation:4.3747,x:248.95,y:176.85,startPosition:1},0).wait(1).to({rotation:4.0504,x:249.55,y:177,startPosition:2},0).wait(1).to({rotation:3.7317,x:250.05,y:177.1,startPosition:3},0).wait(1).to({rotation:3.4183,x:250.7,y:177.25,startPosition:0},0).wait(1).to({rotation:3.1103,x:251.2,y:177.3,startPosition:1},0).wait(1).to({rotation:2.8075,x:251.7,y:177.45,startPosition:2},0).wait(1).to({rotation:2.5098,x:252.25,y:177.55,startPosition:3},0).wait(1).to({rotation:2.2172,x:252.8,y:177.6,startPosition:0},0).wait(1).to({rotation:1.9296,x:253.25,y:177.75,startPosition:1},0).wait(1).to({rotation:1.6468,x:253.75,y:177.8,startPosition:2},0).wait(1).to({rotation:1.369,x:254.25,y:177.9,startPosition:3},0).wait(1).to({rotation:1.0959,x:254.7,y:178,startPosition:0},0).wait(1).to({rotation:0.8275,x:255.2,y:178.15,startPosition:1},0).wait(1).to({rotation:0.5638,x:255.65,y:178.25,startPosition:2},0).wait(1).to({rotation:0.3046,x:256.1,y:178.3,startPosition:3},0).wait(1).to({rotation:0.0499,x:256.55,y:178.4,startPosition:0},0).wait(1).to({rotation:-0.2003,x:257,y:178.45,startPosition:1},0).wait(1).to({rotation:-0.4462,x:257.4,y:178.6,startPosition:2},0).wait(1).to({rotation:-0.6878,x:257.8,y:178.65,startPosition:3},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-0.9251,x:258.2,y:178.75,startPosition:0},0).wait(1).to({scaleX:1,scaleY:1,rotation:-1.1583,x:258.6,y:178.8,startPosition:1},0).wait(1).to({rotation:-1.3873,x:259.05,y:178.85,startPosition:2},0).wait(1).to({rotation:-1.6123,x:259.4,y:178.95,startPosition:3},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-1.8332,x:259.75,y:179.05,startPosition:0},0).wait(1).to({scaleX:1,scaleY:1,rotation:-2.0503,x:260.15,startPosition:1},0).wait(1).to({rotation:-2.2634,x:260.5,y:179.2,startPosition:2},0).wait(1).to({rotation:-2.4727,x:260.9,y:179.25,startPosition:3},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-2.6782,x:261.2,y:179.3,startPosition:0},0).wait(1).to({scaleX:1,scaleY:1,rotation:-2.88,x:261.6,y:179.35,startPosition:1},0).wait(1).to({rotation:-3.0782,x:261.9,y:179.4,startPosition:2},0).wait(1).to({rotation:-3.2727,x:262.25,y:179.5,startPosition:3},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-3.4636,x:262.55,startPosition:0},0).wait(1).to({rotation:-3.6511,x:262.85,y:179.6,startPosition:1},0).wait(1).to({scaleX:1,scaleY:1,rotation:-3.835,x:263.2,y:179.65,startPosition:2},0).wait(1).to({rotation:-4.0156,x:263.55,y:179.75,startPosition:3},0).wait(1).to({rotation:-4.1927,x:263.75,y:179.8,startPosition:0},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-4.3666,x:264.1,y:179.85,startPosition:1},0).wait(1).to({rotation:-4.5372,x:264.4,y:179.9,startPosition:2},0).wait(1).to({scaleX:1,scaleY:1,rotation:-4.7045,x:264.7,y:179.95,startPosition:3},0).wait(1).to({rotation:-4.8687,x:264.95,startPosition:0},0).wait(1).to({rotation:-5.0297,x:265.25,y:180.05,startPosition:1},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-5.1877,x:265.55,y:180.1,startPosition:2},0).wait(1).to({rotation:-5.3425,x:265.75,y:180.15,startPosition:3},0).wait(1).to({rotation:-5.4944,x:266.05,y:180.2,startPosition:0},0).wait(1).to({rotation:-5.6433,x:266.3,y:180.25,startPosition:1},0).wait(1).to({rotation:-5.7893,x:266.5,startPosition:2},0).wait(1).to({rotation:-5.9324,x:266.75,y:180.3,startPosition:3},0).wait(1).to({rotation:-6.0726,x:267,y:180.35,startPosition:0},0).wait(1).to({rotation:-6.21,x:267.2,y:180.4,startPosition:1},0).wait(1).to({rotation:-6.3447,x:267.45,y:180.45,startPosition:2},0).wait(1).to({rotation:-6.4766,x:267.65,y:180.5,startPosition:3},0).wait(1).to({rotation:-6.6059,x:267.85,y:180.55,startPosition:0},0).wait(1).to({rotation:-6.7325,x:268.1,startPosition:1},0).wait(1).to({rotation:-6.8564,x:268.3,startPosition:2},0).wait(1).to({rotation:-6.9778,x:268.45,y:180.65,startPosition:3},0).wait(1).to({rotation:-7.0967,x:268.65,startPosition:0},0).wait(1).to({rotation:-7.213,x:268.9,startPosition:1},0).wait(1).to({rotation:-7.3268,x:269.05,y:180.75,startPosition:2},0).wait(1).to({rotation:-7.4382,x:269.25,startPosition:3},0).wait(1).to({rotation:-7.5472,x:269.45,y:180.85,startPosition:0},0).wait(1).to({rotation:-7.6539,x:269.6,y:180.8,startPosition:1},0).wait(1).to({rotation:-7.7581,x:269.8,y:180.85,startPosition:2},0).wait(1).to({rotation:-7.8601,x:270,y:180.9,startPosition:3},0).wait(1).to({rotation:-7.9598,x:270.1,startPosition:0},0).wait(1).to({rotation:-8.0572,x:270.3,y:180.95,startPosition:1},0).wait(1).to({rotation:-8.1524,x:270.45,y:181,startPosition:2},0).wait(1).to({rotation:-8.2454,x:270.6,y:181.05,startPosition:3},0).wait(1).to({rotation:-8.3363,x:270.75,startPosition:0},0).wait(1).to({rotation:-8.425,x:270.9,startPosition:1},0).wait(1).to({rotation:-8.5117,x:271.05,y:181.1,startPosition:2},0).wait(1).to({rotation:-8.5962,x:271.2,startPosition:3},0).wait(1).to({rotation:-8.6787,x:271.3,y:181.15,startPosition:0},0).wait(1).to({rotation:-8.7592,x:271.5,startPosition:1},0).wait(1).to({rotation:-8.8377,x:271.55,y:181.2,startPosition:2},0).wait(1).to({rotation:-8.9143,x:271.7,startPosition:3},0).wait(1).to({rotation:-8.9889,x:271.85,y:181.25,startPosition:0},0).wait(1).to({rotation:-9.0616,x:271.95,startPosition:1},0).wait(1).to({rotation:-9.1324,x:272.05,y:181.3,startPosition:2},0).wait(1).to({rotation:-9.2014,x:272.15,startPosition:3},0).wait(1).to({rotation:-9.2685,x:272.3,startPosition:0},0).wait(1).to({rotation:-9.3338,x:272.45,y:181.35,startPosition:1},0).wait(1).to({rotation:-9.3974,startPosition:2},0).wait(1).to({rotation:-9.4591,x:272.6,y:181.4,startPosition:3},0).wait(1).to({rotation:-9.5192,x:272.7,y:181.35,startPosition:0},0).wait(1).to({rotation:-9.5775,x:272.8,y:181.4,startPosition:1},0).wait(1).to({rotation:-9.6342,x:272.85,startPosition:2},0).wait(1).to({regX:37.1,regY:101.8,rotation:-9.6891,x:241.8,y:166.2,startPosition:3},0).wait(1).to({regX:65.2,regY:122,rotation:-9.3472,x:272.85,y:181.55,startPosition:0},0).wait(1).to({rotation:-9.0157,x:272.8,y:181.8,startPosition:1},0).wait(1).to({rotation:-8.6944,y:182,startPosition:2},0).wait(1).to({rotation:-8.3833,y:182.2,startPosition:3},0).wait(1).to({rotation:-8.0821,x:272.75,y:182.45,startPosition:0},0).wait(1).to({rotation:-7.7907,y:182.55,startPosition:1},0).wait(1).to({rotation:-7.509,y:182.8,startPosition:2},0).wait(1).to({rotation:-7.2369,x:272.7,y:182.95,startPosition:3},0).wait(1).to({rotation:-6.9743,x:272.65,y:183.15,startPosition:0},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6.7209,y:183.25,startPosition:1},0).wait(1).to({rotation:-6.4767,x:272.6,y:183.4,startPosition:2},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-6.2416,x:272.55,y:183.55,startPosition:3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-6.0154,x:272.6,y:183.7,startPosition:0},0).wait(1).to({rotation:-5.7981,x:272.5,y:183.8,startPosition:1},0).wait(1).to({rotation:-5.5894,x:272.55,y:183.95,startPosition:2},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-5.3893,x:272.5,y:184.15,startPosition:3},0).wait(1).to({scaleX:1,scaleY:1,rotation:-5.1976,y:184.25,startPosition:0},0).wait(1).to({rotation:-5.0143,x:272.45,y:184.35,startPosition:1},0).wait(1).to({rotation:-4.8392,y:184.45,startPosition:2},0).wait(1).to({rotation:-4.6722,y:184.6,startPosition:3},0).wait(1).to({rotation:-4.5132,x:272.4,startPosition:0},0).wait(1).to({rotation:-4.3621,y:184.75,startPosition:1},0).wait(1).to({rotation:-4.2188,x:272.35,y:184.85,startPosition:2},0).wait(1).to({rotation:-4.0832,x:272.4,y:184.95,startPosition:3},0).wait(1).to({rotation:-3.9551,x:272.35,y:185,startPosition:0},0).wait(1).to({rotation:-3.8344,x:272.3,y:185.05,startPosition:1},0).wait(1).to({rotation:-3.7212,y:185.15,startPosition:2},0).wait(1).to({rotation:-3.6152,y:185.25,startPosition:3},0).wait(1).to({rotation:-3.5163,startPosition:0},0).wait(1).to({rotation:-3.4245,y:185.35,startPosition:1},0).wait(1).to({rotation:-3.3396,y:185.4,startPosition:2},0).wait(1).to({rotation:-3.2617,y:185.45,startPosition:3},0).wait(1).to({rotation:-3.1904,x:272.25,startPosition:0},0).wait(1).to({rotation:-3.1259,y:185.5,startPosition:1},0).wait(1).to({rotation:-3.0679,y:185.55,startPosition:2},0).wait(1).to({rotation:-3.0164,x:272.2,y:185.6,startPosition:3},0).wait(1).to({rotation:-2.9712,startPosition:0},0).wait(1).to({rotation:-2.9324,y:185.65,startPosition:1},0).wait(1).to({rotation:-2.8998,startPosition:2},0).wait(1).to({rotation:-2.8733,y:185.7,startPosition:3},0).wait(1).to({rotation:-2.8529,x:272.15,startPosition:0},0).wait(1).to({rotation:-2.8384,x:272.2,startPosition:1},0).wait(1).to({rotation:-2.8297,x:272.15,y:185.75,startPosition:2},0).wait(1).to({regX:37.1,regY:101.8,rotation:-2.8269,x:243.15,y:166.9,startPosition:3},0).wait(1).to({regX:65.2,regY:122,rotation:-2.7437,x:272.15,y:185.75,startPosition:0},0).wait(1).to({rotation:-2.6756,x:272.2,startPosition:1},0).wait(1).to({rotation:-2.617,x:272.15,startPosition:2},0).wait(1).to({rotation:-2.565,y:185.85,startPosition:3},0).wait(1).to({rotation:-2.5181,x:272.1,y:185.9,startPosition:0},0).wait(1).to({rotation:-2.475,startPosition:1},0).wait(1).to({rotation:-2.4351,y:185.95,startPosition:2},0).wait(1).to({rotation:-2.3978,x:272.05,y:185.9,startPosition:3},0).wait(1).to({rotation:-2.3626,x:272.1,y:185.95,startPosition:0},0).wait(1).to({rotation:-2.3293,x:272.05,startPosition:1},0).wait(1).to({rotation:-2.2975,y:186,startPosition:2},0).wait(1).to({rotation:-2.267,y:185.95,startPosition:3},0).wait(1).to({rotation:-2.2377,x:272,y:186,startPosition:0},0).wait(1).to({rotation:-2.2094,startPosition:1},0).wait(1).to({rotation:-2.182,startPosition:2},0).wait(1).to({rotation:-2.1553,y:186.05,startPosition:3},0).wait(1).to({rotation:-2.1292,startPosition:0},0).wait(1).to({rotation:-2.1037,startPosition:1},0).wait(1).to({rotation:-2.0787,x:271.95,y:186.1,startPosition:2},0).wait(1).to({rotation:-2.054,x:271.9,y:186.05,startPosition:3},0).wait(1).to({rotation:-2.0297,y:186.1,startPosition:0},0).wait(1).to({rotation:-2.0056,y:186.05,startPosition:1},0).wait(1).to({rotation:-1.9817,y:186.15,startPosition:2},0).wait(1).to({rotation:-1.958,startPosition:3},0).wait(1).to({rotation:-1.9343,startPosition:0},0).wait(1).to({rotation:-1.9106,x:271.85,y:186.2,startPosition:1},0).wait(1).to({rotation:-1.8868,startPosition:2},0).wait(1).to({rotation:-1.863,startPosition:3},0).wait(1).to({rotation:-1.839,startPosition:0},0).wait(1).to({rotation:-1.8147,y:186.25,startPosition:1},0).wait(1).to({rotation:-1.7902,y:186.2,startPosition:2},0).wait(1).to({rotation:-1.7652,y:186.25,startPosition:3},0).wait(1).to({rotation:-1.7399,x:271.8,y:186.2,startPosition:0},0).wait(1).to({rotation:-1.714,y:186.25,startPosition:1},0).wait(1).to({rotation:-1.6874,y:186.3,startPosition:2},0).wait(1).to({rotation:-1.6602,y:186.25,startPosition:3},0).wait(1).to({rotation:-1.6321,x:271.75,y:186.3,startPosition:0},0).wait(1).to({rotation:-1.6031,x:271.8,startPosition:1},0).wait(1).to({rotation:-1.5729,startPosition:2},0).wait(1).to({regX:37.1,regY:101.7,rotation:-1.5415,x:243.2,y:166.9,startPosition:3},0).to({regX:37,rotation:7.9375,x:1972.15,y:1207.7},1485,cjs.Ease.cubicIn).to({_off:true},1).wait(114));

	// heli_Shdw
	this.instance_5 = new lib.heliShadow();
	this.instance_5.setTransform(-26.95,251.95,1,1,0,0,0,8.8,5.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({x:272.15,y:431.85},329,cjs.Ease.quartOut).wait(40).to({x:2001.2,y:1472.7},1485,cjs.Ease.cubicIn).to({_off:true},1).wait(114));

	// Layer_1
	this.instance_6 = new lib.buoymkccopy();
	this.instance_6.setTransform(1177.65,725.65,1,1,0,0,0,12.3,18.3);

	this.instance_7 = new lib.buoymkccopy();
	this.instance_7.setTransform(770.55,967.45,1,1,0,0,0,12.3,18.3);

	this.instance_8 = new lib.buoymkccopy();
	this.instance_8.setTransform(339.65,701.85,1,1,0,0,0,12.3,18.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).wait(1969));

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