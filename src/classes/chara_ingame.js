function CHARACTER_INGAME()
{
	this.indexNo=0;
	this.arrNo=0;
	this.isLive=true;
	this.coord=null;
	this.x=0, y=0;
	this.who=0;
	this.sprite=function(x,y){};
	this.attackMap=[];
	this.attackRadius=0;
	this.frame=-1;
}
CHARACTER_INGAME.prototype.draw=function()
{
	this.sprite(this.x,this.y);
}
CHARACTER_INGAME.prototype.move=function(where, target)
{
	// 선언부
	var dir=hexCell_isLine(this.coord,target);
	var dist=hexCell_dist(this.coord,target);
	var cur=this.coord.copy();
	var isRotated=false;
	var trace=[];
	var map=where.field.cells;
	var ally, enemy, myBuho;
	if(where.whosTurn==1) 
	{
		ally=where.p1;
		enemy=where.p2;
		myBuho=1;
	}
	else
	{
		ally=where.p2;
		enemy=where.p1;
		myBuho=-1;
	}
	// 계산
	var i=0;
	while(!isRotated&&i<dist)
	{
		cur=hexCell_trans(cur,dir,1);
		trace.push(map[cur.row][cur.col]);
		if([0,5].indexOf(trace[i].kind)!=-1) return false;
		if(this.CP!=undefined)
		{
			if(this.CP==0&&where.pLocation[cur.row][cur.col]*myBuho<0)
			{
				if(isRotated) this.death();
				return false;
			}
		}
/*		<incomplete>
		if([6,7,8,9,10,11].indexOf(trace[i].kind)!=-1)
		{
			isRotated=true;
			dir=(trace[i]-6)%6;
		}
		*/
		if(isRotated&&[1,3,4].indexOf(trace[i].kind)!=-1) break;
		i++;
	}
	// 큐에 모션을 넣는다
	dist=i;
	where.pLocation[this.coord.row][this.coord.col]=0;
	for(i=0;i<dist;i++)
	{
//		this.coord=trace[i].index.copy();
//		this.x=this.coord.x();
//		this.y=this.coord.y();
		where.motionQueue.push({
			who:this,
			motion:[["move",trace[i].index]]
		});
		if(where.pLocation[trace[i].index.row][trace[i].index.col]*myBuho<0)
		{
			var tMap=this.attack(where.field,ally,enemy);
			where.motionQueue.push({
				who:this,
				motion:[["attack"]],
				thresh:tMap
			});
		}
	}
	where.pLocation[this.coord.row][this.coord.col]=(this.arrNo+1)*myBuho;
}
CHARACTER_INGAME.prototype.moveMotion=function(target)
{
	var O=createVector(this.coord.x(),this.coord.y());
	var T=createVector(target.x(),target.y());
	this.x=lerp(O.x,T.x,this.frame/15);
	this.y=lerp(O.y,T.y,this.frame/15);
	this.frame++;
	if(this.frame>=15)
	{
		this.frame=-1;
		return false;
	}
	else return true;
}
CHARACTER_INGAME.prototype.attack=function(map, otherPlayers, otherEnemys)
{
	var cells=map.cells;
	var myCoord=this.coord.copy();
	var i,j;
	var threshMap=[];
	for(i=0;i<map.Rows;i++)
	{
		threshMap[i]=[];
		for(j=0;j<map.Columns;j++)
		{
			threshMap[i][j]=false;
		}
	}
	const cCol=function(p){return myCoord.col-5+p};
	const cRow=function(p,q){return myCoord.row-5+p+((myCoord.col+1)%2)*(cCol(q)%2)};
	for(i=0;i<11;i++)
	{
		for(j=0;j<11;j++)
		{
			if(cRow(i,j)<0||cRow(i,j)>=map.Rows||cCol(j)<0||cCol(j)>=map.Columns) continue;
			if(this.attackMap[i][j]&&cells[cRow(i,j)][cCol(j)].who!=-1)
			{
				threshMap[cRow(i,j)][cCol(j)]=true;
				cells[cRow(i,j)][cCol(j)].who=this.who;
				this.attack_other(cRow(i,j),cCol(j),otherPlayers,otherEnemys);
			}
		}
	}
//	sceneNo++;
	return threshMap;
}
CHARACTER_INGAME.prototype.attack_other=function(i, j, otherPlayers, otherEnemys)
{
	var cur=new COORD(i,j);
	var other;
	for(other of otherPlayers)
	{
		if(other.isLive==false||other.arrNo==this.arrNo) continue;
		if(cur.isSame(other.coord)) other.heal();
	}
	for(other of otherEnemys)
	{
		if(other.isLive==false) continue;
		if(cur.isSame(other.coord)) other.hit();
	}
}
CHARACTER_INGAME.prototype.attackMotion=function()
{
	var r=this.frame*this.frame*10;
	ellipse(this.x,this.y,r,r);
	this.frame++;
	if(this.frame>=15)
	{
		this.frame=-1;
		return false;
	}
	else return true;
}
CHARACTER_INGAME.prototype.hit=function(){}
CHARACTER_INGAME.prototype.heal=function(){}
CHARACTER_INGAME.prototype.death=function()
{
	this.isLive=false;
	ingame.pLocation[this.coord.row][this.coord.col]=0;
}

function PLAYER(row, col, boxNo, arrNo)
{
	CHARACTER_INGAME.call(this);
	this.arrNo=arrNo;
	this.myChara=myCharacter[boxNo];
	this.indexNo=this.myChara.indexNo;
	this.maxCP=this.myChara.maxCP;
	this.CP=this.myChara.maxCP;
	this.coord=new COORD(row,col);
	this.x=this.coord.x();
	this.y=this.coord.y();
	this.who=1;
	this.isStunned=false;
	this.sprite=charaProto[this.indexNo].sprite;
	this.attackMap=charaProto[this.indexNo].attackMap.slice();
	this.attackRadius=charaProto[this.indexNo].attackRadius;
}
PLAYER.prototype=new CHARACTER_INGAME();
PLAYER.prototype.constructor=PLAYER;
PLAYER.prototype.attack=function(map, otherPlayers, otherEnemys)
{
	var res=[];
	for(var i=0;i<map.Rows;i++)
	{
		res[i]=[];
		for(var j=0;j<map.Columns;j++)
		{
			res[i][j]=false;
		}
	}
	if(this.isStunned) return res;
	if(this.CP>0)
	{
		res=CHARACTER_INGAME.prototype.attack.call(this, map, otherPlayers, otherEnemys);
		this.CP--;
	}
	return res;
}
PLAYER.prototype.hit=function()
{
	if(this.CP==0) this.death();
	else
	{
		this.CP--;
		this.isStunned=true;
	}
}
PLAYER.prototype.heal=function()
{
	if(this.CP<this.maxCP) this.CP++;
	this.isStunned=false;
}

function ENEMY(row, col, indexNo,arrNo)
{
	CHARACTER_INGAME.call(this);
	this.arrNo=arrNo;
	this.indexNo=indexNo;
	this.coord=new COORD(row,col);
	this.x=this.coord.x();
	this.y=this.coord.y();
	this.who=2;
	this.sprite=charaProto[indexNo].sprite;
	this.attackMap=charaProto[indexNo].attackMap.slice();
	this.attackRadius=charaProto[indexNo].attackRadius;
}
ENEMY.prototype=new CHARACTER_INGAME();
ENEMY.prototype.constructor=ENEMY;
ENEMY.prototype.hit=function()
{
	this.death();
}
