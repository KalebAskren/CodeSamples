//Kaleb Askren
//CSCI 4250 - Computer Graphics
//Dr. Cen Li
//Homework 2 Part A
//Due September 10th 2019

var canvas, gl;
var points = [];
var NumTimesToSubdivide = 5;

function main()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { console.log( "WebGL isn't available" ); return; }
        
    //  Initialize our data for the Sierpinski Gasket
    // First, initialize the corners of our gasket with three points.
    var vertices = [
        vec2( -0.5, -0.5 ),
        vec2(  0,  0.5 ),
        vec2(  0.5, -0.5 ) ];

    divideTriangle( vertices[0], vertices[1], vertices[2],
                    NumTimesToSubdivide);

    //  Configure WebGL
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function triangle( a, b, c ) {
    //store the values of the coordinates and distances for all three points
    var ax,bx,cx,ay,by,cy,dista,distb,distc;
    //all x components
    ax = a[0];
    bx = b[0];
    cx = c[0];
    //all y componenets
    ay = a[1];
    by= b[1];
    cy= c[1];
    //all distance values for each component
    dista = Math.pow((Math.pow(ax,2) + Math.pow(ay,2)),0.5);
    distb = Math.pow((Math.pow(bx,2) + Math.pow(by,2)),0.5);
    distc = Math.pow((Math.pow(cx,2) + Math.pow(cy,2)),0.5);
    //angle to bend
    var theta = 1.5;

    //now we have the x, y, and distance values for each point, calc new points
    var p1 = vec2(ax * Math.cos(dista * theta) - ay * Math.sin(dista*theta), ax * Math.sin(dista * theta) + ay * Math.cos(dista*theta));
    var p2 = vec2(bx * Math.cos(distb * theta) - by * Math.sin(distb*theta), bx * Math.sin(distb * theta) + by * Math.cos(distb*theta));
    var p3 = vec2(cx * Math.cos(distc * theta) - cy * Math.sin(distc*theta), cx * Math.sin(distc * theta) + cy * Math.cos(distc*theta));
    
   
    //Finally, add new triangle vertices to the array
    points.push( p1, p2, p3 );



}

// recursively divide the triangles
function divideTriangle( a, b, c, count) {

    // check for end of recursion
    if ( count === 0 ) {
        triangle( a, b, c );
    }
    else {
        //bisect the sides
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // four new triangles
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
        //this creates the fourth sub triangle for each main triangle
        //resulting in filling in the triangle with a solid color
        divideTriangle(ab, bc, ac, count );

    }
}
//render the new bent triangle
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}