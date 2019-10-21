//Kaleb Askren
//Computer Graphics CSCI 4250
//Dr. Cen Li
//Homework 1
//Due: Tuesday, September 3

var gl, n, id;
var program;
function main() {
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // clear the canvas to black
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    //call the render helper function to render the shapes onto the screen
    render();
    
    
};

function render(){
    //render the squares

    /*NOTE* using gl.TRIANGLE_FAN I was able to render both squares at once to 
    save processing time while I decided to use two separate draw fucntions for
    the two triangles*/
    rendersquares();

    //render the first triangle
    rendertriangle1();
    
    //render the second triangle
    rendertriangle2();
}

//This function renders the two squares using one buffer
function rendersquares() {
    var vertices = [
        //top left square
        vec2(0.0,0.0),
        vec2(-0.5,0),
        vec2(-0.5,0.5),
	    vec2(0.0,0.5),
        
        //bottom right square
        vec2(0.0,0.0),
        vec2(0.5,0.0),
        vec2(0.5,-0.5),
        vec2(0.0,-0.5)

    ];
    //create, bind, and load the vertices data into the buffer
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //Get the uniform reference from the .HTML file for color set
    gl.uniform4f(gl.getUniformLocation(program, "colorValue"), .988, .45, 0.839, 1);


    //loop for rendering both squares
    for(var i = 0; i < 2; i++){
        if(i == 0){
            gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
        }
       else if(i == 1){
            gl.drawArrays( gl.TRIANGLE_FAN, 4, 8 );
       }
    }
    
}

//this function renders the triangle
function rendertriangle1()
{
    var vertices = [
        //top right triangle
        vec2(0.0,0.0),
	    vec2(0.25,0.5),
        vec2(0.5,0.0),

    ];

    //create, bind, and load the vertices data into the buffer
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //get the uniform reference for the color set for the triangle
    gl.uniform4f(gl.getUniformLocation(program, "colorValue"), 0.545, 0.964, 0.976, 1);

    //draw the top right triangle
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );

}

//render the second triangle
function rendertriangle2()
{
    var vertices = [
        //bottom left triangle
        vec2(0.0,-0.5),
        vec2(-0.5,-0.5),
        vec2(-0.25,0.0),

    ];
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //get the uniform reference for the color set for the triangle
    gl.uniform4f(gl.getUniformLocation(program, "colorValue"), 0.545, 0.964, 0.976, 1);

    //draw the bottom left triangle
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );


}
