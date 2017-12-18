function BUTTON(x,y,w,h)
{
	this.x=x,
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
