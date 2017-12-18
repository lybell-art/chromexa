function hexagon(x,y,r)
{
	var edge=createVector(r,0);
	var pos=createVector(x,y);
	var v;
	beginShape();
	for(var i=0;i<6;i++)
	{
		v=p5.Vector.add(edge,pos);
		vertex(v.x,v.y);
		edge.rotate(PI/3);
	}
	endShape();
}
function roundedHexagon(x,y,r)
{
	beginShape();
	roundedHexagonRaw(x,y,r);
	endShape(CLOSE);
}
function roundedHexagon(x,y,r)
{
	beginShape();
	roundedHexagonRaw(x,y,r);
	endShape(CLOSE);
}
function roundedHexagonRaw(x,y,r)
{
	var edge=createVector(0,r*cos(PI/6));
	var cpoint=createVector(-r/2,0);
	var apoint=createVector(-r*7/20,0);
	var v1, v2;
	v2=p5.Vector.add(edge,apoint);
	vertex(x+v2.x,y+v2.y);
	for(var i=0;i<6;i++)
	{
		v1=p5.Vector.sub(edge,cpoint);
		v2=p5.Vector.sub(edge,apoint);
		bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
		v1=p5.Vector.add(edge,cpoint);
		v2=p5.Vector.add(edge,apoint);
		bezierVertex(x+v2.x,y+v2.y,x+v1.x,y+v1.y,x+v2.x,y+v2.y);
		edge.rotate(PI/3);
		cpoint.rotate(PI/3);
		apoint.rotate(PI/3);
	}
	v1=p5.Vector.sub(edge,cpoint);
	v2=p5.Vector.sub(edge,apoint);
	bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
}
function star(posX,posY,r1,r2)
{
	var v1=createVector(0,-r1);
	var v2=p5.Vector.fromAngle(-HALF_PI+PI/5);
	var pos=createVector(posX,posY);
	var R1=createVector();
	var R2=createVector();
	v2.setMag(r2);
	beginShape();
	for(var i=0;i<5;i++)
	{
		R1=p5.Vector.add(v1,pos);
		R2=p5.Vector.add(v2,pos);
		vertex(R1.x,R1.y);
		vertex(R2.x,R2.y);
		v1.rotate(TWO_PI/5);
		v2.rotate(TWO_PI/5);
	}
	endShape();
}


function detectCell(kind)
{
	switch(kind)
	{
		case 3:
		case 4:return _FILLER;
		case 1:return _MOVEABLE;
		default:return _NOMOVE;
	}
}
