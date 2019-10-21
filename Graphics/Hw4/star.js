//Kaleb Askren
//Dr. Cen Li
//Computer Graphics hw 4 part 2
//Due midnight 10-1-2019
var gl, points, program;
var count = 0;
var steps = 100;
var startx, midx, endx, starty, midy, endy;
var modelViewMatrix=mat4(); // identity
var modelViewMatrixLoc;  // referring to locations of variables on shader programs
var colorIndexLoc;
var level = 0;
var modelViewStack=[];  // for maintaining the current model view matrix

var initpoints = [
    vec2( 0, 2),
    vec2( 0.1, 1),
    vec2( 0.4, 1),
    vec2( 0, 4),
    vec2( -1, -.3 ),
    vec2( -.5,  -.5 )
];
var tempvert = [];
var points = [];

function main() {
    

    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    initBuffers(gl);
    render();
}

function initBuffers(gl) {
    //  Configure WebGL
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(initpoints), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Prepare to send the model view matrix to the vertex shader
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    // Prepare to send the color index value to the fragment shader
    colorIndexLoc = gl.getUniformLocation(program, "colorIndex");
}


// Form the 4x4 scale transformation matrix
function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}
var directionx = 1;
var directiony = 2;
var mode = 0;
var turn = 0;
// draw the Two squares on the black background
function render() {
    //gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1i(colorIndexLoc, 2); // white
    
    //stop if it has made its final turn
    if(turn != 3){
	    if(count == 0) {
		    modelViewMatrix = scale4(0.2, 0.2 ,1.0);
		    modelViewMatrix = mult(translate(-1.0, -1.0, 0.0), modelViewMatrix);
	    }
	    if(count < 100) {
		    modelViewMatrix = mult(translate(directionx / steps, directiony / steps, 0.0), modelViewMatrix);
		    gl.uniformMatrix4fv(
			    modelViewMatrixLoc,
			    false,
			    flatten(modelViewMatrix)
		        );
		    gl.clear(gl.COLOR_BUFFER_BIT);
		    DrawOneStar();
            count += 1;
                
            window.requestAnimFrame(render);
                
        
        }
	        else {
                if(turn == 0){
                count = 1;
                directionx = 1;
                directiony = -2;
                turn++;
                render();
                }
	        }
        }
        

    
    
}
function DrawOneStar()
{
    var r;
    var radius = 1;
    modelViewStack.push(modelViewMatrix);
    // draw the full snow flake
    for (var i=0; i<5; i++) {

         r = rotate(72, 0, 0, 1); // version 2: r = rotate(60*i, 0, 0, 1);

         modelViewMatrix =  mult(modelViewMatrix, r);
         DrawOneBranch();

       
    }
    modelViewStack=modelViewStack.pop();
}

function DrawOneBranch()
{
    var s;

    // one branch
    modelViewStack.push(modelViewMatrix);   // save the previous MVM
    s = scale4(.07, .07, 1);
    //modelViewMatrix = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_LOOP, 0, 6);
    modelViewMatrix = modelViewStack.pop();   // undo the scaling effect

   
}