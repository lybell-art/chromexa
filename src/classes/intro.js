function INTRO()
{
	this.shade=[];
	this.tween=0;
	this.press=false;
	for(var i=0;i<4;i++)
	{
		this.shade[i]=[];
		for(var j=0;j<9;j++)
		{
			this.shade[i][j]=int(random(4))*5;
		}
	}
}
INTRO.prototype.execute=function()
{
	var base=min(width,height);
	var button=new BUTTON(width/2-base/8,height*9/16,base/4,base/4);
	if(this.tween>width/2)
	{
		sceneNo=1;
		return 0;
	}
	if(inputBroadcast.isMousePress&&button.mouseOn())
	{
		this.press=true;
	}
	this.draw();
	if(this.press) this.tween+=this.tween/4+1;
}
INTRO.prototype.draw=function()
{
	background(255);
	var base=min(width,height);
	var H=base/4;
	UI.logo(width/2,height*9/32,height/2);
	this.banner(base,H);
	if(this.tween>0) fill(236,240,241,255);
	else fill(255);
	UI.start_button(width/2,height*11/16,H/5);
	if(this.press)
	{
		fill(236,240,241,map(this.tween,0,width/2,255,0));
		UI.start_button(width/2,height*11/16,map(this.tween,0,width/2,H/5,H/2));
	}
}
INTRO.prototype.banner=function(base,H)
{
	var triW=H/8/cos(PI/6);
	var ox;
	var oy=height*9/16;
	noStroke();
	fill("#bdc3c7");
	rect(0,oy,width,H);
	if(this.press)
	{
		fill(255);
		rect(width/2-this.tween,oy-5,this.tween*2,H+5);
	}
	colorMode(HSB);
	for(var i=0;i<4;i++)
	{
		for(var pm=-1;pm<2;pm+=2)
		{
			ox=width/2+pm*base/8;
			for(var j=0;j<9;j++)
			{
				if(j==0&&(i==1||i==2)) continue;
				if(this.tween>base/8+triW*(j+1))
				{
					this.shade[i][j]=int(random(4))*5;
					fill(j*360/9,5+this.shade[i][j],100);
				}
				else fill(0,0,100-this.shade[i][j]);
				beginShape();
				vertex(ox+pm*triW*j,oy+H/4*(i+(i+j)%2));
				vertex(ox+pm*triW*(j+2),oy+H/4*(i+(i+j)%2));
				vertex(ox+pm*triW*(j+1),oy+H/4*(i+(i+j+1)%2));
				endShape(CLOSE);
			}
		}
	}
	colorMode(RGB);
}
