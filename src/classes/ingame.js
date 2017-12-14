/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.14
 * @version 0.05
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
	this.chaSel=false;
	this.currentP=-1;
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
	this.chaSel=false;
	screenControl.set(this.field.w,this.field.h);
}
INGAME.prototype.execute=function()
{
	var clickSignal=null;
	var cSel;
	background(255);
	screenControl.setScreen();
//	console.log(screenControl);
	this.field.draw();
	if(inputBroadcast.isMousePress)
	{
		clickSignal=this.field.clickCheck();
		console.log(clickSignal);
		/*
		if(clickSignal!==null)
		{
			cSel=this.charaSelect(clickSignal.index);
			if(cSel!=-1) clickSignal.signal=_CHARA;
			if(!this.chaSel)
			{
				this.currentP=cSel;
				if(clickSignal.signal==_CHARA) this.chaSel=true;
				else if(clickSignal.signal==_FILLER) this.filler();
			}
			else
			{
				if(!hexCell_isLine(this.p1[this.currentP].pos,clickSignal.index)) clickSignal.signal=_NO_MOVE;
				switch(clickSignal.signal)
				{
					case _CHARA:
					case _MOVEABLE:this.p1[this.currentP].move(clickSignal.index); break;
					case _FILLAR:this.filler();
				}
				this.chaSel=false;
			}
		}
		*/
	}
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
	fill(_BLACK);
	noStroke();
	beginShape();
	vertex(0,0);
	vertex(0,field.h);
	vertex(field.w,field.h);
	vertex(field.w,0);
	for(var i=0;i<field.Rows;i++)
	{
		for(var j=0;j<field.Columns;j++)
		{
//			beginContour();
//			roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r);
//			endContour();
			if(detectCell(cells[i][j].kind)!=0)
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
			}
		}
	}
	endShape();
}
