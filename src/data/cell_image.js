const cellImage=
{
	0:function()
	{
		//nothing
	}
	1:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,30);
	}
	2:function(who, x, y)
	{
		var col=this.colerSelect(who);
		if(who==0) col=_DARK_WHITE;
		noFill();
		stroke(col);
		strokeCap(ROUND);
		strokeWeight(2.5);
		roundedHexagon(x,y,30);
	}
	3:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,40);
		noFill();
		stroke(255);
		strokeCap(ROUND);
		strokeJoin(ROUND);
		var v1=createVector(25,0);
		var v2=p5.Vector.fromAngle(radians(60));
		v2.mult(25);
		for(var i=0;i<6;i++)
		{
			triangle(x, y, x+v1.x, y+v1.y, x+v2.x, y+v2.y);
			v1.rotate(PI/3);
			v2.rotate(PI/3);
		}
	}
	4:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,30);
		noFill();
		stroke(255);
		strokeCap(ROUND);
		strokeJoin(ROUND);
		beginShape();
		vertex(x,y-16);
		vertex(x-9,y-4);
		vertex(x-9,y+13.5);
		vertex(x-5,y+15);
		vertex(x+5,y+15);
		vertex(x+9,y+13.5);
		vertex(x+9,y-4);
		endShape(CLOSE);
		line(x,y-16,x,y+15);
	}
	5:function(x, y)
	{
		noStroke();
		var v1=createVector(30,0);
		var v2=p5.Vector.fromAngle(radians(60));
		v2.mult(30);
		for(var i=0;i<6;i++)
		{
			switch(i%3)
			{
				case 0:fill("#5d6364"); break;
				case 1:fill("#3a3a3a"); break;
				case 2:fill("#262626"); break;
			}
			triangle(x, y, x+v1.x, y+v1.y, x+v2.x, y+v2.y);
			v1.rotate(PI/3);
			v2.rotate(PI/3);
		}
		fill(255);
		beginShape();
		for(var i=0;i<6;i++)
		{
			vertex(x+v1.x, y+v1.y);
			v1.rotate(-PI/3);
		}
		beginContour();
		roundedHexagonRaw(x,y,30);
		endContour();
		endShape(CLOSE);
	}
	colerSelect:function(who)
	{
		switch(who)
		{
			case 1:return _BLUE; break;
			case 2:return _RED; break;
			case 0:return _WHITE; break;
			default:return _DARK_WHITE;
		}
	}
}
