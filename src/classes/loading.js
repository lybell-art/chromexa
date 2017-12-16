function LOADING()
{
	this.count=0;
	this.max=0;
}
LOADING.prototype.loadData()
{
	var i,j;
	var table, url;
	for(i=1;i<2;i++)
	{
		resource_map[i]=[];
		for(j=1;j<=6;j++)
		{
			resource_map[i][j]=new MAP_DATA();
			url="resource/"+i+"-"+j+".csv";
			table=loadTable(url, "csv", "header",
				function(res){
					resource_map[i][j].inputTable(res);
					this.count++;
			});
			this.max++;
		}
	}
}
LOADING.prototype.loadImage()
{
	background(0);
	fill(255);
	noStroke();
	rect(0,0,map(this.count,0,this.max,0,width),50);
	if(this.count==this.max) sceneNo=10;
}
