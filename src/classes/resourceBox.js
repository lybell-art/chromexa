function RESOURCE_BOX()
{
	this.map=[];
	this.cellImage=null;
	this.cellPlus=[];
}
RESOURCE_BOX.prototype.loadMap=function()
{
}
RESOURCE_BOX.prototype.loadImage=function()
{
	this.cellImage=loadSVG('resource/cell.svg');
}

function MAP_DATA()
{
	this.row=0;
	this.column=0;
	this.kind=[];
	this.who=[];
	this.enemy=[];
}
MAP_DATA.prototype.copy=function()
{
	var newObj=new MAP_DATA();
	newObj.row=this.row;
	newObj.column=this.column;
	for(var i=0;i<this.row;i++)
	{
		newObj.kind[i]=[];
		newObj.who[i]=[];
		newObj.enemy[i]=[];
		for(var j=0;j<this.column;j++)
		{
			newObj.kind[i][j]=this.kind[i][j];
			newObj.who[i][j]=this.who[i][j];
			newObj.enemy[i][j]=this.enemy[i][j];
		}
	}
	return newObj;
}
