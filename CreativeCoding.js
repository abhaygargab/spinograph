// Dimension of the canvas
var width;
var height;

//The big const circle parameters
var outX;
var outY;
var outRad;

//Inner moving circle parameters
var inX;
var inY;
var inRad;

//These parameters guide the movement of centre of inner circle (Revolution)
var outTheta; // Angle subtented by centre of inner circle wrt outer circle
var outW; // Angular speed 

//These parameters guide the movement of inner circle on its own axis (Rotation)
var inW; // Angular speed

// Parameters of the point of drawing
var inTheta; // Angle subtended by point wrt inner circle
var pointR; // Distance of point from centre of inner circle
var pointX;
var pointY;

// Sliders
let outRadSlider;
let inRadSlider;
let pointRSlider;

//Useless
var wait;

function setup()
{
	wait = 0;
	width = 600;
	height = 600;
	
	canvas = createCanvas(width, height);
	background(0);

	outRadSlider = createSlider(150, 200, 150);
	outRadSlider.position(20, 20);
	inRadSlider = createSlider(0, outRadSlider.value()/2, 50);
	inRadSlider.position(20, 50);
	pointRSlider = createSlider(0, 100, 50);
	pointRSlider.position(20, 80);

	button = createButton('RESET');
  	button.position(500, 20);
  	button.mousePressed(reset);

  	stroke(255);
  	strokeWeight(5);
	text('outRad', outRadSlider.x * 2 + outRadSlider.width, 25);
	text('inRad', inRadSlider.x * 2 + inRadSlider.width, 55);
	text('pointR', pointRSlider.x * 2 + pointRSlider.width, 85);

	outRad = outRadSlider.value();
	outTheta = 0;
	outW = 0.03;
	outX = width/2;
	outY = height/2;

	inRad = inRadSlider.value();
	inTheta = 0;
	inW = (outRad/inRad)*outW;
	inX = outRad*cos(outTheta) - inRad*cos(outTheta);
	inY = outRad*sin(outTheta) - inRad*sin(outTheta);

	pointR = (pointRSlider.value()/100)*inRad;
	pointX = inX + pointR*cos(inTheta);
	pointY = inY + pointR*sin(inTheta);	
	
	translate(width/2, height/2);
	fill(255);
	ellipse(0, 0, 2*outRad);
	console.log("Hey");
	fill(0);
	// ellipse(inX, inY, 2*inRad);
	fill(255);
	// ellipse(inX, inY, 10);
	stroke(255,0,0);
	strokeWeight(2);
	// line(inX, inY, pointX, pointY);
}

function reset()
{
	outRad = outRadSlider.value();
	inRad = inRadSlider.value();
	pointR = (pointRSlider.value()/100)*inRad;
	// if(pointR>inRad)
	// 	pointR = inRad;
	noStroke();
	fill(255);
	ellipse(0, 0, 2*outRad);
}

function update()
{
	outTheta = outTheta + outW;
	inTheta = inTheta - inW/5; // This denominator 5 is a guess.. try to change and get different results
	inX = outRad*cos(outTheta) - inRad*cos(outTheta);
	inY = outRad*sin(outTheta) - inRad*sin(outTheta);
	pointX = inX + pointR*cos(inTheta);
	pointY = inY + pointR*sin(inTheta);

	colrX = cos(outTheta);
	colrY = sin(outTheta);
}

function move()
{
	translate(width/2, height/2);
	stroke(255,0,0);
	// fill(255);
	// // ellipse(0, 0, 2*outRad);
	// fill(0);
	// ellipse(inX, inY, 2*inRad);
	// fill(255);
	// // ellipse(inX, inY, 10);
	// if(colrX>0&&colrY>0)
	// 	stroke(255,0,0);
	// else if(colrX>0&&colrY<0)
	// 	stroke(0,255,0);
	// else if(colrX<0&&colrY<0)
	// 	stroke(0,0,255);
	// else
	// 	stroke(0);
	strokeWeight(2);
	// line(inX, inY, pointX, pointY);
	ellipse(pointX, pointY, 3);
}

function draw()
{
	// background(0);
	// wait = wait + 1;
	// if(wait>200)
	// {
	// 	update();
	// 	move();
	// }
		update();
		move();	
}