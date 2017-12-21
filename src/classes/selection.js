function SELECTION()
{
	this.a="bla_bla";
}
SELECTION.prototype.mainSelect=function()
{
	var single=new HEXA_BUTTON(width/2-300,height/2,150);
	var multi=new HEXA_BUTTON(width/2+300,height/2,150);
	background(255);
	fill(_RED);
	hexagon(width/2-300,height/2,150);
	fill(_BLUE);
	hexagon(width/2+300,height/2,150);
	fill(255);
	textAlign(CENTER);
	textSize(36);
	text("single play",width/2-300,height/2);
	text("multi play",width/2+300,height/2);
	if(inputBroadcast.isMousePress)
	{
		if(single.mouseOn()) sceneNo=2;
		if(multi.mouseOn())
		{
			sceneNo=10;
			stream.world=0;
			stream.stage=1;
		}
	}
}
SELECTION.prototype.stageSelect_single=function()
{
	var stageButton=[];
	var coord;
	var w=45*(1.5*12+0.5);
	background(255);
	textAlign(CENTER);
	textSize(25);
	for(var i=0;i<2;i++)
	{
		for(var j=0;j<12;j++)
		{
			coord=new COORD(i,j);
			stageButton.push(new HEXA_BUTTON(width/2-w/2+coord.x(),height*2/5+coord.y(),36));
			if(i*12+j<6) fill(_BLUE);
			else fill(_DARK_WHITE);
			hexagon(width/2-w/2+coord.x(),height*2/5+coord.y(),36);
			fill(255);
			text(i*12+j+1,width/2-w/2+coord.x(),height*2/5+coord.y());
		}
	}
	if(inputBroadcast.isMousePress)
	{
		for(var i=0;i<6;i++)
		{
			if(stageButton[i].mouseOn())
			{
				sceneNo=10;
				stream.world=1;
				stream.stage=i+1;
				break;
			}
		}
	}
}
SELECTION.prototype.stageSelect_multi=function()
{
}
