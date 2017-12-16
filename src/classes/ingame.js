/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.14
 * @version 0.07
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
	this.whosTurn=1;
	this.chaSel=false;
	this.currentP=-1;
	this.moveCost=3;
	this.motionQueue=[];
}
INGAME.prototype.setup=function()
{
//	this.world=stream.StoG1;
//	this.stage=stream.StoG2;
	this.world=1;
	this.stage=4;
	var mapData=resourceBox.map[this.world][this.stage].copy();
	this.field=new FIELD();
	this.field.makeField(mapData);
	screenControl.set(this.field.w,this.field.h);
	this.p1=this.playerCreate();
	if(this.world==_MULTIPLAY) this.p2=this.playerCreate();
	else this.p2=this.enemyCreate(mapData);
	this.chaSel=false;
	this.motionQueue=[];
	this.whosTurn=1;
	sceneNo=11;
}
INGAME.prototype.playerCreate=function()
{
	var res=[];
	for(var i=0;i<5;i++)
	{
		res.push(new PLAYER(i,i,0,i));
	}
	return res;
}
INGAME.prototype.enemyCreate=function(data)
{
	var res=[];
	var count=0;
	for(var i=0;i<data.row;i++)
	{
		for(var j=0;j<data.column;j++)
		{
			if(data.enemy[i][j]!=null)
			{
				res.push(new ENEMY(i,j,data.enemy[i][j],count));
				count++;
			}
		}
	}
	return res;
}
INGAME.prototype.input=function()
{
	var clickSignal;
	var cSel;
	clickSignal=this.field.clickCheck();
	console.log(clickSignal);
	if(clickSignal!==null)
	{
		if(clickSignal.signal==_BACK)
		{
			sceneNo=1;
			return;
		}
		else if(clickSignal.signal==_SETTING)
		{
			popupNo=1;
			return;
		}
		cSel=this.charaSelect(clickSignal.index);
		if(cSel!=-1) clickSignal.signal=_CHARA;
		if(!this.chaSel)
		{
			this.currentP=cSel;
			if(clickSignal.signal==_CHARA) this.chaSel=true;
//			else if(clickSignal.signal==_FILLER) this.filler();
		}
		else
		{
			if(hexCell_isLine(this.p1[this.currentP].coord,clickSignal.index)==-1)
			{
				clickSignal.signal=_NOMOVE;
			}
			else if(hexCell_dist(this.p1[this.currentP].coord,clickSignal.index)>this.moveCost)
			{
				clickSignal.signal=_NOMOVE;
			}
/*			switch(clickSignal.signal)
			{
				case _CHARA:
				case _MOVEABLE:this.p1[this.currentP].move(clickSignal.index); break;
				case _FILLAR:this.filler();
			}*/
			this.currentP=-1;
			this.chaSel=false;
		}
		console.log(typeof(this.currentP));
		console.log(clickSignal, this.chaSel, this.currentP);
	}
}
INGAME.prototype.draw=function()
{
	var chara;
	background(255);
	screenControl.setScreen();
	this.field.draw();
	for(chara of this.p1)
	{
		chara.draw();
	}
	for(chara of this.p2)
	{
		chara.draw();
	}
//	this.interface.draw();
}
INGAME.prototype.execute=function()
{
	if(inputBroadcast.isMousePress) this.input();
	this.draw();
}
INGAME.prototype.charaSelect=function(coord)
{
	var charas;
	if(this.whosTurn==1) charas=this.p1;
	else charas=this.p2;
	for(var i=0;i<charas.length;i++)
	{
		if(coord.isSame(charas[i].coord)) return i;
	}
	return -1;
}
INGAME.prototype.motion=function()
{
/*	pseudo-code
	if(attack)
	{
		this.player.attackMotion();
		this.layer2();
		this.layer3();
	}
	else
	{
		this.field.draw();
		this.player.moveMotion();
	}
	this.interfaceDraw();*/
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
