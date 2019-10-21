//Kaleb Askren
//CSCI 4250 - Computer Graphics
//Project 1
//Due 9-20-2019
//Dr. Cen Li

var gl, points, vertices, vertices2;
vertices = [];
vertices2 = [];
var NumPoints = 100000;
var curFern = 0, curcolor =0;
var xmax = 0, xmin = 0, ymax = 0, ymin = -0;
var xmax2 = 0, xmin2 = 0, ymax2 = 0, ymin2 = -0;

//sets for first fern
var a =    [ 0.00,  0.20, -0.15,  0.75 ];
var b =    [ 0.00, -0.26,  0.28,  0.04 ];
var c =    [ 0.00,  0.23,  0.26, -0.04 ];
var d =    [ 0.16,  0.22,  0.24,  0.85 ];
var e =    [ 0.00,  0.00,  0.00,  0.00 ];
var f =    [ 0.00,  1.60,  0.44,  1.60 ];
var prob = [ 0.10,  0.08,  0.08,  0.74 ];

//sets for second fern
var a1 =    [ 0.00,  0.20, -0.15,  0.85 ];
var b1 =    [ 0.00, -0.26,  0.28,  0.04 ];
var c1 =    [ 0.00,  0.23,  0.26, -0.04 ];
var d1 =    [ 0.16,  0.22,  0.24,  0.85 ];
var e1 =    [ 0.00,  0.00,  0.00,  0.00 ];
var f1 =    [ 0.00,  1.60,  0.44,  1.60 ];
var prob1 = [ 0.01,  0.07,  0.07,  0.85 ];

function main() {
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { console.log( "WebGL isn't available" ); return; }

    
    //hold points after first fern points before scaling
    points = [];
  

    var x = 0,y = 0;
    var newx,newy;
    for ( var i = 0; i < NumPoints; ++i ) {
          // Compute new points
        var set = Math.floor(Math.random() * 100);
        
        var setnum;
        //randomly determine the set that is used for the current point
        if(set > 0 && set <= 10)
            setnum = 0;
        
        else if( set > 10 && set <= 18)
            setnum = 1;
 
        else if(set > 18 && set <= 26)
            setnum = 2;
   
        else 
            setnum = 3;

        //calculate the current points x and y values
        newx = a[setnum]*x + b[setnum]*y + e[setnum];
        newy = c[setnum]*x + d[setnum]*y + f[setnum];

        //Keep track of the current max and min x/y values
        if(x > xmax)
            xmax = x;
        if (x < xmin)
            xmin = x;
        if(y > ymax)
            ymax = y;
        if(y<ymin)
            ymin = y;
        
            //push the new point into the array
        points.push( vec2(newx,newy) );
        x=newx;
        y=newy;
    }

    //scale the points
    for(var count = 0; count < points.length; count++){
        //Scale the points!
        var tpoint = points[count];
        var tempx = tpoint[0];
        var tempy = tpoint[1];

         newx = ((tempx - xmin)/(xmax-xmin) * 2-1);
         newy = ((tempy - ymin)/(ymax-ymin) * 2-1);

        vertices.push(vec2(newx,newy));
        

    }

//-----------------------------------------------------------

//Find all of the points for the second fern - calculated the same way as the first fern
    points2 = [];
  

    var x2 = 0,y2 = 0;
    var newx2,newy2;
    for ( var i = 0; i < NumPoints; ++i ) {
          // Compute new points
        var set2 = Math.floor(Math.random() * 100);
        //set = set/100;
        var setnum2;
    
        if(set2 > 0 && set2 <= 1)
            setnum2 = 0;
        
        else if( set2 > 1 && set2 <= 7)
            setnum2 = 1;
 
        else if(set2 > 7 && set2 <= 14)
            setnum2 = 2;
   
        else 
            setnum2 = 3;

        newx2 = a1[setnum2]*x2 + b1[setnum2]*y2+ e1[setnum2];
        newy2 = c1[setnum2]*x2 + d1[setnum2]*y2 + f1[setnum2];

        if(x2 > xmax2)
            xmax2 = x2;
        if (x2 < xmin2)
            xmin2 = x2;
        if(y2 > ymax2)
            ymax2 = y2;
        if(y2<ymin2)
            ymin2 = y2;
        
        points2.push( vec2(newx2,newy2) );
        x2=newx2;
        y2=newy2;
    }

    //scale the points
    for(var count = 0; count < points2.length; count++){
        //Scale the points!
        var tpoint = points2[count];
        var tempx = tpoint[0];
        var tempy = tpoint[1];

         newx2 = ((tempx - xmin2)/(xmax2-xmin2) * 2-1);
         newy2 = ((tempy - ymin2)/(ymax2-ymin2) * 2-1);

        vertices2.push(vec2(newx2,newy2));
        

    }
    var allpoints = vertices.concat(vertices2);
    //  Configure WebGL
    //gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    if (!program) { console.log('Failed to intialize shaders.'); return; }
    gl.useProgram( program );
    
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(allpoints), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

     //Get the storage location of colorValue
    var u_FragColor = gl.getUniformLocation(program, "colorValue");
    if (!u_FragColor) {
            console.log('Failed to get the storage location of u_FragColor');
    return;
    }
    //set the first color to default green
    gl.uniform4f(u_FragColor, 0,1,0,1);

    //If a click is detected call a function to render the other fern
    canvas.onmousedown = function(ev){click();};
    
    //change colors when c is pressed
    window.onkeydown = function(event){
        var key = String.fromCharCode(event.keyCode);
        if(key == 'C'){

            //CHANGE COLORS
            if(curcolor == 0){
                console.log("changing colors");
                gl.uniform4f(u_FragColor, 0, 0.6, 0.4, 1);
                curcolor = 1;
                if(curFern ==0){
                    renderFern1();
                }
                else
                    renderFern2();
            }
            else{
                gl.uniform4f(u_FragColor, 0, 1, 0, 1);
                curcolor = 0;
                if(curFern ==0){
                    renderFern1();
                }
                else
                    renderFern2();
            }
        }
    };
    renderFern1();
};

//functions to render the ferns
function renderFern1() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, vertices.length );
}
function renderFern2(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, vertices.length, vertices2.length);
}

//function to change the fern on screen
function click(){
    if (curFern == 0)
    {
        renderFern2();
        curFern = 1;
    }
    else{
        renderFern1();
        curFern = 0;
    }
}
