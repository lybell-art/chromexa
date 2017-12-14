/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.14
 * @version 0.03_debug
 *
 */
function INGAME()
{
	this.world=1;
	this.stage=1;
	this.mode=1;
	this.field=null;
	this.p1=null;
	this.p2=null;
	this.imsi=null;
}
INGAME.prototype.setup=function()
{
	/*
	this.world=stream.StoG1;
	this.stage=stream.StoG2;
	var mapData=resourceBox.map[this.world][this.stage].copy();
	this.field=new FIELD();
	this.field.makeField(mapData);
	screenControl.set(this.field.w,this.field.h);
	this.p1=new PLAYER();
	if(this.world==_MULTIPLAY) this.p2=new PLAYER();
	else this.p2=new ENEMY();
	*/
	this.field=new FIELD();
	this.field.makeField();
	screenControl.set(this.field.w,this.field.h);
}
INGAME.prototype.execute=function()
{
	var clickSignal=null;
	background(255);
	screenControl.setScreen();
//	console.log(screenControl);
	this.field.draw();
	if(inputBroadcast.isMousePress)
	{
		clickSignal=this.field.clickCheck();
		console.log(clickSignal);
		if(clickSignal!==null)
		{
			this.field.cells[clickSignal.index.row][clickSignal.index.col].who=1;
			if(this.imsi==null) this.imsi=clickSignal.index;
			else
			{
				var RES=hexCell_dist(this.imsi,clickSignal.index);
				console.log(RES);
				this.imsi=null;
			}
		}
	}
	this.layer2();
}
INGAME.prototype.motion=function()
{
}
INGAME.prototype.layer2=function()
{
	//f**king p5.js!
	//Why does not p5.js support clipping masks?
	var field=this.field;
	var cells=this.field.cells;
	noFill();
	stroke(_BLACK);
	beginShape();
	vertex(0,0);
	vertex(field.w,0);
	vertex(field.w,field.h);
	vertex(0,field.h);
	for(var i=0;i<field.Rows;i++)
	{
		for(var j=0;j<field.Columns;j++)
		{
			beginContour();
			roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r);
			endContour();
/*			if(detectCell(cells[i][j].kind)!=0)
			{
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r);
				endContour();
			}
			else
			{
				beginContour();
				roundedHexagonContour(cells[i][j].x,cells[i][j].y,cells[i][j].r-1.25);
				endContour();
				beginContour();
				roundedHexagonContour(cells[i][j].x,cells[i][j].y,cells[i][j].r+1.25);
				endContour();
			}*/
		}
	}
	endShape();
}
