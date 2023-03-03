///let osc, playing, freq, amp;

// function noteToFreq(note) {
//   const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
//   const octave = parseInt(note.slice(-1), 10);
//   const key = note.slice(0, -1);

//   let index = notes.indexOf(key);
//   if (index < 0) {
//     throw new Error(`Invalid note: ${key}`);
//   }

//   // Calculate the number of cents above A4
//   let centsAboveA4 = (octave - 4) * 1200 + index * 100;
//   // Calculate the frequency
//   let freq = 440 * Math.pow(2, centsAboveA4 / 1200);

//   return freq;
// }

function findNearestNote(freq) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Calculate the number of octaves above A4
  let octavesAboveA4 = Math.log2(freq / 440);
  // Calculate the number of cents above A4
  let centsAboveA4 = Math.round(1200 * octavesAboveA4);
  // Calculate the number of cents above the nearest note
  let centsOff = centsAboveA4 % 100;
  // If the frequency is more than 50 cents above the nearest note,
  // round down to the nearest note
  if (centsOff > 50) {
    centsOff -= 100;
  }
  // Calculate the index of the nearest note
  let index = Math.floor(centsAboveA4 / 100);
  // If the index is negative, add 1200 to bring it into the range [0, 1199]
  if (index < 0) {
    index += 1200;
  }
  index = index % 12;

  return notes[index] + (Math.floor(centsAboveA4 / 1200)+5);
}


function freqToCents(freq) {
  return Math.floor(1200 * Math.log2(freq / 440));
}

function freqToNote(freq) {
  return 440 * Math.pow(2, (freq - 49) / 12);
}

let colors1 = "ed1c24-fdfffc-235789-f1d302-020100".split("-").map(a=>"#"+a)
let colors2 = "2b2d42-8d99ae-edf2f4-ef233c-d80032".split("-").map(a=>"#"+a)
let colors3 = "d6fff6-231651-4dccbd-2374ab-ff8484".split("-").map(a=>"#"+a)
let colors4 = "a9e5bb-fcf6b1-f7b32b-f72c25-2d1e2f".split("-").map(a=>"#"+a)
let colors5 = "ff8811-f4d06f-fff8f0-9dd9d2-392f5a".split("-").map(a=>"#"+a)
let colors6 = "c5d86d-261c15-f7f7f2-e4e6c3-f05d23".split("-").map(a=>"#"+a)
let colors7 = "ff6700-ebebeb-c0c0c0-3a6ea5-004e98".split("-").map(a=>"#"+a)
let colors8 = "020202-0d2818-04471c-058c42-16db65".split("-").map(a=>"#"+a)
let colors9 = "003049-d62828-f77f00-fcbf49-eae2b7".split("-").map(a=>"#"+a)
let colors10 = "00072d-001c55-0a2472-0e6ba8-a6e1fa".split("-").map(a=>"#"+a)
let colors11 ="6b2d5c-f0386b-ff5376-f8c0c8-e2c290".split("-").map(a=>"#"+a)
let colors12 = "fb8b24-d90368-820263-291720-04a777".split("-").map(a=>"#"+a)
let _mouseX=300, _mouseY=300

let colors
let overAllTexture
let params = {

}


function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function keyPressed(){
	if (key==' '){
		initParams()
	}
}

function mousePressed(){
	auto=false
	playOscillator()
// 	// initParams()
}
function mouseDblPressed(){
	initParams()
}
function initParams(){
	colors = random([colors1,colors2,colors3,colors4,colors5,colors6,colors7,colors8,colors9,colors10,colors11,colors12]) 
	colors = colors.sort((a,b)=>random()<0.5?1:-1)
	params={
		faceWidth: random(250,300),
		vertexCount: random([3,4,5,6,7,8,0]),
		bg: random(['rect','circle','tri','strip','wave']),
		mood: random(['happy','sad','surprise','excited']),
		deco: random(['glasses','']),
		head_deco: random(['cap','']),
		hasEyeLash: random()<0.3,
		vertexStyle: '',
		withStroke: random()<0.3
	}
	if (params.vertexCount>4){
		params.vertexStyle = random(['flower','kiki','flower','kiki',params.vertexStyle])
	}
	params.eyeWidth = random(100,150)
	params.noseHeight = random(50,150)
	params.noseWidth = random(50,100)
	params.eyeDist = random(60,params.faceWidth/3)
	
}
function setup() {
	initParams()
	createCanvas(1000,1000)
	background(255);
	
	let waveType = 'triangle'
	if (params.vertexCount==4){
		waveType='square'
	}
	if (params.vertexCount==0){
		waveType='sine'
	}
	  osc = new p5.Oscillator(waveType);
	// overAllTexture=createGraphics(width,height)
	// overAllTexture.loadPixels()
	// for(var i=0;i<width+50;i++){
	// 	for(var o=0;o<height+50;o++){
	// 		overAllTexture.set(i,o,color(200,noise(i/10,i*o/300)*random([0,0,50,100])))
	// 	}
	// }
	// overAllTexture.updatePixels()
}

function drawEye(x,y,lr=0){

	let eyeOpened = mouseIsPressed 
	let eyeClosed = frameCount%100<10
	let endAngle = eyeOpened?2*PI:PI
	
	push()
	translate(x,y)
	
	push()
	rectMode(CENTER)
	rotate( sin(lr+frameCount/100+_mouseX/50)/3)
	rect(0,-80+ sin(lr+frameCount/100+_mouseX/50)*30,params.eyeWidth,30)
	pop()
	
	//eyeball
	fill(255)
	arc(0,0,params.eyeWidth,100,0,endAngle)
	
	
	//eyelash
	if (params.hasEyeLash){
	push()
		stroke(colors[3])
	// stroke(0)
	strokeWeight(10)
	translate(0,-50)
	line(-40,0,-50,-20)
	line(0,-30,0,-10)
	line(40,0,50,-20)
	pop()
	}
	
	
	if (!eyeOpened){
		fill(colors[3])

		arc(0,0,params.eyeWidth,100,PI,2*PI) 
	}
	
	
	
	//iris
	push()
	noStroke()
	translate(sin(_mouseX/100+frameCount/40)*20,0)
	fill(0)
	arc(0,0,60,60,0,endAngle)
	pop()
	
	if (eyeClosed){
		arc(0,0,params.eyeWidth,100,0,2*PI) 
	
	}
	
	
	
	
	pop()
}

function easeOutElastic(x) {
	const c4 = (2 * Math.PI) / 3;

	return x === 0
		? 0
		: x === 1
		? 1
		: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
function easeOutQuint(x) {
return 1 - Math.pow(1 - x, 5);
}
let _boomRatio=1

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}
function stopOscillator(){
	 osc.amp(0, 0.5);
	 playing = false;
}
function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  stopOscillator()
}
let auto = true
function draw() {
	let estFreq = constrain(map(mouseX, 0, width, 100, 500), 50, 500);
	//audio
	 // freq = estFreq
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
	
	freq = estFreq
	
	if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
	
	if (mouseIsPressed){
		_mouseX = lerp(_mouseX,mouseX,0.1)
		_mouseY = lerp(_mouseY,mouseY,0.1)
		_boomRatio = lerp(_boomRatio,1,0.2)
	}else{
		_mouseX = lerp(_mouseX,width/2,0.05)
		_mouseY = lerp(_mouseY,height/2,0.05)
	}
	if (_boomRatio>0){
		_boomRatio-=0.01
	}

	// if (auto && frameCount%50==0 && random()<0.3){
	// 	_boomRatio= 1
	// 	mouseX = random(width)
	// 	mouseY = random(height)
	// 	playOscillator()
	// 	setTimeout(()=>{
	// 		stopOscillator()
	// 	},random(1000))
	// }
	let dd = dist(mouseX,mouseY,pmouseX,pmouseY)
// 	if (dd>5 && _boomRatio<0.99){
// 		_boomRatio+=dd/2000
		
// 	}
	let boomRatio = 1-easeOutElastic(1-_boomRatio)
	
	push()
	
		//bg
		fill(colors[3])
		rect(0,0,width,height)
		noStroke()
		translate(width/2,height/2)

		//face
		push()
		let cir = 200
		for(let y=-height/2-cir/2;y<height/2+cir*2;y+=cir){
			let xSpan = cir
			if (params.bg=='wave'){
				beginShape()
				y+=cir
				xSpan = 40
			}
			for(let x=-width/2-cir/2;x<width/2+cir*2;x+=xSpan){

				// fill(colors[int((x+y)/10)%4])
				fill(colors[4])
				if (params.bg=='rect'){
					rect(x,y,cir*0.8,cir*0.8)	
				}else if (params.bg=='strip'){
					
					rect(x,y,cir*3,cir*0.4)	
				}else if (params.bg=='tri'){
					polygon(x,y,cir*0.8,3)	
				}else if (params.bg=='wave'){
					curveVertex(x,y+ sin(x/100 + y+ frameCount/(100+sin(y/50)*50) )*cir/2 )
				}else{
					ellipse(x,y,cir*0.8,cir*0.8)	
				}
			}
			if (params.bg=='wave'){
				stroke(colors[4])
				noFill()
				strokeWeight(cir*0.8)
				endShape()
			}
		}
		pop()

		//body
		push()
		rotate(sin(_mouseX/200+frameCount/100)/10)
		fill(colors[2])
		arc(0,100,500,500,0,PI)
		pop()

		translate(map(_mouseX,0,width,-100,100),
						 	map(_mouseY,0,height,-100,100))
	
		//head
		push()
			rotate(sin(_mouseX/100+frameCount/100)/10)
			beginShape()
			let _r = params.faceWidth + params.faceWidth*0.4*boomRatio
			if (params.vertexCount==0){
			fill(colors[0])
				circle(0,0,_r*2)
			}else{
				for(let ang=0;ang<2*PI;ang+=2*PI/params.vertexCount){

					let _ang = ang + _mouseX/1000 + boomRatio*PI/8

					vertex(cos(_ang)*_r,sin(_ang)*_r)
					if (params.vertexStyle=='flower'){

						fill(colors[0])
						circle(
							cos(_ang)*params.faceWidth,
							sin(_ang)*params.faceWidth,
							_r +_r /10*sin(frameCount/50+ ang*4) ) 
					}
				}
			}
			fill(colors[0])
			if (params.withStroke){
				stroke(colors[1])
				strokeWeight(30)
			}
			endShape(CLOSE)
	
		 for(let ang=0;ang<2*PI;ang+=2*PI/params.vertexCount){
				if (params.vertexStyle=='kiki'){
					push()
					rotate(ang)
					translate(params.faceWidth,0)
					polygon(0,0,_r+_r /10*sin(frameCount/50+ ang*4) ,3)
					pop()
				}
		 }
 
		// ellipse(0,0,params.faceWidth,450,100)
		pop()

	
	
		//hair
		// push()
		// translate(0,-params.faceWidth*0.8)
		// rotate(sin(_mouseX/200+frameCount/100)/10)
		// fill(colors[1])
		// rectMode(CENTER)
		// rect(0,0,params.faceWidth,params.faceWidth/2,500)
		// pop()
	
	
		//hair2
		push()
		translate(0,-150)
		rotate(sin(_mouseX/200+frameCount/100)/10)
		fill(colors[1])

		arc(0,300,400,400,PI,1.5*PI)
		pop()
	
		//eye

		push()
		let eyeDist = params.eyeDist + _mouseY/20
		translate(eyeDist/2,0)
		drawEye(eyeDist,0,0)
		drawEye(-eyeDist,0,PI)
		if (params.deco=='glasses'){
			strokeWeight(15)
			noFill()
			noStroke()
			stroke(colors[2])
			let glassR = params.eyeWidth*1.3
			circle(-eyeDist,0,glassR)
			line(-eyeDist-glassR/2,0,-eyeDist-glassR/2,glassR/2)
			
			
		}
		pop()
	
		//head deco
	 if (params.head_deco=='cap'){
	 	push()
		 let capWidth = params.faceWidth*1
		 translate(0,-capWidth*0.6)
		 rotate(sin(_mouseX/300)/5)
		 fill(colors[1])
		 arc(0,0,capWidth,capWidth,PI,2*PI)
		 rect(-capWidth/2,-5,capWidth*1.3,30)
		 pop()
	 }

		//mouth
	
		push()
		stroke(colors[3])
		strokeWeight(15)
		noFill()
		rotate(sin(_mouseX/100+frameCount/100)/10)
		// fill(0)
		translate(0,params.noseHeight)
		if (params.mood=='sad'){
			translate(-30,30)
			rotate(PI)
			arc(0,0,100,100,0,PI)
		}else if (params.mood=='surprise'){
			// fill(colors[0])
			circle(-0,0,100+(100*sin(_mouseX/100+frameCount/100)/10) +200*boomRatio)
		}else if (params.mood=='happy'){
		
			arc(0,0,100,100,0,PI)
			
		}else if (params.mood=='excited'){
			fill(colors[4])
			noStroke()
			arc(0,0,100,100,0,PI)
		}
		pop()
	
		//nose
		push()
		rotate(cos(_mouseX/100+frameCount/100)/10)
		// fill(0)
		fill(colors[3])
		translate(10,0)
		triangle(0,0,params.noseWidth,params.noseHeight*0.8,0,params.noseHeight)
		pop()

		push()

	
		pop()
	
	pop()
	
// 	push()
// 		blendMode(MULTIPLY)
// 		image(overAllTexture,0,0)
// 	pop()
	
	// circle(_mouseX, _mouseY, 20);
}