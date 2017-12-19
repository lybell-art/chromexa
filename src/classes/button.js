function BUTTON(x,y,w,h)
{
	this.x=x
	this.y=y;
	this.w=w;
	this.h=h;
	this.draw=function(){};
}
BUTTON.prototype.imageSet=function(func)
{
	this.draw=func;
}
BUTTON.prototype.mouseOn=function()
{
	if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h)
	{
		return true;
	}
	else return false;
}
function HEXA_BUTTON(x,y,r)
{
	this.x=x;
	this.y=y;
	this.r=r;
}
HEXA_BUTTON.prototype.mouseOn=function(isSC_on)
{
	var mouse;
	if(isSC_on) mouse=screenControl.relativeMouse();
	else mouse=createVector(mouseX,mouseY);
	var mousePos=createVector(this.x,this.y);
	mousePos.sub(mouse);
	var edge=createVector(this.r,0);
	var theta=0;
	for(var i=0;i<6;i++)
	{
		var v1=p5.Vector.sub(edge,mousePos);
		edge.rotate(PI/3);
		var v2=p5.Vector.sub(edge,mousePos);
		theta+=v1.angleBetween(v2);
	}
	return abs(theta-TWO_PI)<0.00001;
}

function OTHER_DIALOGBUTTTON()
{
	this.x=0;
	this.y=0;
	this.isValid=false;
}
OTHER_DIALOGBUTTTON.prototype.set=function(where,otherP)
{
	var p;
	if(otherP!=-1)
	{
		if(where.whosTurn==1) p=where.p1[otherP];
		else p=where.p2[otherP];
		this.x=p.x;
		this.y=p.y;
		this.isValid=true;
	}
	else
	{
		this.x=0;
		this.y=0;
		this.isValid=false;
	}
}
OTHER_DIALOGBUTTTON.prototype.draw=function()
{
	if(this.isValid)
	{
		UI.ODL_select(this.x-15,this.y+30);
		UI.ODL_swap(this.x+15,this.y+30);
	}
}
OTHER_DIALOGBUTTTON.prototype.isMouseOn=function()
{
	var selecter=new HEXA_BUTTON(this.x-15,this.y+30,12);
	var swapper=new HEXA_BUTTON(this.x-15,this.y+30,12);
	if(selecter.isMouseOn()) return "select";
	else if(swapper.isMouseOn()) return "swap";
	else return "none";
}
