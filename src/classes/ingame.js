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
	 * @var {PLAYER} p1		플레이어/1p
	 * @var {PLAYER/ENEMY} p2	적/2p
	 * @var {int} whosTurn		1p 턴:1, 2p 턴:2
	 * @var {int} currentP		선택된 캐릭터 (없을 시 -1)
	 * @var {int} moveCost		현재 플레이어의 이동 코스트
	 * @var {object} motionQueue	모션 broadcaster
	 *
	 */
	this.world=1, this.stage=1;
	this.field=null;
	this.pLocation=[];
	this.p1=null, this.p2=null;
	this.whosTurn=1;
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
		}
	}
	this.p1=this.playerCreate();
	if(this.world==_MULTIPLAY) this.p2=this.playerCreate();
	else this.p2=this.enemyCreate(mapData);
	//reset other properties
	this.motionQueue=[];
	this.whosTurn=1;
	this.currentP=-1;
	screenControl.set(this.field.w,this.field.h);
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
//	this.interface.draw();
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
		if(inputBroadcast.isMousePress) this.inputEnemy();
		this.enemyAI();
		this.draw();
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
	console.log(this.motionQueue);
	var who=this.motionQueue[0].who;
	var func=this.motionQueue[0].motion;
	var motino;
	var thresh=this.motionQueue[0].thresh;
	var i;
	var isPros;
	for(i=0;i<func.length;i++)
	{
		if(func[i][0]=="move") isPros=who.moveMotion(func[i][1]);
		else if(func[i][0]=="attack") isPros=who.attackMotion();
	}
	if(thresh==undefined)
	{
		this.draw();
	}
	else
	{
		this.layer2();
		this.layer3(thresh);
	}
	console.log(isPros);
	if(!isPros)
	{
		if(this.motionQueue.length==0) sceneNo--;
		else this.motionQueue.shift();
	}
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
			if(!thresh) this.field.cells[i][j].draw();
		}
	}
}
