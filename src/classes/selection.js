function SELENTION()
{
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
	if(inputBroadcast.isMousePress)
	{
		if(single.mouseOn()) sceneNo=2;
		if(multi.mouseOn()) sceneNo=3;
	}
}
SELECTION.prototype.stageSelect_single=function()
{
	var stageButton=[];
	var coord;
	for(var i=0;i<2;i++)
	{
		for(var j=0;j<12;j++)
		{
			coord=new COORD(i,j);
			stageButton.push(new HEXA_BUTTON(coord.x(),coord.Y(),36));
			hexagon(coord.x(),coord.Y(),36);
		}
	}
	if(inputBroadcast.isMousePress)
	{
		for(var i=0;i<24;i++)
		{
			if(stageButton[i].mouseOn)
			{
				sceneNo=10;
				stream.world=1;
				stream.stage=i+1;
			}
		}
	}
}
SELECTION.prototype.stageSelect_multi=function()
{
}
