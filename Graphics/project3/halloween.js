//Kaleb Askren
//Dr Cen Li
//Computer Graphics
//Project 2
//Due: 10-8-2019

var modelViewMatrix=mat4(); // identity
var modelViewMatrixLoc;
var projectionMatrix;
var projectionMatrixLoc;
var modelViewStack=[];

var points=[];
var colors=[];
var vertices=[];
var cmtStack=[];
var vert = [];
var pumpkin = [];
var curlength;
var premnt, prebow, prearrow, preRings, prePump, preSign;
var ghostX, ghostY;

function main() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    window.onkeydown = function(event) {
        var key=String.fromCharCode(event.keyCode);
        console.log(key);
        
        genNewGhost();
        

}
    GeneratePoints();

    modelViewMatrix = mat4();
    projectionMatrix = ortho(-8, 8, -8, 8, -1, 1);
    
    
    initWebGL();
    render();
        drawBow();
        drawArrow();
        
    
    

       
}
function render() {
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
 
        // draw ground and sky first
        drawSky();
 
        drawGround();
 
        drawStars();
 
        drawMountains(); 
        
        // then, draw planet, add rings too
        drawfirstRings();
        DrawFullPlanet();
        drawsecondRings();
 
        
 
        // add other things, like bow, arrow, spider, flower, tree ...
        //drawBow();
        //drawArrow();
        drawPumpkin();
        drawSign();
        
        // then, draw ghost
        //modelViewMatrix = mat4();
        //modelViewMatrix = mult(modelViewMatrix, translate(-5, 0, 0));
       //modelViewMatrix=mult(modelViewMatrix, scale4(1, 1, 1));
        //gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        //DrawGhost();
 }
 
function initWebGL() {
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc= gl.getUniformLocation(program, "projectionMatrix");
}

function scale4(a, b, c) {
   	var result = mat4();
   	result[0][0] = a;
   	result[1][1] = b;
   	result[2][2] = c;
   	return result;
}

function GeneratePoints() {
        GeneratePlanet();
        
        GenerateGhost();
        generateSky();
        generateGround();  
        generateStars();
        premnt = points.length;
        generateMountains();
        preRings = points.length;
        generateRings();

        prebow = points.length;
        generateBow();
        prearrow = points.length;
        
        generateArrow();
        prePump = points.length;
        
        generatePumpkin();
        preSign = points.length;

        generateSign();
        
}

function GeneratePlanet() {
	var Radius=1.0;
	var numPoints = 80;
	
	// TRIANGLE_FAN : for solid circle
	for( var i=0; i<numPoints; i++ ) {
		var Angle = i * (2.0*Math.PI/numPoints); 
		var X = Math.cos( Angle )*Radius; 
		var Y = Math.sin( Angle )*Radius; 
	        colors.push(vec4(0.7, 0.7, 0, 1)); 
		points.push(vec2(X, Y));

		// use 360 instead of 2.0*PI if // you use d_cos and d_sin
	}
}

function GenerateGhost() {
        // begin body  (87 points)
	points.push(vec2(3, 0));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3.1, 1));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3.5, 2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4, 3.6));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4, 4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4.1, 3.3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4.5, 3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(5.5, 3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(6,3.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(6.5, 4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(6.7, 4.2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(6.8, 2.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(7, 2.4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(7.5, 2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(8, 2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(8.5, 1.7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(9, 1.2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10, 0.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10, -2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10.4, -2.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10.5, -3.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10.7, -1.7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(11, -1.4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(11.2, -1.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(12, -2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(12.5, -2.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(13, -3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(13, -2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(12.8, -0.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(12, 0));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(12.5, 0.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(11, 1));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10.8, 1.4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10.2, 2.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(10, 4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(9.8, 7.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(7.5, 9.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(6, 11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3, 12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(.5, 15));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(0, 17));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1.8, 17.4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-4, 16.6));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5, 14));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-6, 10.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-9, 10));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-10.5, 8.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-12, 7.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-12.5, 4.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-13, 3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-13.5, -1));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-13, -2.3));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-12, 0));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-11.5, 1.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-11.5, -2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-10.5, 0));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-10, 2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-8.5, 4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-8, 4.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-8.5, 7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-8, 5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-6.5, 4.2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-4.5, 6.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-4, 4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5.2, 2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5, 0));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5.5, -2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-6, -5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-7, -8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-8, -10));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-9, -12.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-10, -14.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-10.5, -15.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-11, -17.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5, -14));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-4, -11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-5, -12.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-3, -12.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2, -11.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(0, -11.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(1, -12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3, -12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3.5, -7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3, -4));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4, -3.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(4.5, -2.5));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(3, 0));
        colors.push(vec4(1, 1, 1, 1));
        // end body

	// begin mouth (6 points)
	points.push(vec2(-1, 6));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-0.5, 7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-0.2, 8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1, 8.6));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2, 7));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1.5, 5.8));
        colors.push(vec4(1, 1, 1, 1));
        // end mouth

	// begin nose (5 points)
	points.push(vec2(-1.8, 9.2));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1, 9.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1.1, 10.6));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1.6, 10.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-1.9, 10));
        colors.push(vec4(1, 1, 1, 1));

        // begin left eye, translate (2.6, 0.2, 0) to draw the right eye
        // outer eye, draw line loop (9 points)
	points.push(vec2(-2.9, 10.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.2, 11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2, 12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2, 12.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.2, 13));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.5, 13));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.9, 12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-3, 11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.9, 10.5));
        colors.push(vec4(1, 1, 1, 1));

        // eye ball, draw triangle_fan (7 points)
	points.push(vec2(-2.5, 11.4));  // middle point
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.9, 10.8));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.2, 11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2, 12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.9, 12));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-3, 11));
        colors.push(vec4(1, 1, 1, 1));
	points.push(vec2(-2.9, 10.5));
        colors.push(vec4(1, 1, 1, 1));
        // end left eye
}

function DrawGhost(x, y) {
    modelViewStack.push(modelViewMatrix);    
    modelViewMatrix=mult(modelViewMatrix, scale4(1/10, 1/10, 1));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_LOOP, 80, 87); // body
    gl.drawArrays( gl.LINE_LOOP, 167, 6);  // mouth
    gl.drawArrays( gl.LINE_LOOP, 173, 5);  // nose

    gl.drawArrays( gl.LINE_LOOP, 178, 9);  // left eye
    gl.drawArrays( gl.TRIANGLE_FAN, 187, 7);  // left eye ball

    modelViewMatrix=mult(modelViewMatrix, translate(2.6, 0, 0));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 178, 9);  // right eye
    gl.drawArrays( gl.TRIANGLE_FAN, 187, 7);  // right eye ball
    modelViewMatrix = modelViewStack.pop();
}

function DrawFullPlanet() {
	modelViewMatrix=mat4();
	modelViewMatrix = mult(modelViewMatrix, translate(-4, 5, 0));
	modelViewMatrix=mult(modelViewMatrix, scale4(0.9, 0.9*1.618, 1));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        // draw planet circle
	gl.drawArrays(gl.TRIANGLE_FAN, 0, 80);
}


function generateRings(){
        var radius = 1;
        var numpoints = 20;
        var cangle = 2*Math.PI/numpoints;
        for(var i = 0; i< numpoints +1; i++){
                var x = radius*Math.cos(cangle *i);
                var y = radius*Math.sin(cangle*i);
                if(y>= 0){
                        vert.push(vec2(x,y));
                        
                }

        }
        points = points.concat(vert);
        for(var i =0; i < vert.length; i++){colors.push(vec4(0.7,0,0.7,1));}
}
function generateSky(){
        
        points.push(vec2(-8,8));
        colors.push(vec4(.5,.2,.6,1));

       
        points.push(vec2(8,8));
        colors.push(vec4(.5,.2,.6,1));

       points.push(vec2(8,0));
       colors.push(vec4(.13,0,.2,1));

        points.push(vec2(-8,0));
        colors.push(vec4(.13,0,.2,1));
        
}

function generateGround(){
        points.push(vec2(-8,0));
        colors.push(vec4(0,.1,.04,1));

       
        points.push(vec2(8,0));
        colors.push(vec4(0,.1,.04,1));

        points.push(vec2(8,-8));
        colors.push(vec4(.2,.4,0,1));

        points.push(vec2(-8,-8));
        colors.push(vec4(.2,.4,0,1));
}

function generateStars(){
        

        SIZE=4; // slices
        var Radius = 5;
        var radius = 2;
        var angle = 2*Math.PI/SIZE;

        for(var tempi = 0; tempi < 40; tempi++){
                vertices.push(vec2(0,0));
                colors.push(vec4(1,1,1,1));
                for (var i=0; i<SIZE; i++)
                {
                  // point from outer circle
                  //tempx = vec2(Radius*Math.cos(i*angle), 1.618*Radius*Math.sin(i*angle));
                  vertices.push(vec2(Radius*Math.cos(i*angle), 1.618*Radius*Math.sin(i*angle)));
                  colors.push(vec4(1,1,1,1));

                  // point from inner circle
                  vertices.push(vec2(radius*Math.cos((i*angle)+Math.PI/4), 1.618*radius*Math.sin((i*angle)+Math.PI/4)));
                colors.push(vec4(1,1,1,1));
                }
                vertices.push(vec2(Radius*Math.cos(0), Radius*Math.sin(0)));
                colors.push(vec4(1,1,1,1));
        }

        points = points.concat(vertices);
        
        


        
}

function generateMountains(){
       
        
    for(var count = 0; count < 5; count++){
        points.push(vec2(-3,0));
        colors.push(vec4(.2, .2, .1, 1));
        points.push(vec2(3,0));
        colors.push(vec4(.2, .1, .1, 1));
        points.push(vec2(0,2));
        colors.push(vec4(.2, .2, .4, 1));
    }  
                                        
}

function generateBow(){
        var bow = [
                vec2(-1.5,0),

                vec2(-1,0),

                vec2(-Math.cos(Math.PI/6), Math.sin(Math.PI/6)),
                
                vec2(-Math.cos(Math.PI/4), Math.sin(Math.PI/4)),

                vec2(-Math.cos(Math.PI/3), Math.sin(Math.PI/3)),

                vec2(0,1),

                vec2(Math.cos(Math.PI/3), Math.sin(Math.PI/3)),

                vec2(Math.cos(Math.PI/4), Math.sin(Math.PI/4)),

                vec2(Math.cos(Math.PI/6), Math.sin(Math.PI/6)),


                vec2(1,0),

                vec2(1.5,0),

                //string
                vec2(-1,0),
                vec2(0,-.5),
                vec2(1,0)
        ];
     
        
        points = points.concat(bow);

        for(var i = 0; i < bow.length-3; i++){colors.push(vec4(.59,.29,0,1));}
        for(var i = 0; i < 3; i++){colors.push(vec4(1,1,1,1));}
       
}

function generateArrow(){
        var arrow = [

                vec2(0,0),
                
                //first feather
                vec2(0,0.2),

                vec2(-0.1, 0.15),
                vec2(0,0.2),

                vec2(0.1, 0.15),
                vec2(0,0.2),

                //second feather
                vec2(0,0.3),

                vec2(-0.1, 0.25),
                vec2(0,0.3),

                vec2(0.1, 0.25),
                vec2(0,0.3),

                //third feather
                vec2(0,0.4),

                vec2(-0.1, 0.35),
                vec2(0,0.4),

                vec2(0.1, 0.35),
                vec2(0,0.4),



                vec2(0,1.5),

                vec2(0.1, 1.25),

                vec2(0,1.5),

                vec2(-0.1, 1.25)
        ]
        
        points = points.concat(arrow);

        for(var i =0; i < arrow.length; i++){colors.push(vec4(1,1,1,1));}
      
}

function generatePumpkin(){
        pumpkin.push(vec2(-0.2,1));
        pumpkin.push(vec2(0.2,1));
        pumpkin.push(vec2(0.2,1.5));
        pumpkin.push(vec2(-0.2,1.5));
                
        
        var radius = 1;
        var numpoints = 20;
        angle = 2*Math.PI/numpoints;

        for(var i = 0; i< numpoints +1; i++){
                var x = radius*Math.cos(angle *i);
                var y = radius*Math.sin(angle*i);
                
                pumpkin.push(vec2(x,y));
                        
                

        }
        colors.push(vec4(0,0,0,1));
        colors.push(vec4(0,0,0,1));
        colors.push(vec4(0,0,0,1));
        colors.push(vec4(0,0,0,1));
        for(var i =0; i < pumpkin.length-4; i++){colors.push(vec4(1,0.33,0,1));}
        points = points.concat(pumpkin);
        
}

function generateSign(){
        var sign = [
                vec2(-1,3),
                vec2(1,3),
                vec2(1, 0.5),
                vec2(-1, 0.5),

                //stick
                vec2(0.15,0.5),
                vec2(0.15, -1),
                vec2(-0.15, -1),
                vec2(-0.15, 0.5),

                //red lines
                vec2(-1,3),
                vec2(1,0.5),
                vec2(1,3),
                vec2(-1,0.5)


        ]
        points = points.concat(sign);
        for(var i = 0; i < 4; i++){colors.push(vec4(0.8, 0.53, 0, 1));}
        for(var i = 0; i < 4; i++){colors.push(vec4(0.4, 0.2, 0, 1));}
        for(var i = 0; i < 4; i++){colors.push(vec4(1, 0.1, .1, 1));}
}

function drawSign(){
        modelViewStack.push(modelViewMatrix);
        modelViewMatrix = mult(modelViewMatrix, translate(6,-7,0));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.TRIANGLE_FAN, preSign,4);
        gl.drawArrays(gl.TRIANGLE_FAN, preSign+4, 4);

        modelViewStack.push(modelViewMatrix);
        modelViewMatrix = mult(modelViewMatrix, scale4(.5,.5,1));
        modelViewMatrix = mult(modelViewMatrix, translate(0,3.3,0));
        DrawGhost();
        modelViewMatrix = modelViewStack.pop();

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.LINES, preSign+8, 2);
        gl.drawArrays(gl.LINES, preSign+10, 2);
        modelViewMatrix = modelViewStack.pop();
        
        
}
function drawPumpkin(){
        var prevy =-4;
        for(var i = 0; i < 50; i++){
                modelViewStack.push(modelViewMatrix);
                var x = Math.random()*18;
                if (Math.random()*2 > 1){
                        x = x* -1;
                }
                //var y = -1 *(Math.random() * 8) -4;
                var y = prevy - 0.2;
                prevy = y;
                

                modelViewMatrix = mult(modelViewMatrix, scale4(.4,.4,1));
	        modelViewMatrix = mult(modelViewMatrix, translate(x,y,1));
                gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
                gl.drawArrays(gl.TRIANGLE_FAN, prePump,4);
                gl.drawArrays(gl.TRIANGLE_FAN, prePump+4,pumpkin.length-4);
                modelViewMatrix = modelViewStack.pop();
        }
}
function drawfirstRings(){
        for(var i =0; i < 4; i++){
                modelViewStack.push(modelViewMatrix);
                modelViewMatrix = mult(modelViewMatrix, translate(-3.95,5.1 - i/10,1));
                modelViewMatrix = mult(modelViewMatrix, rotate(40,0 ,0,1));
                modelViewMatrix = mult(modelViewMatrix, scale4(1.3,1.3,1));
	
                gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
                gl.drawArrays(gl.LINE_STRIP, preRings,vert.length);
                modelViewMatrix = modelViewStack.pop();
        }
       
}
function drawsecondRings(){
        for(var i =0; i < 4; i++){
                modelViewMatrix = mat4();
                modelViewStack.push(modelViewMatrix);
                modelViewMatrix = mult(modelViewMatrix, translate(-3.95,5.1 - i/10,1));
                modelViewMatrix = mult(modelViewMatrix, rotate(-140,0 ,0,1));
                modelViewMatrix = mult(modelViewMatrix, scale4(1.3,1.3,1));
	
                gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
                gl.drawArrays(gl.LINE_STRIP, preRings,vert.length);
                modelViewMatrix = modelViewStack.pop();
        }

       
}
function drawArrow(){
        modelViewMatrix = mat4();
        modelViewStack.push(modelViewMatrix);
        modelViewMatrix = scale4(1.25,1.25,1,1);
	modelViewMatrix = mult(modelViewMatrix, translate(0,-6,1));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        gl.drawArrays(gl.LINE_STRIP, prearrow,20);
        modelViewMatrix = modelViewStack.pop();

}

function drawBow(){
        modelViewStack.push(modelViewMatrix);
        modelViewMatrix = scale4(1,1,1,1);
	modelViewMatrix = mult(modelViewMatrix, translate(0,-6.9,1));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        gl.drawArrays(gl.LINE_STRIP, prebow,11);
        gl.drawArrays(gl.LINE_STRIP,prebow+11, 3);
        modelViewMatrix = modelViewStack.pop();
}

function drawMountains(){
        //Random mountains for new scenery every time!
        var mntsize = 3;
        var initcount = premnt;

        for(var count = 0; count < 5; count++){

                
                modelViewStack.push(modelViewMatrix);
                var x = Math.floor(Math.random() * (7 - (-7)) ) + -7;
                var y = -count/5 - 0.8;
                modelViewMatrix = translate(x, y, 1);

                var scalex, scaley;
                scalex = Math.random()*3;
                scaley = 0.8;
                modelViewMatrix = mult(modelViewMatrix, scale4(scalex,scaley *1.618,1));
                gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
      
                gl.drawArrays(gl.TRIANGLE_FAN, initcount, 3);
                modelViewMatrix = modelViewStack.pop();

                initcount = initcount + 3;
        
        }

       
}
function drawSky(){
	modelViewStack.push(modelViewMatrix);
	
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        gl.drawArrays(gl.TRIANGLE_FAN, 194, 4);
        modelViewMatrix = modelViewStack.pop();
        
}


function drawGround(){
        modelViewStack.push(modelViewMatrix);
	
	
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        // draw planet circle
        gl.drawArrays(gl.TRIANGLE_FAN, 198, 4);
        modelViewMatrix = modelViewStack.pop();

        
}

function drawStars(){
        var x,y;
      
        var index = 202;
        var starsize = 10;
       for(var count = 0; count < 40; count++){
                x = (Math.random() + Math.floor(Math.random() * (80 - (-80)) ) + -80)/10;
                y = (Math.floor(Math.random() * (80 - 40 )) + 40)/10 ;

                modelViewStack.push(modelViewMatrix);
                modelViewMatrix = translate(x, y, 1);
                modelViewMatrix = mult(modelViewMatrix, scale4(.3* 1/40, .3* 1/40 * 1.618, 1));

                gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
                gl.drawArrays(gl.TRIANGLE_FAN, index, vertices.length);
                modelViewMatrix = modelViewStack.pop();

                index = index + starsize;
                
       }
       

                
        
        
}

function genNewGhost(){
    var x, y;
    x = (Math.random() + Math.floor(Math.random() * (80 - (-80)) ) + -80)/10;
    y = (Math.floor(Math.random() * (50 - (-50) )) + (-50))/10 ;
    modelViewStack.push(modelViewMatrix);
    modelViewMatrix = translate(x,y,0,0);
    DrawGhost();
    modelViewMatrix = modelViewStack.pop();

    ghostX = x;
    ghostY = y;
    
    
}
