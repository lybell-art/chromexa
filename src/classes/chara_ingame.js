function CHARACTER_INGAME()
{
	var indexNo=0;
	var isLive=true;
	var coord=null;
	var x=0;
	var y=0;
	var who=0;
	var sprite=null;
	var attackMap=[];
	var attackRadius=0;
}
CHARACTER_INGAME.prototype.move=function(){}
CHARACTER_INGAME.prototype.draw=function()
{
	this.sprite(this.x,this.y);
}
CHARACTER_INGAME.prototype.attack=function(cells, otherPlayers, otherEnemys)
{
	const cRow=function(i){return this.coord.row-5+i};
	const cCol=function(i){return this.coord.col-5+i};
	for(var i=0;i<11;i++)
	{
		for(var j=0;j<11;j++)
		{
			if(this.attackMap[i][j]&&cells[cRow(i)][cCol(j)].who!=-1)
			{
				cells[cRow(i)][cCol(j)].who=this.who;
				this.attack_other(cRow(i),cCol(j),otherPlayers,otherEnemys);
			}
		}
	}
	sceneNo++;
	return {x:this.x, y:this.y};
}
CHARACTER_INGAME.prototype.attack_other=function(i, j, otherPlayers, otherEnemys)
{
	var cur=new COORD(i,j);
	var other;
	for(other in otherPlayers)
	{
		if(cur.same(other.coord)) other.heal();
	}
	for(other in otherEnemys)
	{
		if(cur.same(other.coord)) other.hit();
	}
}
CHARACTER_INGAME.prototype.hit=function(){}
CHARACTER_INGAME.prototype.heal=function(){}

function PLAYER(row, col, boxNo)
{
	CHARACTER_INGAME.call(this);
	this.myChara=myCharacter[boxNo];
	this.indexNo=this.myChara.indexNo;
	this.maxCP=this.myChara.maxCP;
	this.CP=this.myChara.maxCP;
	this.coord=new COORD(row,col);
	this.x=45*(1.5*col+1);
	this.y=45*cos(PI/6)*(2*row+2-col%2);
	this.who=1;
	this.sprite=charaProto[this.indexNo].sprite;
	this.attackMap=charaProto[this.indexNo].attackMap.slice();
	this.attackRadius=charaProto[this.indexNo].attackRadius;
}
PLAYER.prototype=new CHARACTER_INGAME();
PLAYER.prototype.constructor=PLAYER;
PLAYER.prototype.attack=function()
{
	if(this.CP>0)
	{
		CHARACTER_INGAME.prototype.attack.call(this);
		this.CP--;
	}
}
PLAYER.prototype.hit=function()
{
	if(this.CP==0) this.isLive=false;
	else this.CP--;
}
PLAYER.prototype.heal=function()
{
	if(this.CP<this.maxCP) this.CP++;
}

function ENEMY(row, col, indexNo)
{
	CHARACTER_INGAME.call(this);
	this.indexNo=indexNo;
	this.coord=new COORD(row,col);
	this.x=45*(1.5*col+1);
	this.y=45*cos(PI/6)*(2*row+2-col%2);
	this.who=2;
	this.sprite=charaProto[indexNo].draw;
	this.attackMap=charaProto[indexNo].attackMap.slice();
	this.attackRadius=charaProto[indexNo].attackRadius;
}
ENEMY.prototype=new CHARACTER_INGAME();
ENEMY.prototype.constructor=ENEMY;
ENEMY.prototype.hit=function()
{
	this.isLive=false;
}
