/**
 *
 * 육각형 셀 클래스
 * 
 * @author steliviere
 * @date 2017.12.16
 * @version 0.4
 *
 */
function CELL(i,j,kind,who)
{
	/**
	 *
	 * @var {COORD} index	각 셀의 인덱스 no.
 	 * @var {float} x	셀 중심의 x좌표
	 * @var {float} y	셀 중심의 y좌표
	 * @var {float} r	셀의 반지름
	 * @var {int} kind	셀의 타입
				0:빈 공간
				1:이동 가능 셀
				2:이동 불가 셀
				3:베이스
				4:서브베이스
				5:벽
	 * @var {int} who	셀의 진영
				1:플레이어/1P
				2:상대/2P
				0:중립
				-1:칠할 수 없음
	 *
	 */
	this.index=new COORD(i,j);
	this.x=this.index.x();
	this.y=this.index.y();
	this.kind=kind;
	this.who=who;
	this.r=30;
	if(this.kind==3) this.r=40;
}
/**
 *
 * 각 셀들을 스크린에 그리는 함수
 *
 */
CELL.prototype.draw=function()
{
	var col;
	var isMoveable;
	switch(this.who)
	{
		case 1:col=_BLUE; break;
		case 2:col=_RED; break;
		case 0:col=_WHITE; break;
		default:col=_DARK_WHITE;
	}
	isMoveable=detectCell(this.kind)!=0;
	if(isMoveable)
	{
		fill(col);
		noStroke();
	}
	else if(this.kind==0)
	{
		fill(255);
		noStroke();
	}
	else
	{
		strokeWeight(2.5);
		fill(255);
		stroke(col);
	}
	roundedHexagon(this.x,this.y,this.r);
}
/**
 *
 * 셀 위에 마우스가 올려져 있는지 체크하는 함수
 *
 * @return {boolean}	셀 위에 마우스가 올려져 있는지 여부
 *
 */
CELL.prototype.isMouseOn=function()
{
	var mouse=screenControl.relativeMouse();
	var mousePos=createVector(this.x,this.y);
	mousePos.sub(mouse);
	var edge=createVector(this.r,0);
	var theta=0;
	for(var i=0;i<6;i++)
	{
		var v1=p5.Vector.sub(edge,mousePos);
		edge.rotate(PI/3);
		var v2=p5.Vector.sub(edge,mousePos);
		theta+=v1.angleBetween(v2);
	}
	return abs(theta-TWO_PI)<0.00001;
}
/**
 *
 * 셀을 클릭했을 때 메인 함수에 자신의 인덱스 no와 셀의 유형을 보낸다.
 *
 * @return {object}	메인 함수에 전달할 값들
 			index:자신의 인덱스 no.
			signal:버튼 종류(0:움직일 수 없는 셀, 1:움직일 수 있는 셀, 2:필러)
 *
 */
CELL.prototype.mouseClick=function()
{
	var code;
	code=detectCell(this.kind);
	return {index:this.index, signal:code};
}
