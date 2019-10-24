//Kaleb Askren
//Computer Languages Java
//Project 3: Clock
//Due October 18

/* PLEASE NOTE
 * I unfortunately misunderstood the assignment and
 * assumed it was to create a clock from scratch.  I discussed
 * this with Professor Poudel and he said that it would be fine
 * to use the clock I made.  Thank you!
 */

//All imports I might need
import java.lang.Object;
import java.time.LocalTime;

import javafx.scene.Node;
import javafx.scene.Group;
import javafx.scene.shape.Circle;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;
import javafx.scene.paint.Paint;
import javafx.scene.paint.Color;
import java.util.Date;
import java.util.Calendar;
import javafx.scene.text.Text;
import java.util.*;
import javafx.scene.shape.Line;

//Clock Class
public class Clock extends Application {
    public static void main(String[] args) {
        launch(args);
    }
    
    @Override
    public void start(Stage stage) {
    	String hours[] = new String[12];
    	int radius = 250;
        stage.setTitle("Kaleb's Clock - Using JavaFX");
        
        
        LocalTime time = LocalTime.now();
        System.out.println(time);
        
        //background circle for outline
        Circle clockcircle = new Circle(300,300,radius+3, Color.BLACK);
        
        Group root = new Group(clockcircle);
        
        Circle clockface = new Circle(300,300,radius, Color.ANTIQUEWHITE);
        root.getChildren().add(clockface);
        for(int i = 0; i < 12; i++) {
        	hours[i] = Integer.toString(i+1);
        }
        
        //compute the coordinates for clock face numbers
        for(int i = 0; i < 12; i++) {
        	double x = 300 + Math.cos(3.1415/6 * (i - 2)) * (radius - 23);
        	double y = 300 + Math.sin(3.1415/6 * (i-2)) * (radius - 25);
        	Text temp = new Text(x,y, hours[i]);
        	root.getChildren().add(temp);
        }
        
        
       
        //add tick marks
        for(int i = 0; i < 60; i++) {
        	double angle = Math.PI/30;
        	//tickradius is the distance from center to tickmark
        	int tickradius = 250;
        	
        	double tickx = 300 + Math.cos(angle * ( i )) * (tickradius);
            double ticky = 300 + Math.sin(angle * ( i )) * (tickradius);
        	System.out.println("x: " + tickx + " y: " + ticky);
        	
        	int startradius;
        	if(i % 5 == 0) {
        		startradius = tickradius - 15;
        	}
        	else
        		startradius = tickradius - 5;
        	
        	double startx = 300 + Math.cos(angle * ( i )) * (startradius);
        	double starty = 300 + Math.sin(angle * ( i )) * (startradius);
        	
        	Line tick = new Line(startx,starty, tickx, ticky);
        	root.getChildren().add(tick);
        	}
        
        
        
        //retrieve values for the current hour, minute, and second
        double curhour = time.getHour();
        double hour = curhour;
        if(curhour > 12)
        	hour = curhour - 12;
        
        double curminute = time.getMinute();
        double minute = curminute / 60;
        hour = hour + minute;
        double cursecond = time.getSecond();
        double second = cursecond/60;
        
        //Here we are computing the final x and y values for the line objects on the clock face
        //to do this, we compute the angle that each hand is in relation to the origin
        //it is also important that this is starting at the positive x axis so we need to
        //subtract an offset of three to rotate each hand to the correct angle
        //then, just for fun, alter the widths and colors of the hands using the built
        //in setter functions of the Line objects
        	
        //convert the hour time into an x and y coordinate for the end point of the hour hand
        double hrx = 300 + Math.cos(3.1415/6 * ( hour - 3 )) * (radius - 150);
        double hry = 300 + Math.sin(3.1415/6 * ( hour - 3 )) * (radius - 150);
        Line hourhand = new Line(300,300, hrx, hry);
        hourhand.setStrokeWidth(3);
        hourhand.setStroke(Color.BLUE);
        
        double mnthandx = 300 + Math.cos(3.1415/6 * ( minute * 12 - 3)) * (radius - 100);
        double mnthandy = 300 + Math.sin(3.1415/6 * ( minute * 12 - 3)) * (radius - 100);
        Line minutehand = new Line(300,300, mnthandx, mnthandy);
        minutehand.setStrokeWidth(2);
        minutehand.setStroke(Color.DEEPPINK);
        
        double sechandx = 300 + Math.cos(3.1415/6 * ( second * 12 -3)) * (radius - 50);
        double sechandy = 300 + Math.sin(3.1415/6 * ( second * 12 - 3)) * (radius - 50);
        Line secondhand = new Line(300,300, sechandx, sechandy);
        secondhand.setStrokeWidth(1);
        secondhand.setStroke(Color.RED);
        
        
        //Add all new lines to the root for display
        root.getChildren().add(hourhand);
        root.getChildren().add(minutehand);
        root.getChildren().add(secondhand);
        Scene scene = new Scene(root, 600, 600);
        
        //print the current time in numeric form at the bottom
        String timefordisplay = Double.toString(curhour);
        
        timefordisplay = timefordisplay + Double.toString(curminute) + Double.toString(cursecond);
        
        Text timedisplay = new Text(250,570, timefordisplay);
        root.getChildren().add(timedisplay);       
        stage.setScene(scene);
        stage.show();
        
       }
    
}
