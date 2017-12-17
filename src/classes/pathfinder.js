function PATHFINDER()
{
	this.goal=null;
}
PATHFINDER.prototype.find=function(where, start, goal)
{
	this.goal=goal;
	var open=new BinaryHeap(function(x){return x.f;});
	var close=[];
	var current, child;
	var values;
	var res=[];
	open.push({pos:start, g:0, f:0, parent:null});
	while(open.size()>0)
	{
		current=open.pop();
		if(goal.isSame(current.pos))
		{
			res=this.setPath(current);
			return res;
		}
		close.push(current);
		if(close.indexOf(current)) continue;
		for(var i=0;i<6;i++)
		{
			child=this.childCur_detect(where, current, i);
			if(child==null) continue;
			if(this.isChildInClosed(child,close)) continue;
			else
			{
				values=this.setValue(current,child);
				open.push({pos:child.pos, g:values.g, f:values.f, parent:current});
			}
		}
	}
	return [];
}
PATHFINDER.prototype.childCur_detect=function(where, current, dir)
{
	var childCur;
	var thisCellStatus;
	for(var j=1;j<4;j++)
	{
		childCur=hexCell_trans(current.pos,dir,j);
		thisCellStatus=where.field.cells[childCur.row][childCur.col].kind;
		if([0,5].indexOf(thisCellStatus)!=-1) return null;
		else if([1,3,4].indexOf(thisCellStatus)!=-1) break;
	}
	if(j==4) return null;
	else return {pos:childCur, cost:j};
}

PATHFINDER.prototype.isChildInClosed=function(child, close)
{
	for(var i=0;i<close.length;i++)
	{
		if(close[i].pos.isSame(child.pos)) return true;
	}
	return false;
}

PATHFINDER.prototype.setValue=function(current, child)
{
	var G, H, F;
	G=current.g+child.cost;
	H=hexCell_dist(child.pos, this.goal);
	F=G+H;
	return {g:G, f:F};
}

PATHFINDER.prototype.setPath=function(node)
{
	var path=[node.pos];
	var res;
	if(node.parent==null) return path;
	res=path.concat(setPath(node.parent));
	return res;
}
