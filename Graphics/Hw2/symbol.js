//Kaleb Askren
//CSCI 4250 - Computer Graphics
//Dr. Cen Li
//Homework 2 Part B
//Due September 10th 2019

var gl, program;
//hold the arrays for both shapes - circle and inner polygon
var star, circle;
var SIZE; 

function main() {
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { console.log( "WebGL isn't available" ); return; }

	var center= vec2(0.0, 0.0);  // location of the center of the circle
    var Radius = 1;    // Radius of the outer circle
    var radius = 0.5;  // Radius of the inner circle
    star = GenerateStar(center, Radius, radius);
    console.log("after generating star");
    circle = GenerateCircle(center, Radius);

    //  Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    if (!program) { console.log("Failed to intialize shaders."); return; }
    gl.useProgram( program );
    
    // Load the data into the GPU
    

    renderstar();
    rendercircle();
}

//generate points for each vertex in the star shape
function GenerateStar(center, Radius, radius) {
    var vertices=[];
	SIZE=12; // slices

    //30 degree angle
	var angle = Math.PI/6;
	
     
	// to draw SIZE line segments 
	for  (var i=0; i<13; i++) {
	    console.log(center[0]+Radius*Math.cos(i*angle));
           
        vertices.push([center[0]+radius*Math.cos(i*angle), 
                       center[1]+radius*Math.sin(i*angle)]);
        
        //push the inner circle star
        //Increment here to offset the outer vertices by one 30 degree unit
        i++;
        //create the vertex for the outer most point
        vertices.push([center[0]+Radius*Math.cos(i*angle), 
                       center[1]+Radius*Math.sin(i*angle)]);
	}
	return vertices;
}

//separate function to draw a circle around the inner star-shape
//mostly sourced from public class repository 8-circle.js
function GenerateCircle(center,Radius)
{
    var vertices=[];
	SIZE=100; // slices

	var angle = 2*Math.PI/SIZE;
	
    // Because LINE_STRIP is used in rendering, SIZE + 1 points are needed 
	// to draw SIZE line segments 
	for  (var i=0; i<SIZE+1; i++) {
	    console.log(center[0]+Radius*Math.cos(i*angle));
	    vertices.push([center[0]+Radius*Math.cos(i*angle), 
		               center[1]+Radius*Math.sin(i*angle)]);
	}
	return vertices;


}
//render the star
function renderstar() {

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(star), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    gl.clear( gl.COLOR_BUFFER_BIT );
	// gl.uniform1i(gl.getUniformLocation(program, "colorIndex"), 1);
    gl.drawArrays( gl.LINE_STRIP, 0, 13);
}
//render the circle
function rendercircle() {

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(circle), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
   // gl.clear( gl.COLOR_BUFFER_BIT );
    // gl.uniform1i(gl.getUniformLocation(program, "colorIndex"), 1);
    
    gl.drawArrays( gl.LINE_STRIP, 0, SIZE+1);
}