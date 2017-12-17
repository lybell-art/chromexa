/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.16
 * @version 0.1
 *
 */
function INGAME()
{
	/**
	 *
	 * @var {int} world		현재 레벨의 큰 스테이지 번호(0:멀티플레이)
	 * @var {int} stage		현재 레벨의 작은 스테이지 번호
	 * @var {FIELD} field		맵 필드
	 * @var {array|COORD} pLocation	플레이어와 적의 위치
	 * @var {OBJECT} P1area		플레이어/1p의 허브와 필러의 위치
	 * @var {OBJECT} P2area		적/2p의 허브와 필러의 위치
	 * @var {OBJECT} Nuarea		점령되지 않은 필러의 위치
	 * @var {PLAYER} p1		플레이어/1p
	 * @var {PLAYER/ENEMY} p2	적/2p
	 * @var {int} whosTurn		1p 턴:1, 2p 턴:2
	 * @var {int} turns		현재까지 경과된 턴수
	 * @var {int} currentP		선택된 캐릭터 (없을 시 -1)
	 * @var {int} moveCost		현재 플레이어의 이동 코스트
	 * @var {object} motionQueue	모션 broadcaster
	 *
	 */
	this.world=1, this.stage=1;
	this.field=null;
	this.pLocation=[];
	this.P1area={hub:null, filler:[]}, this.P2area={hub:null, filler:[]};
	this.Nuarea={filler:[]};
	this.p1=null, this.p2=null;
	this.whosTurn=1;
	this.turns=0;
	this.currentP=-1;
	this.moveCost=5;
	this.motionQueue=[];
}
//-------------------------------------------------------setting method---------------------------------------------------------------//
INGAME.prototype.setup=function()
{
	/**
	 * 맵을 불러오고 각종 변수를 초기화한다.
	 */
//	this.world=stream.StoG1;
//	this.stage=stream.StoG2;
	//map load
	this.world=1;
	this.stage=0;
	var mapData=resourceBox.map[this.world][this.stage].copy();
	this.field=new FIELD();
	this.field.makeField(mapData);
	//create players
	for(var i=0;i<this.field.Rows;i++)
	{
		this.pLocation[i]=[];
		for(var j=0;j<this.field.Columns;j++)
		{
			this.pLocation[i][j]=0;
			if(this.field.cells[i][j].kind==3)
			{
				if(this.field.cells[i][j].who==1) this.P1area.hub=new COORD(i,j);
				else  this.P2area.hub=new COORD(i,j);
			}
			else if(this.field.cells[i][j].kind==4)
			{
				if(this.field.cells[i][j].who==1) this.P1area.filler.push(new COORD(i,j));
				else if(this.field.cells[i][j].who==2)  this.P2area.filler.push(new COORD(i,j));
				else this.Nuarea.filler.push(new COORD(i,j));
			}
		}
	}
	this.p1=this.playerCreate();
	if(this.world==_MULTIPLAY) this.p2=this.playerCreate();
	else
	{
		this.p2=this.enemyCreate(mapData);
		for(var no=0;no<this.p2.length;no++)
		{
			this.p2[no].setPath(this,this.P1area.hub);
		}
	}
	//reset other properties
	this.motionQueue=[];
	this.whosTurn=1;
	this.turns=1;
	this.moveCost=3+this.P1area.filler.length*2;
	this.currentP=-1;
	screenControl.set(this.field.w,this.field.h);
	screenControl.setBound(0,min(width,height)/6.5,width,height-min(width,height)/6.5);
	sceneNo=11;
}
INGAME.prototype.playerCreate=function()
{
	/**
	 *
	 * 플레이어 배열을 생성한다.
	 *
	 * return {array|PLAYER}	플레이어 배열
	 *
	 */
	var res=[];
	for(var i=0;i<5;i++)
	{
		res.push(new PLAYER(i,i,0,i));
		this.pLocation[i][i]=i+1;
	}
	return res;
}
INGAME.prototype.enemyCreate=function(data)
{
	/**
	 *
	 * 적 배열을 생성한다.
	 *
	 * return {array|ENEMY}	적 배열
	 *
	 */
	var res=[];
	var count=0;
	for(var i=0;i<data.row;i++)
	{
		for(var j=0;j<data.column;j++)
		{
			if(data.enemy[i][j]!=null)
			{
				res.push(new ENEMY(i,j,data.enemy[i][j],count));
				this.pLocation[i][j]=-(count+1);
				count++;
			}
		}
	}
	return res;
}
//--------------------------------------------------------ingame method---------------------------------------------------------------//
INGAME.prototype.input=function()
{
	/**
	 * 플레이어의 입력을 받아 캐릭터 연산을 수행한다.
	 */
	var clickSignal;
	var cSel;
	var thisChara=null;
	clickSignal=this.field.clickCheck();
	if(clickSignal!==null)
	{
		if(clickSignal.signal==_BACK)	//뒤로가기 버튼 클릭 시
		{
			sceneNo=1;
			return false;
		}
		else if(clickSignal.signal==_SETTING)	//설정 버튼 클릭 시
		{
			popupNo=1;
			return false;
		}
		cSel=this.charaSelect(clickSignal.index);	//캐릭터를 클릭했는지를 파악함
		if(cSel!=-1) clickSignal.signal=_CHARA;
		console.log(clickSignal, this.pLocation, this.currentP);
		if(this.currentP==-1)	//캐릭터 선택이 안 된 상태일 때
		{
			if(clickSignal.signal==_CHARA)
			{
				if(this.whosTurn==1) thisChara=this.p1[cSel];
				else thisChara=this.p2[cSel];
				if(!thisChara.isStunned) this.currentP=cSel;
			}
//			else if(clickSignal.signal==_FILLER) this.filler();
		}
		else			//캐릭터 선택이 된 상태일 때
		{
			if(this.whosTurn==1) thisChara=this.p1[this.currentP];
			else thisChara=this.p2[this.currentP];
			if(hexCell_isLine(thisChara.coord,clickSignal.index)==-1)
			{
				clickSignal.signal=_NOMOVE;
			}
			else if(hexCell_dist(thisChara.coord,clickSignal.index)>this.moveCost)
			{
				clickSignal.signal=_NOMOVE;
			}
			console.log(clickSignal, thisChara);
			switch(clickSignal.signal)
			{
				case _CHARA:
				case _MOVEABLE:thisChara.move(this, clickSignal.index); break;
//				case _FILLAR:this.filler();
			}
			this.currentP=-1;
		}
	}
}
INGAME.prototype.inputInterface=function()
{
	/**
	 * 적(AI)의 턴일 시, 인터페이스 부분만 클릭할 수 있게 한다.
	 */
	var clickSignal;
	clickSignal=this.field.clickCheck();
	if(clickSignal!==null)
	{
		if(clickSignal.signal==_BACK)	//뒤로가기 버튼 클릭 시
		{
			sceneNo=1;
			return false;
		}
		else if(clickSignal.signal==_SETTING)	//설정 버튼 클릭 시
		{
			popupNo=1;
			return false;
		}
	}
}
INGAME.prototype.enemyAI=function()
{
	/**
	 * 적(AI)의 움직임을 제어한다.
	 */
	var chara;
	var moveSync=0;
	for(chara of this.p2)
	{
		chara.move(this);
	}
	this.syncMotion(0);
	moveSync=this.motionQueue.length;
	for(chara of this.p2)
	{
		chara.attack(this, chara.coord);
	}
	this.syncMotion(moveSync);
}
INGAME.prototype.interface=function()
{
	resetMatrix();
	UI.ingame_banner();
	UI.ingame_status(this.whosTurn,this.turns,this.moveCost);
}
INGAME.prototype.draw=function()
{
	/**
	 * 현재 장면을 화면에 출력한다.
	 */
	var chara;
	background(255);
	screenControl.setScreen();
	this.field.draw();
	for(chara of this.p1)
	{
		if(chara.isLive) chara.draw();
	}
	for(chara of this.p2)
	{
		if(chara.isLive) chara.draw();
	}
	this.interface();
}
INGAME.prototype.playerTurn=function()
{
	/**
	 * 플레이어의 턴
	 */
	if(inputBroadcast.isMousePress) this.input();
	this.draw();
	if(this.motionQueue.length>0) sceneNo++;
}
INGAME.prototype.enemyTurn=function()
{
	/**
	 * 적의 턴
	 */
	if(this.world==_MULTIPLAY) this.playerTurn();
	else
	{
		if(inputBroadcast.isMousePress) this.inputInterface();
		this.enemyAI();
		this.draw();
		console.log(this.motionQueue);
		if(this.motionQueue.length>0) sceneNo++;
	}
}
INGAME.prototype.charaSelect=function(coord)
{
	/**
	 *
	 * 클릭한 셀에 자신의 캐릭터가 있는지를 확인한다.
	 *
	 * param {COORD}	클릭한 셀
	 *
	 * return {array|ENEMY}	선택한 플레이어의 index No.(선택하지 않았을 시 -1)
	 *
	 */
	var buho;
	var res;
	if(this.whosTurn==1) buho=1;
	else buho=-1;
	res=this.pLocation[coord.row][coord.col];
	if(res*buho>0) return res*buho-1;
	else return -1;
}
//--------------------------------------------------------motion method---------------------------------------------------------------//
INGAME.prototype.motion=function()
{
	/**
	 * 모션 큐에 따라 캐릭터를 움직인다.
	 */
	var thisMotion=this.motionQueue[0];
	var who_;
	var i;
	var isPros=false;
	var threshMap;
	// 캐릭터의 모션을 제어한다.
	if(thisMotion.type=="attack") screenControl.setScreen();
	for(i=0;i<thisMotion.result.length;i++)
	{
		who_=thisMotion.result[i].who;
		if(thisMotion.type=="move") isPros=who_.moveMotion(thisMotion.result[i].newCoord);
		else if(thisMotion.type=="attack") isPros=who_.attackMotion();
	}
	// 실제 화면을 출력한다.
	if(thisMotion.type!="attack")
	{
		this.draw();
	}
	else
	{
		threshMap=thisMotion.result[0].thresh.slice();
		for(i=0;i<thisMotion.result.length;i++)
		{
			for(var r=0;r<threshMap.length;r++)
			{
				for(var c=0;c<threshMap[r].length;c++)
				{
					threshMap[r][c]=threshMap[r][c]||thisMotion.result[i].thresh[r][c];
				}
			}
		}
		this.layer2();
		this.layer3(threshMap);
		var chara;
		for(chara of this.p1)
		{
			if(chara.isLive) chara.draw();
		}
		for(chara of this.p2)
		{
			if(chara.isLive) chara.draw();
		}
		this.interface();
	}
	// 모션이 끝난 후, 캐릭터의 상태를 변경시키고 큐를 한 칸 뽑아낸다.
	if(!isPros)
	{
		this.motionEnd(thisMotion);
		this.motionQueue.shift();
		if(this.motionQueue.length==0) sceneNo--;
	}
}
INGAME.prototype.motionEnd=function(thisMotion)
{
	/**
	 *
	 * 모션이 끝난 후, 캐릭터의 상태를 변경시킨다.
	 *
	 * param {thisMotion}	현재 제어 중인 모션
	 *
	 */
	var i, who_;
	var r,c;
	var datum_=thisMotion.result.slice();
	var threshMap=datum_[0].thresh;
	for(i=0;i<datum_.length;i++)
	{
		who_=datum_[i].who;
		switch(thisMotion.type)
		{
			case "move":	//캐릭터의 위치와 배열상의 위치를 변경시킨다.
				who_.coord=datum_[i].newCoord.copy();
				this.pLocation[datum_[i].pCoord.row][datum_[i].pCoord.col]=0;
				this.pLocation[datum_[i].newCoord.row][datum_[i].newCoord.col]=(who_.arrNo+1)*(who_.who==1?1:-1);
				break;
			case "attack":	//최종적으로 칠해질 맵의 배열을 정한다.
				for(r=0;r<threshMap.length;r++)
				{
					for(c=0;c<threshMap[r].length;c++)
					{
						threshMap[r][c]=threshMap[r][c]||datum_[i].thresh[r][c];
					}
				}
				break;
			case "hit":	//플레이어의 CP 등을 변경시킨다.
				if(datum_[i].stat=="damage") who_.hit();
				else who_.heal();
				break;
		}
	}
	//공격 시 필드를 공격자의 색으로 채운다.
	if(thisMotion.type=="attack")
	{
		for(r=0;r<threshMap.length;r++)
		{
			for(c=0;c<threshMap[r].length;c++)
			{
				if(threshMap[r][c]) this.field.cells[r][c].who=this.whosTurn;
			}
		}
	}
}
INGAME.prototype.syncMotion=function(bar)
{
	var moveMotions=[];
	var attackMotions=[];
	var hitMotions=[];
	var sync=this.motionQueue.slice(0,bar);
	var temp, a;
	var arrayLink=function(_p,q)
	{
		for(var i=0;i<q.length;i++)
		{
			_p.push(q[i]);
		}
		return _p;
	}
	for(var i=bar;i<this.motionQueue.length;i++)
	{
		if(this.motionQueue[i].type=="move")
		{
			if(temp!=this.motionQueue[i].result[0].who) a=0;
			else a++;
			if(moveMotions.length<=a) moveMotions.push([]);
			arrayLink(moveMotions[a],this.motionQueue[i].result);
			temp=this.motionQueue[i].result[0].who;
		}
		else if(this.motionQueue[i].type=="attack") arrayLink(attackMotions, this.motionQueue[i].result);
		else if(this.motionQueue[i].type=="hit") arrayLink(hitMotions, this.motionQueue[i].result);
	}
	for(var p=0;p<moveMotions.length;p++)
	{
		sync.push({type:"move",result:moveMotions[p]});
	}
	if(hitMotions.length!=0) sync.push({type:"hit",result:hitMotions});
	if(attackMotions.length!=0) sync.push({type:"attack",result:attackMotions});
	this.motionQueue=sync;
}
INGAME.prototype.layer2=function()
{
	//f**king p5.js!
	//Why does not p5.js support clipping masks?
	var field=this.field;
	var cells=this.field.cells;
	fill(255);
	noStroke();
	beginShape();
	vertex(-900,-900);
	vertex(-900,field.h+900);
	vertex(field.w+900,field.h+900);
	vertex(field.w+900,-900);
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
			else if(cells[i][j].kind!=0)
			{
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r-1.25);
				endContour();
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r+1.25);
				endContour();
			}
		}
	}
	endShape();
}
INGAME.prototype.layer3=function(thresh)
{
	for(var i=0;i<this.field.Rows;i++)
	{
		for(var j=0;j<this.field.Columns;j++)
		{
			if(!thresh[i][j]) this.field.cells[i][j].draw();
			else this.field.cells[i][j].drawUpper();
		}
	}
}
