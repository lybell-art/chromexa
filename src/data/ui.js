const UI_draw={
	ingame_banner:function()
	{
		var base=min(width,height);
		var H=base/6.5;
		var R=H/5;
		noStroke();
		fill(_WHITE);
		rect(H/4,0,width-H*2/4,H);
		rect(width/2-H+R,H,2*H-2*R,H*2/3);
		rect(width/2-H,H,2*H,H*2/3-R);
		ellipse(width/2-(H-R),H*5/3,2*R,2*R);
		ellipse(width/2+(H-R),H*5/3,2*R,2*R);
		fill(_DARK_WHITE);
		ellipse(R,H-R,2*R,2*R);
		ellipse(width-R,H-R,2*R,2*R);
		rect(0,0,H,H-R);
		rect(R,0,H-R,H);
		rect(width-H,0,H,H-R);
		rect(width-H,0,H-R,H);
	}
	ingame_status:function()(
	{
		
	}
}
