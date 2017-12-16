function LOADING()
{
	this.count=0;
	this.max=0;
}
LOADING.prototype.loadData=function()
{
	var i,j;
	var table, url;
	var callback;
	for(i=1;i<2;i++)
	{
		resourceBox.map[i]=[];
		for(j=1;j<=6;j++)
		{
			resourceBox.map[i][j]=new MAP_DATA();
			url="resource/"+i+"-"+j+".csv";
			callback=this.inputMapClosure(this,i,j);
			table=loadTable(url, "csv", "header", callback);
			this.max++;
		}
	}
}
LOADING.prototype.execute=function()
{
	background(0);
	fill(255);
	noStroke();
	rect(0,0,map(this.count,0,this.max,0,width),50);
	if(this.count==this.max) sceneNo=10;
}
LOADING.prototype.inputMapClosure=function(a,i,j)
{
	return function(table)
	{
		a.inputMap(table,resourceBox.map[i][j]);
	};
}
LOADING.prototype.inputMap=function(table, box)
{
	box.row=table.getRowCount();
	box.column=table.getColumnCount();
	var s="";
	for(var i=0;i<box.row;i++)
	{
		box.kind[i]=[];
		box.who[i]=[];
		box.enemy[i]=[];
		for(var j=0;j<box.column;j++)
		{
			s=split(table.getString(i,j),"|");
			box.kind[i][j]=int(s[0]);
			box.who[i][j]=int(s[1]);
			if(s[2]=="null") box.enemy[i][j]=null;
			else box.enemy[i][j]=int(s[2]);
		}
	}
	this.count++;
}
