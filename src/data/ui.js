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
	ingame_status:function(whosTurn, turns, cost)
	{
		var base=min(width,height);
		var H=base/6.5;
		var v=createVector(0,1);
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
		v=createVector(0,-1);
		v.mult(H*2/3*4/5);
		v2.mult(H*2/3*4/5);
		noFill();
		strokeCap(ROUND);
		strokeJoin(ROUND);
		strokeWeight(5);
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
	}
}
