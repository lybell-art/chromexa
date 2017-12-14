/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.13
 * @version 0.02
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
			for(var ii=0;ii<6;ii++)
			{
				for(var jj=0;jj<4;jj++)
				{
					var p=hexCell_trans(clickSignal.index,ii,jj);
					this.field.cells[p.row][p.col].who=1;
				}
			}
		}
	}
}
