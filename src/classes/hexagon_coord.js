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

function hexCell_trans(start, dir, dist)
{
	var res=new COORD(start.row, start.col);
	console.log(start, dir, dist, res);
	console.log(_HEX_UP);
	switch(dir)
	{
		case _HEX_UP:res.row-=dist; break;
		case _HEX_RIGHTUP:res.row-=int((dist+start.col%2)/2); res.col+=dist; break;
		case _HEX_RIGHTDOWN:res.row+=int((dist+(start.col+1)%2)/2); res.col+=dist; break;
		case _HEX_DOWN:res.row+=dist; break;
		case _HEX_LEFTDOWN:res.row+=int((dist+start.col%2)/2); res.col-=dist; break;
		case _HEX_LEFTUP:res.row-=int((dist+(start.col+1)%2)/2); res.col-=dist; break;
	}
	return res;
}

function hexCell_dist(start, end)
{
	var xdist=end.col-start.col;
	var bound1=-int((xdist+start.col%2)/2);
	var bound2=int((xdist+(start.col+1)%2)/2);
	if(xdist<0)
	{
		var temp=bound1;
		bound1=bound2;
		bound2=temp;
		xdist=-xdist;
	}
	if(xdist==0) return abs(end.row-start.row);
	else if(bound1-end.row>0) return xdist+bound1-end.row;
	else if(end.row-bound2>0) return xdist-bound2+end.row;
	else return xdist;
}

//비디오 엠피포
//코드
//프로젝트 기획서
