/**
 *
 * 육각형 셀의 인덱싱과 연산을 제어한다.
 * 
 * @author steliviere
 * @date 2017.12.14
 * @version 1.0
 *
 */


/**
 *
 * 육각형 셀의 인덱스 no.
 * 
 * @var {int} row	행(가로줄) no.
 * @var {int} col	열(세로줄) no.
 *
 */
function COORD(i,j)
{
	this.row=i;
	this.col=j;
}
function COORD.prototype.isSame(other)
{
	return (this.row==other.row&&this.col==other.col);
}

/**
 *
 * 육각형 배열에서 방향에 따라 거리만큼 이동시킨 값을 반환한다.
 *
 * @param {COORD} start	기준점의 인덱스 no.
 * @param {int} dir	움직일 방향
 * @param {int} dist	움직일 거리
 *
 * @return {COORD}	이동 후의 인덱스 no.
 *
 */
function hexCell_trans(start, dir, dist)
{
	var res=new COORD(start.row, start.col);
	switch(dir)
	{
		case _HEX_UP:res.row-=dist; break;
		case _HEX_RIGHTUP:res.row-=int((dist+start.col%2)/2); res.col+=dist; break;
		case _HEX_RIGHTDOWN:res.row+=int((dist+(start.col+1)%2)/2); res.col+=dist; break;
		case _HEX_DOWN:res.row+=dist; break;
		case _HEX_LEFTDOWN:res.row+=int((dist+(start.col+1)%2)/2); res.col-=dist; break;
		case _HEX_LEFTUP:res.row-=int((dist+start.col%2)/2); res.col-=dist; break;
	}
	return res;
}

/**
 *
 * 서로 다른 셀간의 최소 거리를 구한다.
 *
 * @param {COORD} start	구할 셀 1
 * @param {COORD} end	구할 셀 2
 *
 * @return {int}	셀 간의 거리
 *
 */
function hexCell_dist(start, end)
{
	var xdist=abs(end.col-start.col);
	var bound1=start.row-int((xdist+start.col%2)/2);
	var bound2=start.row+int((xdist+(start.col+1)%2)/2);
	if(xdist==0) return abs(end.row-start.row);
	else if(bound1-end.row>0) return xdist+bound1-end.row;
	else if(end.row-bound2>0) return xdist-bound2+end.row;
	else return xdist;
}

//비디오 엠피포
//코드
//프로젝트 기획서
