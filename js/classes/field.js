/**
 *
 * 필드 클래스
 * 
 * @author steliviere
 * @date 2017.12.13
 * @version 0.1
 *
 */
function FIELD()
{
  /**
   *
   * @var {int} row		필드의 행(가로줄)의 수
   * @var {int} column		필드의 열(세로줄)의 수
   * @var {float} w		필드의 가로 길이
   * @var {float} h		필드의 세로 길이
   * @var {object|CELL} cells	셀 오브젝트
   *
   */
	this.row=0;
	this.column=0;
	this.w=0;
	this.h=0;
	this.cells=[];
}
/**
 *
 * 맵의 데이터를 불러와 필드를 생성
 *
 * @param {object|MAP_DATA} mapData	resourceBox 클래스에 저장된 맵의 데이터
 *
 */
FIELD.prototype.makeField=function()
{
	/* 미구현
	var mapData_kind=mapData.kind;
	var mapData_who=mapData.who;
	this.row=mapData.row;
	this.column=mapData.column;
	*/
	this.row=10;
	this.column=10;
	this.w=45*(1.5*this.column-0.5);
	this.h=45*cos(PI/6)*(2*this.row+1);
	for(var i=0;i<this.row;i++)
	{
		cells[i]=[];
		for(var j=0;j<this.column;j++)
		{
	//		cells[i][j]=new CELL(i,j,mapData_kind[i][j],mapData_who[i][j]);
			cells[i][j]=new CELL(i,j,1,0);
		}
	}
}
/**
 *
 * 필드를 화면에 출력
 *
 */
FIELD.prototype.draw=function()
{
	for(var i=0;i<this.row;i++)
	{
		for(var j=0;j<this.column;j++)
		{
			cells[i][j].draw();
		}
	}
}
/**
 *
 * 각 셀마다 클릭 여부를 체크, 클릭한 셀의 인덱스 no와 셀의 유형을 리턴한다.
 *
 * @return {object}	메인 함수에 전달할 값들
 			index:자신의 인덱스 no.
			signal:버튼 종류(0:움직일 수 없는 셀, 1:움직일 수 있는 셀, 2:필러)
 *
 */
FIELD.prototype.clickCheck=function()
{
	for(var i=0;i<this.row;i++)
	{
		for(var j=0;j<this.column;j++)
		{
			if(cells[i][j].isMouseOn())
			{
				return cells[i][j].mouseClick();
			}
		}
	}
}
