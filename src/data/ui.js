const UI={
	ingame_banner:function()
	{
		var base=min(width,height);
		var H=base/6.5;
		var R=H/5;
		noStroke();
		fill(_WHITE);
		rect(H/4,0,width-H*2/4,H);
		rect(width/2-H+R,H-10,2*H-2*R,H*2/3+10);
		rect(width/2-H,H-10,2*H,H*2/3-R+10);
		ellipse(width/2-(H-R),H*5/3-R,2*R,2*R);
		ellipse(width/2+(H-R),H*5/3-R,2*R,2*R);
		fill(_DARK_WHITE);
		ellipse(R,H-R,2*R,2*R);
		ellipse(width-R,H-R,2*R,2*R);
		rect(0,0,H,H-R);
		rect(R,0,H-R,H);
		rect(width-H,0,H,H-R);
		rect(width-H,0,H-R,H);
	},
	ingame_banner2:function(whosTurn)
	{
		var base=min(width,height);
		var H=base/6.5;
		var v=createVector(1,0);
		var v2=p5.Vector.fromAngle(radians(-120));
		var pos=createVector(width/2,H*2/3*cos(PI/6));
		var edge=createVector();
		var i;
		//hexagon
		noStroke();
		fill(255);
		beginShape();
		v.mult(H*2/3);
		for(i=0;i<6;i++)
		{
			edge=p5.Vector.add(v,pos);
			vertex(edge.x,edge.y);
			v.rotate(PI/3);
		}
		endShape(CLOSE);
		//inner hexagon
		v=createVector(-1,0);
		v.mult(H*2/3*4/5);
		v2.mult(H*2/3*4/5);
		noFill();
		strokeCap(ROUND);
		strokeJoin(ROUND);
		strokeWeight(H/20);
		for(i=0;i<6;i++)
		{
			switch(i)
			{
				case 0:stroke(_PURPLE); break;
				case 1:stroke(_BLUE); break;
				case 2:stroke(_GREEN); break;
				case 3:stroke(_YELLOW); break;
				case 4:stroke(_ORANGE); break;
				case 5:stroke(_RED); break;
			}
			line(v.x+pos.x,v.y+pos.y,v2.x+pos.x,v2.y+pos.y);
			v.rotate(-PI/3);
			v2.rotate(-PI/3);
		}
		stroke(_PURPLE);
		point(v2.x+pos.x,v2.y+pos.y);
		//who's turn
		var clamp=H*2/3*6/5;
		if(whosTurn==1) stroke(_BLUE);
		else stroke("#bdc3c7");
		beginShape()
		vertex(width/2-(clamp-H*1/3),0);
		vertex(width/2-clamp,H*2/3*cos(PI/6));
		vertex(width/2-(clamp-H*1/3),H*4/3*cos(PI/6));
		endShape();
		if(whosTurn==2) stroke(_RED);
		else stroke("#bdc3c7");
		beginShape()
		vertex(width/2+(clamp-H*1/3),0);
		vertex(width/2+clamp,H*2/3*cos(PI/6));
		vertex(width/2+(clamp-H*1/3),H*4/3*cos(PI/6));
		endShape();
	},
	ingame_status:function(whosTurn, turns, cost)
	{
		var base=min(width,height);
		var H=base/6.5;
		var F=base/768;
		var light=resourceBox.font[0];
		var regular=resourceBox.font[1];
		var medium=resourceBox.font[2];
		if(whosTurn==1) fill(_BLUE);
		else fill(_RED);
		textAlign(CENTER);
		textFont(light);
		textSize(12*F);
		text('TURN', width/2,0.42*H);
		textFont(regular);
		textSize(45*F);
		text(turns, width/2,0.8*H);
		fill(_BLACK);
		textFont(light);
		textSize(20*F);
		text(turns, width/2-20*F,1.5*H);
		textFont(medium);
		textSize(30*F);
		text(turns, width/2+37*F,1.55*H);
	},
	endTurn_button:function()
	{
		//define varient
		var base=min(width,height);
		var W=base/3.7;
		var H=base/5.8;
		var R=W/10;
		var buttonX=width-base*0.08-W;
		var buttonY=height-base*0.08-H;
		var strokeW=5*base/768;
		strokeWeight(strokeW);
		//draw inner area
		noStroke();
		fill(255);
		rect(buttonX,buttonY+R,W,H-2*R);
		rect(buttonX+R,buttonY,W-2*R,H);
		ellipse(buttonX+R,buttonY+R,2*R,2*R);
		ellipse(buttonX+R,buttonY+H-R,2*R,2*R);
		ellipse(buttonX+W-R,buttonY+H-R,2*R,2*R);
		ellipse(buttonX+W-R,buttonY+R,2*R,2*R);

		noFill();
		strokeWeight(strokeW);
		//draw outer area
		stroke(_RED);
		line(buttonX,buttonY+H/2,buttonX,buttonY+R);
		arc(buttonX+R,buttonY+R,2*R,2*R,PI,1.5*PI);
		stroke(_PURPLE);
		line(buttonX+3*R,buttonY+H,buttonX+R,buttonY+H);
		arc(buttonX+R,buttonY+H-R,2*R,2*R,0.5*PI,PI);
		line(buttonX,buttonY+H-R,buttonX,buttonY+H/2);
		stroke(_BLUE);
		line(buttonX+W-3*R,buttonY+H,buttonX+3*R,buttonY+H);
		stroke(_GREEN);
		line(buttonX+W,buttonY+H/2,buttonX+W,buttonY+H-R);
		arc(buttonX+W-R,buttonY+H-R,2*R,2*R,0,0.5*PI);
		line(buttonX+W-R,buttonY+H,buttonX+W-3*R,buttonY+H);
		stroke(_YELLOW);
		line(buttonX+W-3*R,buttonY,buttonX+W-R,buttonY);
		arc(buttonX+W-R,buttonY+R,2*R,2*R,1.5*PI,TWO_PI);
		line(buttonX+W,buttonY+R,buttonX+W,buttonY+H/2);
		stroke(_ORANGE);
		line(buttonX+3*R,buttonY,buttonX+W-3*R,buttonY);
		stroke(_RED);
		line(buttonX+R,buttonY,buttonX+3*R,buttonY);
	}
}
