function CHARACTER_INGAME()
{
	var indexNo=0;
	var arrNo=0;
	var isLive=true;
	var coord=null;
	var x=0, y=0;
	var who=0;
	var sprite=function(x,y){};
	var attackMap=[];
	var attackRadius=0;
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
		console.log(cur, trace[i])
		if([0,5].indexOf(trace[i].kind)!=-1) return false;
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
		this.coord=trace[i].index.copy();
		this.x=this.coord.x();
		this.y=this.coord.y();
/*		where.motionQueue.push({
			who:this,
			motion:[function(){return this.moveMotion(trace[i])}]
		});*/
		if(where.pLocation[trace[i].index.row][trace[i].index.col]*myBuho<0)
		{
			console.log(where.field);
			this.attack(where.field,ally,enemy);
/*			where.motionQueue.push({
				who:this,
				motion:[function(){return this.attackMotion(trace[i])}]
			});*/
		}
	}
	where.pLocation[this.coord.row][this.coord.col]=(this.arrNo+1)*myBuho;
	
}
CHARACTER_INGAME.prototype.moveMotion=function(target)
{
}
CHARACTER_INGAME.prototype.attack=function(map, otherPlayers, otherEnemys)
{
	var cells=map.cells;
	var myCoord=this.coord.copy();
	const cRow=function(i){return myCoord.row-5+i};
	const cCol=function(i){return myCoord.col-5+i};
	for(var i=0;i<11;i++)
	{
		for(var j=0;j<11;j++)
		{
			console.log(cRow(i), cCol(j), cells[cRow(i)+j%2][cCol(j)]);
			if(cRow(i)+j%2<0||cRow(i)+j%2>=map.row||cCol(i)<0||cCol(i)>=map.col) continue;
			console.log("dimi");
/*			if(this.attackMap[i][j]&&cells[cRow(i)+j%2][cCol(j)].who!=-1)
			{
				cells[cRow(i)][cCol(j)].who=this.who;
				this.attack_other(cRow(i),cCol(j),otherPlayers,otherEnemys);
			}*/
		}
	}
//	sceneNo++;
	return {x:this.x, y:this.y};
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
CHARACTER_INGAME.prototype.hit=function(){}
CHARACTER_INGAME.prototype.heal=function(){}

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
	this.sprite=charaProto[this.indexNo].sprite;
	this.attackMap=charaProto[this.indexNo].attackMap.slice();
	this.attackRadius=charaProto[this.indexNo].attackRadius;
}
PLAYER.prototype=new CHARACTER_INGAME();
PLAYER.prototype.constructor=PLAYER;
PLAYER.prototype.attack=function(map, otherPlayers, otherEnemys)
{
	if(this.CP>0)
	{
		CHARACTER_INGAME.prototype.attack.call(this, map, otherPlayers, otherEnemys);
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
	this.isLive=false;
}
