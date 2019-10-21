//Kaleb Askren
//Dr. Cen Li
//Computer Graphics hw 4 part 1
//Due midnight 10-1-2019
var gl, points, program;

var modelViewMatrix=mat4(); // identity
var modelViewMatrixLoc;  // referring to locations of variables on shader programs
var colorIndexLoc;

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

// draw the Two squares on the black background
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1i(colorIndexLoc, 2); // white

    var angle = 30*Math.PI/180; 

    //var t = translate(radius*Math.cos(22.5*Math.PI/180), radius*Math.sin(22.5*Math.PI/180));
    for(var index = 0; index < 12; index++){
    
        var t = translate(0.75*Math.cos(index*angle),0.75*Math.sin(index*angle), 1);
        modelViewMatrix = mult(modelViewMatrix, t);
        var r = rotate(60*index,0 ,0, 1);
        modelViewMatrix = mult(modelViewMatrix, r);
        DrawOneStar();
        modelViewMatrix = mat4();

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
    modelViewMatrix = mult(modelViewMatrix, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_LOOP, 0, 6);
    modelViewMatrix = modelViewStack.pop();   // undo the scaling effect

   
}