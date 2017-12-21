<script src="src/classes/cell.js"></script>
<script src="src/classes/field.js"></script>
<script src="src/classes/my_chara.js"></script>
<script src="src/classes/chara_ingame.js"></script>
<script src="src/classes/loading.js"></script>
<script src="src/classes/intro.js"></script>
<script src="src/classes/selection.js"></script>
<script src="src/classes/ingame.js"></script>
<script src="src/main.js"></script>

//color constant
const _RED="#f96e64";
const _BLUE="#2196f3";
const _ORANGE="#ffa766";
const _YELLOW="#ffe966";
const _GREEN="#52dd69";
const _PURPLE="#cc66ff";
const _WHITE="#ecf0f1";
const _DARK_WHITE="#bdc3c7";
const _BLACK="#262626";

//ingame signal constant
const _BACK=-1;
const _SETTING=-2;
const _NOMOVE=0;
const _MOVEABLE=1;
const _FILLER=2;
const _CHARA=3;

//cell direction constant
const _HEX_UP=0;
const _HEX_RIGHTUP=1;
const _HEX_RIGHTDOWN=2;
const _HEX_DOWN=3;
const _HEX_LEFTDOWN=4;
const _HEX_LEFTUP=5;

//single_multy constant
const _MULTIPLAY=0;

const charaProto=
{
/*	{
		indexNo:"template",
		CPbase:3,
		attackMap:
		[
			[0,0,0,0,5,5,5,0,0,0,0],
			[0,0,5,5,4,4,4,5,5,0,0],
			[5,5,4,4,3,3,3,4,4,5,5],
			[5,4,3,3,2,2,2,3,3,4,5],
			[5,4,3,2,1,1,1,2,3,4,5],
			[5,4,3,2,1,0,1,2,3,4,5],
			[5,4,3,2,2,1,2,2,3,4,5],
			[5,4,4,3,3,2,3,3,4,4,0],
			[0,5,5,4,4,3,4,4,5,5,0],
			[0,0,0,5,5,4,5,5,0,0,0],
			[0,0,0,0,0,5,0,0,0,0,0]
		],
		sprite:function(x,y)
		{
			ellipse(x,y,40,40);
		},
		evolve:[1,2,3],
		evolveLV:36,
		evolveHidden:null,
	},*/
	player_base:function(x,y, colA, colA2, colB, colD)
	{
		fill(colA); noStroke();	ellipse(x,y,40,40);
		fill(colA2);
		var r=20*cos(radians(35))/cos(radians(15));
		var arcY=20*(sin(radians(35))+cos(radians(35))*tan(radians(15)));
		arc(x,y,40,40,radians(-145),radians(-35),PIE);
		arc(x,y-arcY,r*2,r*2,radians(15),radians(165),CHORD);
		fill(colB);
		arc(x,y,40,40,radians(25),radians(155),CHORD);
		fill(colD);
		for(var i=0;i<4;i++)
		{
			rect(x-7+4*i,y+5,2,2);
		}
	},
	custom_armor:function(x,y,colA,colB,colB2,args)
	{
		var i;
		var max=args.length/2;
		if(args.length!=0)
		{
			fill(colA);
			beginShape();
			vertex(x+20*cos(radians(25)),y+20*sin(radians(25)));
			vertex(x+0,y+7);
			vertex(x-20*cos(radians(25)),y+20*sin(radians(25)));
			for(i=0;i<max;i++)
			{
				vertex(x+args[i*2],y+args[i*2+1]);
			}
			endShape(CLOSE);
		}
		noFill(); 
		stroke(colB2);	strokeWeight(1);
		ellipse(x,y,35,35);
		if(args.length!=0)
		{
			fill(colB); noStroke();
			beginShape();
			vertex(x+20*cos(radians(25)),y+20*sin(radians(25)));
			for(i=0;i<max;i++)
			{
				vertex(x+args[i*2],y+args[i*2+1]);
			}
			vertex(x-20*cos(radians(25)),y+20*sin(radians(25)));
			vertex(x-9,y+17);
			vertex(x+0,y+19);
			vertex(x+9,y+17);
			endShape();
		}
	},
	1:{
		indexNo:1,
		CPbase:7,
		attackMap:
		[
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,0,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0]
		],
		attackRadius:2,
		sprite:function(x,y)
		{
			var bodyColor="#f0deb4", bodyColor2="#ead1a4";
			var armorColor="#8fc082", armorColor2="#bffcae";
			var gemColor="#fbe9e5";
			var mouthColor="#3a3a3a";
			charaProto.player_base(x,y,bodyColor,bodyColor2,armorColor,mouthColor);
			charaProto.custom_armor(x,y,bodyColor,armorColor,armorColor2,[0,11.5]);
			fill(gemColor); noStroke();
			ellipse(x+0,y-15,24,28);
		},
		evolve:[2],
		evolveLV:15,
		evolveHidden:null,
	},
	2:{
		indexNo:2,
		CPbase:5,
		attackMap:
		[
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,1,0,0],
			[0,0,1,1,1,1,1,1,1,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0]
		],
		attackRadius:3,
		sprite:function(x,y)
		{
			var bodyColor="#3a3a3a", bodyColor2="#212121";
			var armorColor="#1abc9c", armorColor2="#5ef7da";
			charaProto.player_base(x,y,bodyColor,bodyColor2,armorColor,armorColor);
			charaProto.custom_armor(x,y,bodyColor,armorColor,armorColor2,[0,11.5]);
			fill(armorColor); noStroke();
			beginShape();
			vertex(x-6,y-30);
			vertex(x+6,y-30);
			vertex(x+11,y-17);
			vertex(x+6,y-4);
			vertex(x-6,y-4);
			vertex(x-11,y-17);
			endShape();
			fill(armorColor2);
			beginShape();
			vertex(x-3,y-24);
			vertex(x+3,y-24);
			vertex(x+6,y-17);
			vertex(x+3,y-10);
			vertex(x-3,y-10);
			vertex(x-6,y-17);
			endShape();
		},
		evolve:[2],
		evolveLV:36,
		evolveHidden:null,
	},
	3:{
		indexNo:3,
		CPbase:3,
		attackMap:
		[
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,0,0],
			[0,1,1,1,1,1,1,1,1,1,0],
			[0,1,1,1,1,1,1,1,1,1,0],
			[0,1,1,1,1,1,1,1,1,1,0],
			[0,1,1,1,1,1,1,1,1,1,0],
			[0,1,1,1,1,1,1,1,1,1,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0]
		],
		sprite:function(x,y)
		{
			var bodyColor="#3a3a3a", bodyColor2="#212121";
			var armorColor="#9b59b6", armorColor2="#d08eef";
			var gemColor="#ffcd02", gemColor2="#ffe681";
			charaProto.player_base(x,y,bodyColor,bodyColor2,armorColor,armorColor);
			charaProto.custom_armor(x,y,bodyColor,armorColor,armorColor2,[]);
			fill(gemColor); noStroke();
			star(x+0,y-15,15,8);
			fill(gemColor2);
			star(x+0,y-15,6,3.2);
		},
		attackRadius:4,
		evolve:[],
		evolveLV:100,
		evolveHidden:null,
	},
	1001:{
		indexNo:1001,
		attackMap:
		[
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,0,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,1,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0]
		],
		attackRadius:2,
		sprite:function(x,y)
		{
			var bodyColor="#3a3a3a", bodyColor2="#262626";
			var eyeColor="#e74c3c";
			var mouthColor="#ecf0f1";
			fill(bodyColor); noStroke();
			ellipse(x,y,40,40);
			for(var i=-1;i<2;i+=2)
			{
				beginShape();
				vertex(x+17*i,y-10);
				quadraticVertex(x+24.5*i,y-5.5,x+30*i,y);
				vertex(x+25*i,y+3);
				vertex(x+27.5*i,y+5);
				quadraticVertex(x+22*i,y+8,x+15*i,y+10);
				endShape(CLOSE);
			}
			fill(bodyColor2);
			ellipse(x-10,y-10,3.5,3.5);
			ellipse(x-13.5,y-4.5,5,5);
			ellipse(x+12,y+6,7.5,7.5);
			ellipse(x+6.5,y+12.5,5,5);
			noFill(); stroke(eyeColor);
			strokeWeight(2);
			ellipse(x+1,y-4.5,10,10);
			fill(mouthColor); noStroke();
			arc(x-4,y+27,36.5,36.5,radians(-100),radians(-58),CHORD);
		}
	}
};
const UI={
	logo:function(x,y,xscale)
	{
		const typePoint=[
		/*C*/	[[[4,0],[1,0],[0,1],[1,2],[4,2]]],
		/*H*/	[[[1,0],[0,1],[1,2]],[[3,0],[4,1],[3,2]],[[0,1],[4,1]]],
		/*R*/	[[[1,0],[0,1],[1,2]],[[3,0],[4,1],[3,1],[4,2]]],
		/*O*/	[[[3,0],[1,0],[0,1],[1,2],[3,2],[4,1],[3,0]]],
		/*M*/	[[[0,0],[0,2]],[[1,0],[2,1],[3,0]],[[4,0],[4,2]]],
		/*E*/	[[[4,0],[1,0],[0,1],[1,2],[4,2]]],
		/*X*/	[[[0,0],[4,2]],[[4,0],[0,2]]],
		/*A*/	[[[0,2],[2,0],[4,2]]]
			];
		noFill();
		stroke(_BLACK);
		strokeWeight(5);
		strokeCap(ROUND);
		strokeJoin(ROUND);
		push();
		translate(x,y);
		scale(xscale/683.5);
		push();
		translate(-341.5,-50);
		for(var i=0;i<8;i++)
		{
			UI.typho(typePoint[i]);
			translate(87.5,0);
		}
		pop();
		noStroke();
		fill(_RED);
		quad(133,-15,140.573,-10.633,140,-2,133,-4.5);
		fill(_YELLOW);
		quad(140.573,-10.633,151.674,-4.228,144,2,140,-2);
		fill(255);
		quad(151.674,-4.228,159,0,145.324,7.894,144,2);
		fill(_GREEN);
		quad(133,-4.5,140,-2,144,2,133,6);
		fill(_BLUE);
		quad(133,6,144,2,145.324,7.894,133,15);
		noFill();
		strokeWeight(3);
		stroke(_WHITE);
		triangle(133,-15,133,15,159,0);
		pop();
	},
	typho:function(v)
	{
		const xValues=[0,20,71/2,51,71];
		const yValues=[0,50,100];
		for(var i=0;i<v.length;i++)
		{
			beginShape();
			for(var j=0;j<v[i].length;j++)
			{
				vertex(xValues[v[i][j][0]],yValues[v[i][j][1]]);
			}
			endShape();
		}
	},
	start_button:function(x,y,r)
	{
		var edge=createVector(-r/2,0);
		var cpoint=createVector(0,-r*sin(PI/3));
		var apoint=createVector(0,-r*11/20);
		var v1, v2;
		v2=p5.Vector.add(edge,apoint);
		beginShape();
		vertex(x+v2.x,y+v2.y);
		for(var i=0;i<3;i++)
		{
			v1=p5.Vector.sub(edge,cpoint);
			v2=p5.Vector.sub(edge,apoint);
			bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
			v1=p5.Vector.add(edge,cpoint);
			v2=p5.Vector.add(edge,apoint);
			bezierVertex(x+v2.x,y+v2.y,x+v1.x,y+v1.y,x+v2.x,y+v2.y);
			edge.rotate(TWO_PI/3);
			cpoint.rotate(TWO_PI/3);
			apoint.rotate(TWO_PI/3);
		}
		v1=p5.Vector.sub(edge,cpoint);
		v2=p5.Vector.sub(edge,apoint);
		bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
		endShape();
	},
	ingame_banner:function()
	{
		var base=min(width,height);
		var H=base/map(width/height,16/9,9/16,8,5);
		var R=H/5;
		noStroke();
		fill(_WHITE);
  		rect(H/4,0,width-H*2/4,H);
 		rect(width/2-H+R,H-10,2*H-2*R,H*2/3+10);
 		rect(width/2-H,H-10,2*H,H*2/3-R+10);
  		ellipse(width/2-(H-R),H*5/3-R,2*R,2*R);
  		ellipse(width/2+(H-R),H*5/3-R,2*R,2*R);
 		fill(_DARK_WHITE);
 		ellipse(R,H-R,2*R,2*R);
 		ellipse(width-R,H-R,2*R,2*R);
 		rect(0,0,H,H-R);
 		rect(R,0,H-R,H);
 		rect(width-H,0,H,H-R);
 		rect(width-H,0,H-R,H);
	},
	ingame_banner2:function(whosTurn)
	{
		var base=min(width,height);
		var H=base/map(width/height,16/9,9/16,8,5);
		var v=createVector(1,0);
		var v2=p5.Vector.fromAngle(radians(-120));
		var pos=createVector(width/2,H*2/3*cos(PI/6));
		var edge=createVector();
		var i;
		//hexagon
		noStroke();
		fill(255);
		hexagon(width/2,H*2/3*cos(PI/6),H*2/3);
		//inner hexagon
		v=createVector(-1,0);
		v.mult(H*2/3*4/5);
		v2.mult(H*2/3*4/5);
		noFill();
		strokeCap(ROUND);
		strokeJoin(ROUND);
		strokeWeight(H/20);
		for(i=0;i<6;i++)
		{
			switch(i)
			{
				case 0:stroke(_PURPLE); break;
				case 1:stroke(_BLUE); break;
				case 2:stroke(_GREEN); break;
				case 3:stroke(_YELLOW); break;
				case 4:stroke(_ORANGE); break;
				case 5:stroke(_RED); break;
			}
			line(v.x+pos.x,v.y+pos.y,v2.x+pos.x,v2.y+pos.y);
			v.rotate(-PI/3);
			v2.rotate(-PI/3);
		}
		stroke(_PURPLE);
		point(v2.x+pos.x,v2.y+pos.y);
		//who's turn
		var clamp=H*2/3*6/5;
		if(whosTurn==1) stroke(_BLUE);
		else stroke("#bdc3c7");
		beginShape()
		vertex(width/2-(clamp-H*1/3),0);
		vertex(width/2-clamp,H*2/3*cos(PI/6));
		vertex(width/2-(clamp-H*1/3),H*4/3*cos(PI/6));
		endShape();
		if(whosTurn==2) stroke(_RED);
		else stroke("#bdc3c7");
		beginShape()
		vertex(width/2+(clamp-H*1/3),0);
		vertex(width/2+clamp,H*2/3*cos(PI/6));
		vertex(width/2+(clamp-H*1/3),H*4/3*cos(PI/6));
		endShape();
	},
	ingame_status:function(whosTurn, turns, cost)
	{
		var base=min(width,height);
		var H=base/map(width/height,16/9,9/16,8,5);
		var F=base/768;
		var light=resourceBox.font[0];
		var regular=resourceBox.font[1];
		var medium=resourceBox.font[2];
		if(whosTurn==1) fill(_BLUE);
		else fill(_RED);
		noStroke();
		textAlign(CENTER);
		textFont(light);
		textSize(12*F);
		text('TURN', width/2,0.42*H);
		textFont(regular);
		textSize(45*F);
		if(str(turns).match(/1/gi)!=null)
		{
			var shifter=str(turns).match(/1/gi).length/str(turns).length;
			text(turns,width/2-3*F*shifter,0.8*H);
		}
		else text(turns, width/2,0.8*H);
		fill(_BLACK);
		textFont(light);
		textSize(20*F);
		text("COST", width/2-20*F,1.5*H);
		textFont(medium);
		textSize(30*F);
		text(cost, width/2+37*F,1.53*H);
	},
	endTurn_button:function()
	{
		//define varient
		var base=min(width,height);
		var W=base/3.7;
		var H=base/5.8;
		var R=W/10;
		var F=base/768;
		var buttonX=width-base*0.08-W;
		var buttonY=height-base*0.08-H;
		var strokeW=5*base/768;
		var regular=resourceBox.font[1];
		var medium=resourceBox.font[2];
		strokeWeight(strokeW);
		//draw inner area
		noStroke();
		fill(255);
		rect(buttonX,buttonY+R,W,H-2*R);
		rect(buttonX+R,buttonY,W-2*R,H);
		ellipse(buttonX+R,buttonY+R,2*R,2*R);
		ellipse(buttonX+R,buttonY+H-R,2*R,2*R);
		ellipse(buttonX+W-R,buttonY+H-R,2*R,2*R);
		ellipse(buttonX+W-R,buttonY+R,2*R,2*R);

		noFill();
		strokeWeight(strokeW);
		//draw outer area
		stroke(_RED);
		line(buttonX,buttonY+H/2,buttonX,buttonY+R);
		arc(buttonX+R,buttonY+R,2*R,2*R,PI,1.5*PI);
		stroke(_PURPLE);
		line(buttonX+3*R,buttonY+H,buttonX+R,buttonY+H);
		arc(buttonX+R,buttonY+H-R,2*R,2*R,0.5*PI,PI);
		line(buttonX,buttonY+H-R,buttonX,buttonY+H/2);
		stroke(_BLUE);
		line(buttonX+W-3*R,buttonY+H,buttonX+3*R,buttonY+H);
		stroke(_GREEN);
		line(buttonX+W,buttonY+H/2,buttonX+W,buttonY+H-R);
		arc(buttonX+W-R,buttonY+H-R,2*R,2*R,0,0.5*PI);
		line(buttonX+W-R,buttonY+H,buttonX+W-3*R,buttonY+H);
		stroke(_YELLOW);
		line(buttonX+W-3*R,buttonY,buttonX+W-R,buttonY);
		arc(buttonX+W-R,buttonY+R,2*R,2*R,1.5*PI,TWO_PI);
		line(buttonX+W,buttonY+R,buttonX+W,buttonY+H/2);
		stroke(_ORANGE);
		line(buttonX+3*R,buttonY,buttonX+W-3*R,buttonY);
		stroke(_RED);
		line(buttonX+R,buttonY,buttonX+3*R,buttonY);
		
		noStroke();
		fill(_BLACK);
		textAlign(CENTER);
		textFont(medium);
		textSize(42*F);
		text('END', buttonX+W/2,buttonY+H*0.475);
		textFont(regular);
		textSize(28*F);
		text('TURN', buttonX+W/2,buttonY+H*0.75);
	},
	CPmeter:function(x,y,CP,maxCP)
	{
		var ox=x+25;
		var oy=y-25;
		var col;
		var r=CP/maxCP*TWO_PI-HALF_PI;
		if(CP==0)
		{
			noFill();
			stroke(_BLACK);
			strokeWeight(2.5);
			strokeCap(SQUARE);
			line(ox-4.5,oy-4.5,ox+4.5,oy+4.5);
			line(ox-4.5,oy+4.5,ox+4.5,oy-4.5);
		}
		else
		{
			if(CP/maxCP<=0.2) col=_RED;
			else if(CP/maxCP<=0.5) col=_YELLOW;
			else col=_BLUE;
			fill(col);
			stroke(255);
			strokeWeight(1);
			strokeCap(ROUND);
			ellipse(ox,oy,15,15);
			noFill();
			stroke(255);
			for(var i=0;i<maxCP;i++)
			{
				var cr=TWO_PI*i/maxCP;
				line(ox-0.5,oy-0.5,ox-0.5+7.5*sin(cr),oy-0.5-7.5*cos(cr));
			}
			noStroke();
			fill(255);
			ellipse(ox,oy,8,8);
			if(CP!=maxCP) arc(ox,oy,15,15,r,-HALF_PI);
		}
	},
	stunmark:function(x,y)
	{
		noFill();
		stroke(_YELLOW);
		for(var i=-1;i<2;i+=2)
		{
			beginShape();
			for(var j=0;j<4;j++)
			{
				vertex(x+25*i,y-20+10*j);
				vertex(x+30*i,y-15+10*j);
			}
			vertex(x+25*i,y+20);
			endShape();
		}
	},
	ODL_select:function(x,y)
	{
		noStroke();
		fill(_RED);
		hexagon(x,y,12);
		stroke(255);
		strokeWeight(1);
		noFill();
		beginShape();
		vertex(x-5,y+1);
		vertex(x-1.5,y+5.5);
		vertex(x+5,y-3.5);
		endShape();
	},
	ODL_swap:function(x,y)
	{
		noStroke();
		fill(_BLUE);
		hexagon(x,y,12);
		stroke(255);
		strokeWeight(1);
		noFill();
		for(var i=-1;i<2;i+=2)
		{
			beginShape();
			vertex(x+i*6,y-i*4.688);
			vertex(x+i*5.438,y-i*2.536);
			vertex(x+i*3,y-i*3);
			endShape();
		}
		arc(x,y,12,12,radians(25),radians(155));
		arc(x,y,12,12,radians(205),radians(335));

	}
}
const cellImage=
{
	0:function(who, x, y)
	{
		//nothing
	},
	1:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,30);
	},
	2:function(who, x, y)
	{
		var col=this.colerSelect(who);
		if(who==0) col=_DARK_WHITE;
		noFill();
		stroke(col);
		strokeCap(ROUND);
		strokeWeight(2.5);
		roundedHexagon(x,y,30);
	},
	3:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,40);
	},
	4:function(who, x, y)
	{
		var col=this.colerSelect(who);
		fill(col);
		noStroke();
		roundedHexagon(x,y,30);
	},
	5:function(who, x, y)
	{
		noStroke();
		var v1=createVector(30,0);
		var v2=p5.Vector.fromAngle(radians(60));
		v2.mult(30);
		for(var i=0;i<6;i++)
		{
			switch(i%3)
			{
				case 0:fill("#5d6364"); break;
				case 1:fill("#3a3a3a"); break;
				case 2:fill("#262626"); break;
			}
			triangle(x, y, x+v1.x, y+v1.y, x+v2.x, y+v2.y);
			v1.rotate(PI/3);
			v2.rotate(PI/3);
		}
		fill(255);
		beginShape();
		for(var i=0;i<6;i++)
		{
			vertex(x+v1.x, y+v1.y);
			v1.rotate(-PI/3);
		}
		beginContour();
		roundedHexagonRaw(x,y,30);
		endContour();
		endShape(CLOSE);
	},
	colerSelect:function(who)
	{
		switch(who)
		{
			case 1:return _BLUE; break;
			case 2:return _RED; break;
			case 0:return _WHITE; break;
			default:return _DARK_WHITE;
		}
	}
}
const cellUpper=
{
	0:function(who, x, y){},
	1:function(who, x, y){},
	2:function(who, x, y){},
	3:function(who, x, y)
	{
		noFill();
		stroke(255);
		strokeCap(ROUND);
		strokeJoin(ROUND);
		strokeWeight(2.5);
		var v1=createVector(25,0);
		var v2=p5.Vector.fromAngle(radians(60));
		v2.mult(25);
		for(var i=0;i<6;i++)
		{
			triangle(x, y, x+v1.x, y+v1.y, x+v2.x, y+v2.y);
			v1.rotate(PI/3);
			v2.rotate(PI/3);
		}
	},
	4:function(who, x, y)
	{
		noFill();
		stroke(255);
		strokeCap(ROUND);
		strokeJoin(ROUND);
		strokeWeight(2.5);
		beginShape();
		vertex(x,y-16);
		vertex(x-9,y-4);
		vertex(x-9,y+13.5);
		vertex(x-5,y+15);
		vertex(x+5,y+15);
		vertex(x+9,y+13.5);
		vertex(x+9,y-4);
		endShape(CLOSE);
		line(x,y-16,x,y+15);
	},
	5:function(who, x, y){}
}
function hexagon(x,y,r)
{
	var edge=createVector(r,0);
	var pos=createVector(x,y);
	var v;
	beginShape();
	for(var i=0;i<6;i++)
	{
		v=p5.Vector.add(edge,pos);
		vertex(v.x,v.y);
		edge.rotate(PI/3);
	}
	endShape();
}
function roundedHexagon(x,y,r)
{
	beginShape();
	roundedHexagonRaw(x,y,r);
	endShape(CLOSE);
}
function roundedHexagon(x,y,r)
{
	beginShape();
	roundedHexagonRaw(x,y,r);
	endShape(CLOSE);
}
function roundedHexagonRaw(x,y,r)
{
	var edge=createVector(0,r*cos(PI/6));
	var cpoint=createVector(-r/2,0);
	var apoint=createVector(-r*7/20,0);
	var v1, v2;
	v2=p5.Vector.add(edge,apoint);
	vertex(x+v2.x,y+v2.y);
	for(var i=0;i<6;i++)
	{
		v1=p5.Vector.sub(edge,cpoint);
		v2=p5.Vector.sub(edge,apoint);
		bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
		v1=p5.Vector.add(edge,cpoint);
		v2=p5.Vector.add(edge,apoint);
		bezierVertex(x+v2.x,y+v2.y,x+v1.x,y+v1.y,x+v2.x,y+v2.y);
		edge.rotate(PI/3);
		cpoint.rotate(PI/3);
		apoint.rotate(PI/3);
	}
	v1=p5.Vector.sub(edge,cpoint);
	v2=p5.Vector.sub(edge,apoint);
	bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
}
function star(posX,posY,r1,r2)
{
	var v1=createVector(0,-r1);
	var v2=p5.Vector.fromAngle(-HALF_PI+PI/5);
	var pos=createVector(posX,posY);
	var R1=createVector();
	var R2=createVector();
	v2.setMag(r2);
	beginShape();
	for(var i=0;i<5;i++)
	{
		R1=p5.Vector.add(v1,pos);
		R2=p5.Vector.add(v2,pos);
		vertex(R1.x,R1.y);
		vertex(R2.x,R2.y);
		v1.rotate(TWO_PI/5);
		v2.rotate(TWO_PI/5);
	}
	endShape();
}

function detectCell(kind)
{
	switch(kind)
	{
		case 3:
		case 4:return _FILLER;
		case 1:return _MOVEABLE;
		default:return _NOMOVE;
	}
}

function RESOURCE_BOX()
{
	this.map=[];
	this.font=[];
//	this.cellImage=null;
//	this.cellPlus=[];
}

function MAP_DATA()
{
	this.row=0;
	this.column=0;
	this.kind=[];
	this.who=[];
	this.player=[];
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
		newObj.player[i]=[];
		newObj.enemy[i]=[];
		for(var j=0;j<this.column;j++)
		{
			newObj.kind[i][j]=this.kind[i][j];
			newObj.who[i][j]=this.who[i][j];
			newObj.player[i][j]=this.player[i][j];
			newObj.enemy[i][j]=this.enemy[i][j];
		}
	}
	return newObj;
}

/**
 *
 * p5.js에서 동작하는 마우스, 키보드 제어 변수의 집합.
 * 별도의 함수로 동작하는 트리거를 함수 외부에서도 동작하게 하기 위함.
 *
 * @author steliviere
 * @date 2017.12.13
 * @version 1.1
 *
 */
function BROADCAST()
{
	/**
	 *
	 * @var {boolean} isMousePress	마우스 클릭 여부(클릭했을 시점에만 true, 나머지는 false)
	 * @var {float} dmouseX		드래그 시 이전 마우스 X좌표
	 * @var {float} dmouseY		드래그 시 이전 마우스 Y좌표
	 *
	 */
	this.isMousePress=false;
	this.wasMousePress=false;
	this.dmouseX=mouseX;
	this.dmouseY=mouseY;
}
/**
 *
 * 변수를 갱신하는 함수
 *
 */
BROADCAST.prototype.renew=function()
{
	if(this.wasMousePress)
	{
		this.isMousePress=false;
		this.wasMousePress=false;
	}
	else if(this.isMousePress) this.wasMousePress=true;
	if(mouseIsPressed)
	{
		this.dmouseX=mouseX;
		this.dmouseY=mouseY;
	}
}

/**
 *
 * p5.js에서 동작하는 스크린 컨트롤 클래스.
 * 마우스의 위치에 따라 현재 스크린을 이동시키거나 크기를 늘리고 줄일 수 있다.
 * 
 * @author steliviere
 * @date 2017.12.07
 * @version 1.1
 *
 */
function SCREEN_CONTROL(w,h)
{
	/**
	 *
	 * @var {float} w	조작할 이미지의 너비
	 * @var {float} h	조작할 이미지의 높이
	 * @var {float} ox	원점의 x좌표
	 * @var {float} oy	원점의 y좌표
	 * @var {float} zoom	확대 배율
	 *
	 */
	this.w=w;
	this.h=h;
	this.ox=(width-w)/2;
	this.oy=(height-h)/2;
	this.zoom=1;
	this.screenX=0;
	this.screenY=0;
	this.screenWidth=width;
	this.screenHeight=height;
}
SCREEN_CONTROL.prototype.set=function(w,h)
{
	this.w=w;
	this.h=h;
	this.ox=this.screenX+(this.screenWidth-w)/2;
	this.oy=this.screenY+(this.screenHeight-h)/2;
	this.zoom=1;
}
SCREEN_CONTROL.prototype.setBound=function(x,y,w,h)
{
	this.screenX=x;
	this.screenY=y;
	this.screenWidth=w;
	this.screenHeight=h;
}
/**
 *
 * 마우스 드래그에 따라 스크린을 움직이는 함수
 * 
 * @param {float} dx		이동 거리의 x축 변화량
 * @param {float} dy		이동 거리의 y축 변화량
 *
 */
SCREEN_CONTROL.prototype.move=function(dx,dy)
{
	this.ox+=dx;
	this.oy+=dy;
	this.limit();
}
/**
 *
 * 마우스의 현재 위치에 따라 확대, 축소하는 함수
 * 
 * @param {float} newZoom	스케일링할 배율
 * @param {float} pinX		기준 좌표의 X좌표(절대적)
 * @param {float} pinY		기준 좌표의 Y좌표(절대적)
 *
 */
SCREEN_CONTROL.prototype.scale=function(newZoom,pinX,pinY)
{
	var ratio=newZoom/this.zoom;
	if(newZoom>4) ratio=4/this.zoom;
	this.zoom=newZoom;
	this.ox=pinX-(pinX-this.ox)*ratio;
	this.oy=pinY-(pinY-this.oy)*ratio;
	this.limit();
}
/**
 *
 * @원점과 배율을 제한하는 함수
 * @배율은 최소 스크린 크기부터 최대 4배까지 조절됨
 *
 */
SCREEN_CONTROL.prototype.limit=function()
{
	var zoomMin=min(this.screenWidth/this.w,this.screenHeight/this.h,1);
	this.zoom=constrain(this.zoom,zoomMin,4);
	var wLimit=this.screenX+this.screenWidth-this.w*this.zoom;
	var hLimit=this.screenY+this.screenHeight-this.h*this.zoom;
	if(wLimit<this.screenX) this.ox=constrain(this.ox,wLimit,this.screenX);
	else this.ox=(this.screenX+wLimit)/2;
	if(hLimit<this.screenY) this.oy=constrain(this.oy,hLimit,this.screenY);
	else this.oy=(this.screenY+hLimit)/2;
}
/**
 *
 * 객체의 현재 속성에 따라 실제로 스크린을 이동시키는 함수
 *
 */
SCREEN_CONTROL.prototype.setScreen=function()
{
	translate(this.ox,this.oy);
	scale(this.zoom);
}
/**
 *
 * 현재 이동, 스케일링 상태의 마우스 위치를 반환하는 함수
 * 
 * @return {p5.Vector} res	상대적 마우스 위치
 *
 */
SCREEN_CONTROL.prototype.relativeMouse=function()
{
	var res=createVector((mouseX-this.ox)/this.zoom,(mouseY-this.oy)/this.zoom);
	return res;
}

function STREAM()
{
	this.world=0;
	this.stage=0;
}

/**
 *
 * 육각형 셀의 인덱싱과 연산을 제어한다.
 * 
 * @author steliviere
 * @date 2017.12.16
 * @version 1.2
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
COORD.prototype.isSame=function(other)
{
	return (this.row==other.row&&this.col==other.col);
}
COORD.prototype.copy=function()
{
	var res=new COORD(this.row, this.col);
	return res;
}
COORD.prototype.x=function()
{
	return 45*(1.5*this.col+1);
}
COORD.prototype.y=function()
{
	return 45*cos(PI/6)*(2*this.row+2-this.col%2);
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

/**
 *
 * 대상 셀이 기준 셀의 직선 방향에 있는지 파악한다.
 *
 * @param {COORD} o		기준이 되는 셀
 * @param {COORD} target	대상 셀
 *
 * @return {int}		o를 기준으로 한 대상 셀의 방향(대각선 방향일 시 -1)
 *
 */
function hexCell_isLine(o,target)
{
	var dx=target.col-o.col;
	var dy=target.row-o.row;
	var xdist=abs(dx);
	var xsign=int(xdist/dx);
	var bound1=o.row-int((xdist+o.col%2)/2);
	var bound2=o.row+int((xdist+(o.col+1)%2)/2);
	if(xdist==0)
	{
		if(dy>0) return _HEX_DOWN;
		else if(dy<0) return _HEX_UP;
	}
	else if(bound1-target.row==0)
	{
		if(dx>0) return _HEX_RIGHTUP;
		else if(dx<0) return _HEX_LEFTUP;
	}
	else if(target.row-bound2==0)
	{
		if(dx>0) return _HEX_RIGHTDOWN;
		else if(dx<0) return _HEX_LEFTDOWN;
	}
	else return -1;
}

function BUTTON(x,y,w,h)
{
	this.x=x
	this.y=y;
	this.w=w;
	this.h=h;
	this.draw=function(){};
}
BUTTON.prototype.imageSet=function(func)
{
	this.draw=func;
}
BUTTON.prototype.mouseOn=function()
{
	if(mouseX>this.x&&mouseX<this.x+this.w&&mouseY>this.y&&mouseY<this.y+this.h)
	{
		return true;
	}
	else return false;
}
function HEXA_BUTTON(x,y,r)
{
	this.x=x;
	this.y=y;
	this.r=r;
}
HEXA_BUTTON.prototype.mouseOn=function(isSC_on)
{
	var mouse;
	if(isSC_on) mouse=screenControl.relativeMouse();
	else mouse=createVector(mouseX,mouseY);
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

function OTHER_DIALOGBUTTON()
{
	this.pos=null;
	this.x=0;
	this.y=0;
	this.isValid=false;
}
OTHER_DIALOGBUTTON.prototype.set=function(where,otherP)
{
	var p;
	if(otherP!=-1)
	{
		if(where.whosTurn==1) p=where.p1[otherP];
		else p=where.p2[otherP];
		this.x=p.x;
		this.y=p.y;
		this.pos=p.coord.copy();
		this.isValid=true;
	}
	else
	{
		this.pos=null;
		this.x=0;
		this.y=0;
		this.isValid=false;
	}
}
OTHER_DIALOGBUTTON.prototype.draw=function()
{
	if(this.isValid)
	{
		UI.ODL_select(this.x-15,this.y+30);
		UI.ODL_swap(this.x+15,this.y+30);
	}
}
OTHER_DIALOGBUTTON.prototype.mouseOn=function()
{
	var selecter=new HEXA_BUTTON(this.x-15,this.y+30,12);
	var swapper=new HEXA_BUTTON(this.x+15,this.y+30,12);
	if(selecter.mouseOn(true)) return "select";
	else if(swapper.mouseOn(true)) return "swap";
	else return "none";
}

/**
 *
 * this library is NOT my code.
 * original source:http://eloquentjavascript.net/1st_edition/appendix2.html
 *
 */

function BinaryHeap(scoreFunction){
  this.content = [];
  this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
  push: function(element) {
    // Add the new element to the end of the array.
    this.content.push(element);
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  pop: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  },

  remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] != node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },

  size: function() {
    return this.content.length;
  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n], score = this.scoreFunction(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
      parent = this.content[parentN];
      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= this.scoreFunction(parent))
        break;

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};

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
		if(close.indexOf(current)!=-1) continue;
		close.push(current);
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
		if(childCur.row<0||childCur.row>=where.field.Rows||childCur.col<0||childCur.col>=where.field.Columns)
		{
			return null;
		}
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
	res=path.concat(this.setPath(node.parent));
	return res;
}

/**
 *
 * 육각형 셀 클래스
 * 
 * @author steliviere
 * @date 2017.12.16
 * @version 0.5
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
	cellImage[this.kind](this.who,this.x,this.y);
	cellUpper[this.kind](this.who,this.x,this.y);
}
CELL.prototype.drawUpper=function()
{
	cellUpper[this.kind](this.who,this.x,this.y);
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
	var detector=new HEXA_BUTTON(this.x,this.y,this.r);
	return detector.mouseOn(true);
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

/**
 *
 * 필드 클래스
 * 
 * @author steliviere
 * @date 2017.12.15
 * @version 0.15
 *
 */
function FIELD()
{
  /**
   *
   * @var {int} Rows		필드의 행(가로줄)의 수
   * @var {int} Columns		필드의 열(세로줄)의 수
   * @var {float} w		필드의 가로 길이
   * @var {float} h		필드의 세로 길이
   * @var {object|CELL} cells	셀 오브젝트
   *
   */
	this.Rows=0;
	this.Columns=0;
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
FIELD.prototype.makeField=function(mapData)
{
	var mapData_kind=mapData.kind;
	var mapData_who=mapData.who;
	this.Rows=mapData.row;
	this.Columns=mapData.column;
	this.w=45*(1.5*this.Columns+0.5);
	this.h=45*cos(PI/6)*(2*this.Rows+1);
	for(var i=0;i<this.Rows;i++)
	{
		this.cells[i]=[];
		for(var j=0;j<this.Columns;j++)
		{
			this.cells[i][j]=new CELL(i,j,mapData_kind[i][j],mapData_who[i][j]);
	//		this.cells[i][j]=new CELL(i,j,1,0);
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
	for(var i=0;i<this.Rows;i++)
	{
		for(var j=0;j<this.Columns;j++)
		{
			this.cells[i][j].draw();
		}
	}
}
/**
 *
 * 각 셀마다 클릭 여부를 체크, 클릭한 셀의 인덱스 no와 셀의 유형을 리턴한다.
 *
 * @return {COORD}	메인 함수에 전달할 값들
 			index:자신의 인덱스 no.
			signal:버튼 종류(0:움직일 수 없는 셀, 1:움직일 수 있는 셀, 2:필러)
			없을 시 null 반환
 *
 */
FIELD.prototype.clickCheck=function()
{
	for(var i=0;i<this.Rows;i++)
	{
		for(var j=0;j<this.Columns;j++)
		{
			if(this.cells[i][j].isMouseOn())
			{
				return this.cells[i][j].mouseClick();
			}
		}
	}
	return null;
}

function MY_CHARA(indexNo, exp)
{
	this.indexNo=indexNo;
	this.LV=levelTable(exp);
	this.exp=exp;
	this.maxCP=cpTable(this.LV, charaProto[indexNo].CPbase);
}

function levelTable(exp)
{
	return exp*exp*10;
}
function cpTable(lv, base)
{
	return int(lv/10)+base;
}

function CHARACTER_INGAME()
{
	this.indexNo=0;
	this.arrNo=0;
	this.isLive=true;
	this.coord=null;
	this.x=0, y=0;
	this.who=0;
	this.sprite=function(x,y){};
	this.attackMap=[];
	this.attackRadius=0;
	this.frame=-1;
}
CHARACTER_INGAME.prototype.draw=function()
{
	this.sprite(this.x,this.y);
}
CHARACTER_INGAME.prototype.move=function(where, target)
{
	// 선언부
	var dir=hexCell_isLine(this.coord,target);
	var dist=hexCell_dist(this.coord,target);
	var cur=this.coord.copy();
	var isRotated=false;
	var trace=[];
	var otherAlly=[];
	var beforeCell=cur.copy();
	var map=where.field.cells;
	var myBuho=(this.who==1?1:-1);
	var myAlly;
	var costDown=0;
	if(this.who==1) myAlly=where.p1;
	else myAlly=where.p2;
	// 계산
	var i=0;
	while(!isRotated&&i<dist)
	{
		cur=hexCell_trans(cur,dir,1);
		trace.push(map[cur.row][cur.col]);
		if(where.pLocation[cur.row][cur.col]*myBuho>0)
		{
			if(isRotated) return false;
			if(this.CP==undefined) return false;
			otherAlly.push({
				who:myAlly[where.pLocation[cur.row][cur.col]*myBuho-1], 
				beforeCur:beforeCell.copy(), 
				thisCur:cur.copy(),
				dist:hexCell_dist(beforeCell,cur),
				p:-1
			});
		}
		if([0,5].indexOf(trace[i].kind)!=-1) return false;
		if(this.CP!=undefined)
		{
			if((trace[i].kind==3||trace[i].kind==4)&&trace[i].who==this.who)
			{
				this.CP=this.maxCP;
			}
			if(this.CP==0&&where.pLocation[cur.row][cur.col]*myBuho<0)
			{
				if(isRotated) this.death();
				return false;
			}
		}
/*		<incomplete>
		if([6,7,8,9,10,11].indexOf(trace[i].kind)!=-1)
		{
			isRotated=true;
			dir=(trace[i]-6)%6;
		}
		*/
		if([1,3,4].indexOf(trace[i].kind)!=-1)
		{
			if(isRotated) break;
			beforeCell=cur.copy();
		}
		i++;
		if(!isRotated) costDown++;
	}
	dist=i;
	for(i=0;i<otherAlly.length;i++)
	{
		costDown-=otherAlly[i].dist;
	}
	if(where.moveCost<costDown) return false;
	// 큐에 모션을 넣는다
	cur=this.coord.copy();
	for(i=0;i<dist;i++)
	{
		where.motionQueue.push({
			type:"move",
			result:[{who:this, pCoord:cur, newCoord:trace[i].index.copy()}]
		});
		if(otherAlly.length>0)
		{
			if(cur.isSame(otherAlly[0].beforeCur))
			{
				otherAlly[0].p=0;
			}
			if(otherAlly[0].p!=-1&&otherAlly[0].p<otherAlly[0].dist)
			{
				where.motionQueue[where.motionQueue.length-1].result.push({
					who:otherAlly[0].who,
					pCoord:trace[i+otherAlly[0].dist-2*otherAlly[0].p-1].index.copy(), 
					newCoord:null
				});
				(function(who){
					var motionQueuelast=where.motionQueue[where.motionQueue.length-1];
					var last=motionQueuelast.result[motionQueuelast.result.length-1];
					var res;
					if(i+otherAlly[0].dist-2*otherAlly[0].p-2<0) res=who.coord.copy();
					else res=trace[i+otherAlly[0].dist-2*otherAlly[0].p-2].index.copy();
					last.newCoord=res;
				})(this);
				otherAlly[0].p++;
			}
			if(otherAlly[0].p>=otherAlly[0].dist)
			{
				otherAlly.shift();
			}
		}
		if(where.pLocation[trace[i].index.row][trace[i].index.col]*myBuho<0)
		{
			this.attack(where, trace[i].index.copy());
		}
		cur=trace[i].index.copy();
	}
	where.moveCost-=costDown;
	return true;
}
CHARACTER_INGAME.prototype.moveMotion=function(target)
{
	var O=createVector(this.coord.x(),this.coord.y());
	var T=createVector(target.x(),target.y());
	this.frame++;
	this.x=lerp(O.x,T.x,this.frame/12);
	this.y=lerp(O.y,T.y,this.frame/12);
	if(this.frame>=12)
	{
		this.frame=-1;
		return false;
	}
	else return true;
}
CHARACTER_INGAME.prototype.attack=function(where, myCoord)
{
	var cells=where.field.cells;
	var Rows=where.field.Rows;
	var Columns=where.field.Columns;
	var i,j;
	var threshMap=[];
	var queueLastType;
	for(i=0;i<Rows;i++)
	{
		threshMap[i]=[];
		for(j=0;j<Columns;j++)
		{
			threshMap[i][j]=false;
		}
	}
	const cCol=function(p){return myCoord.col-5+p};
	const cRow=function(p,q){return myCoord.row-5+p+((myCoord.col+1)%2)*(cCol(q)%2)};
	for(i=0;i<11;i++)
	{
		for(j=0;j<11;j++)
		{
			if(cRow(i,j)<0||cRow(i,j)>=Rows||cCol(j)<0||cCol(j)>=Columns) continue;
			if(this.attackMap[i][j]&&cells[cRow(i,j)][cCol(j)].who!=-1)
			{
				threshMap[cRow(i,j)][cCol(j)]=true;
				this.attack_other(where, cRow(i,j),cCol(j));
			}
		}
	}
	if(where.motionQueue.length==0) queueLastType="NONE";
	else queueLastType=where.motionQueue[where.motionQueue.length-1].type;
	if(queueLastType=="attack")
	{
		where.motionQueue[where.motionQueue.length-1].result.push({who:this, thresh:threshMap});
	}
	else
	{
		where.motionQueue.push({
			type:"attack",
			result:[{who:this, thresh:threshMap}]
		});
	}
}
CHARACTER_INGAME.prototype.attack_other=function(where, i, j)
{
	var ally, enemy;
	var myBuho;
	if(this.who==1) 
	{
		ally=where.p1;
		enemy=where.p2;
		myBuho=1;
	}
	else
	{
		ally=where.p2;
		enemy=where.p1;
		myBuho=-1;
	}
	var thisLocation=where.pLocation[i][j]*myBuho;
	var type_, who_;
	var targetNo=abs(thisLocation)-1;
	var queueLastType;
	
	//hit or heal
	if(thisLocation<0)
	{
		type_="damage";
		who_=enemy[targetNo];
	}
	else if(thisLocation>0&&thisLocation-1!=this.arrNo)
	{
		type_="heal";
		who_=ally[targetNo];
	}
	else return 0;
	//push motionQueue
	if(where.motionQueue.length==0) queueLastType="NONE";
	else queueLastType=where.motionQueue[where.motionQueue.length-1].type;
	if(queueLastType=="hit")
	{
		where.motionQueue[where.motionQueue.length-1].result.push({
			who:who_, stat:type_
		});
	}
	else
	{
		where.motionQueue.push({
			type:"hit",
			result:[{who:who_, stat:type_}]
		});
	}
}
CHARACTER_INGAME.prototype.attackMotion=function()
{
	var r=(180*this.attackRadius/pow(12,3))*pow(this.frame-12,3)+180*this.attackRadius;
	if(this.who==1) fill(_BLUE);
	else fill(_RED);
	noStroke();
	ellipse(this.x,this.y,r,r);
	this.frame++;
	if(this.frame>=12)
	{
		this.frame=-1;
		return false;
	}
	else return true;
}
CHARACTER_INGAME.prototype.hit=function(){}
CHARACTER_INGAME.prototype.heal=function(){}
CHARACTER_INGAME.prototype.death=function()
{
	this.isLive=false;
	var myBuho=(this.who==1?1:-1);
	if(ingame.pLocation[this.coord.row][this.coord.col]*myBuho-1==this.arrNo)
	{
		ingame.pLocation[this.coord.row][this.coord.col]=0;
	}
}

function PLAYER(row, col, boxNo, arrNo, who)
{
	CHARACTER_INGAME.call(this);
	this.arrNo=arrNo;
//	this.myChara=charaProto[boxNo];
	this.indexNo=boxNo;
	this.maxCP=charaProto[this.indexNo].CPbase;
	this.CP=this.maxCP;
//	this.myChara=myCharacter[boxNo];
//	this.indexNo=this.myChara.indexNo;
//	this.maxCP=this.myChara.maxCP;
//	this.CP=this.myChara.maxCP;
	this.coord=new COORD(row,col);
	this.x=this.coord.x();
	this.y=this.coord.y();
	this.who=who;
	this.isStunned=false;
	this.sprite=charaProto[this.indexNo].sprite;
	this.attackMap=charaProto[this.indexNo].attackMap.slice();
	this.attackRadius=charaProto[this.indexNo].attackRadius;
}
PLAYER.prototype=new CHARACTER_INGAME();
PLAYER.prototype.constructor=PLAYER;
PLAYER.prototype.draw=function()
{
	CHARACTER_INGAME.prototype.draw.call(this);
	if(this.isStunned) UI.stunmark(this.x,this.y);
}
PLAYER.prototype.attack=function(where, myCoord)
{
	var res=[];
	for(var i=0;i<where.field.Rows;i++)
	{
		res[i]=[];
		for(var j=0;j<where.field.Columns;j++)
		{
			res[i][j]=false;
		}
	}
	if(this.isStunned) return res;
	if(this.CP>0)
	{
		res=CHARACTER_INGAME.prototype.attack.call(this, where, myCoord);
		this.CP--;
	}
	return res;
}
PLAYER.prototype.hit=function()
{
	if(this.CP==0) this.death();
	else
	{
		this.CP--;
		this.isStunned=true;
	}
}
PLAYER.prototype.heal=function()
{
	if(this.CP<this.maxCP) this.CP++;
	this.isStunned=false;
}

function ENEMY(row, col, indexNo,arrNo)
{
	CHARACTER_INGAME.call(this);
	this.arrNo=arrNo;
	this.indexNo=indexNo;
	this.coord=new COORD(row,col);
	this.x=this.coord.x();
	this.y=this.coord.y();
	this.who=2;
	this.sprite=charaProto[indexNo].sprite;
	this.attackMap=charaProto[indexNo].attackMap.slice();
	this.attackRadius=charaProto[indexNo].attackRadius;
	this.path=[];
}
ENEMY.prototype=new CHARACTER_INGAME();
ENEMY.prototype.constructor=ENEMY;
ENEMY.prototype.setPath=function(where, goal)
{
	var pathfinder=new PATHFINDER();
	this.path=pathfinder.find(where, this.coord.copy(),goal);
	this.path.pop();
}
ENEMY.prototype.move=function(where)
{
	var isSuccess;
	var nextPath;
	if(this.path.length!=0)
	{
		var nextPath=this.path.pop();
		isSuccess=CHARACTER_INGAME.prototype.move.call(this, where, nextPath);
	}
	else isSuccess=false;
	if(!isSuccess) this.setPath(where, where.P1area.hub);
	return isSuccess;
}
ENEMY.prototype.hit=function()
{
	this.death();
}

