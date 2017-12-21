//scene class
var loadScene;
var intro;
var selection;
var manageChara;
var sandbox;
var ingame;
//popup class;
var popup;
//control varient
var sceneNo=-1;		//scene number
var popupNo=0;		//pop-up scene number
var screenControl;	//class that control screen
var inputBroadcast;	//user-input varient class
var stream;		//inter-scene stream class
//data class
var resourceBox;
var userData;
var myCharacter;
function setup()
{
	createCanvas(windowWidth,windowHeight);
	inputBroadcast=new BROADCAST();
	screenControl=new SCREEN_CONTROL(width,height);
	resourceBox=new RESOURCE_BOX();
	stream=new STREAM();
	//class definition
	loading=new LOADING();
	intro=new INTRO();
	selection=new SELECTION();
//	manageChara=new MANAGE_CHARA();
//	sandBox=new SANDBOX();
	ingame=new INGAME();
//	popup=new POPUP();
	//load data
	loading.loadData();
	myCharacter=[new MY_CHARA(1,0)];
}
function draw()
{
	inputBroadcast.renew();
	sceneExecute();
//	if(popupNo==0) sceneExecute();
//	else popupExecute();
}
function sceneExecute()
{
	switch(sceneNo)
	{
		case -1:loading.execute(); break;
		case 0:intro.execute(); break;
		case 1:selection.mainSelect(); break;
		case 2:selection.stageSelect_single(); break;
//		case 3:selection.modeSelect_multi(); break;
		case 3:selection.stageSelect_multi(); break;	//case 4
		case 10:ingame.setup(); break;
		case 11:ingame.playerTurn(); break;
		case 12:ingame.motion(); break;
		case 13:ingame.enemyTurn(); break;
		case 14:ingame.motion(); break;
		case 15:ingame.victory(); break;
		case 16:ingame.gameover(); break;
//		case 20:manageChara.setup(); break;
//		case 21:manageChara.myChara(); break;
//		case 30:sandbox.setup(); break;
//		case 31:sandbox.execute(); break;
	}
}
function popupExecute()
{
	switch(popupNo)
	{
//		case 1:popup.pause(); break;
//		case 2:popup.preferance(); break;
//		case 3:popup.networking(); break;
//		case 99:popup.error(); break;
	}
}
function mousePressed()
{
	inputBroadcast.isMousePress=true;
	inputBroadcast.dmouseX=mouseX;
	inputBroadcast.dmouseY=mouseY;
}
function mouseDragged()
{
	var deltaX=mouseX-inputBroadcast.dmouseX;
	var deltaY=mouseY-inputBroadcast.dmouseY;
	if(int(sceneNo/10)==1 || sceneNo==31) screenControl.move(deltaX,deltaY);
}
function mouseWheel(event)
{
	var newZoom=screenControl.zoom-0.001*event.delta;
	if(int(sceneNo/10)==1 || sceneNo==31) screenControl.scale(newZoom,mouseX,mouseY);
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	var bannerH=min(width,height)/map(width/height,16/9,9/16,8,5)*5/3;
	screenControl.setBound(0,bannerH,width,height-bannerH);
	if(int(sceneNo/10)==1 || sceneNo==31) screenControl.limit();
}
//----------------------------------------------------------------------------------------------------------------------//

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
	for(i=0;i<2;i++)
	{
		resourceBox.map[i]=[];
		for(j=0;j<=6;j++)
		{
			if(i==0&&j!=1) continue;
			resourceBox.map[i][j]=new MAP_DATA();
			url="resource/map/"+i+"-"+j+".csv";
			callback=this.inputMapClosure(this,i,j);
			table=loadTable(url, "csv", "header", callback);
			this.max++;
		}
	}
	resourceBox.font[0]=loadFont("resource/font/NotoSans-Light.ttf",function(){this.count++;}.bind(this));
	resourceBox.font[1]=loadFont("resource/font/NotoSans-Regular.ttf",function(){this.count++;}.bind(this));
	resourceBox.font[2]=loadFont("resource/font/NotoSans-Medium.ttf",function(){this.count++;}.bind(this));
	this.max+=3;
}
LOADING.prototype.execute=function()
{
	background(0);
	fill(255);
	noStroke();
	rect(0,0,map(this.count,0,this.max,0,width),50);
	if(this.count==this.max) sceneNo=0;
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
		box.player[i]=[];
		box.enemy[i]=[];
		for(var j=0;j<box.column;j++)
		{
			s=split(table.getString(i,j),"|");
			box.kind[i][j]=int(s[0]);
			box.who[i][j]=int(s[1]);
			if(s[2]=="null")
			{
				box.player[i][j]=null;
				box.enemy[i][j]=null;
			}
			else if(int(s[2])>1000)
			{
				box.player[i][j]=null;
				box.enemy[i][j]=int(s[2]);
			}
			else
			{
				box.player[i][j]=int(s[2]);
				box.enemy[i][j]=null;
			}
		}
	}
	this.count++;
}

function INTRO()
{
	this.shade=[];
	this.tween=0;
	this.press=false;
	for(var i=0;i<4;i++)
	{
		this.shade[i]=[];
		for(var j=0;j<9;j++)
		{
			this.shade[i][j]=int(random(4))*5;
		}
	}
}
INTRO.prototype.execute=function()
{
	var base=min(width,height);
	var button=new BUTTON(width/2-base/8,height*9/16,base/4,base/4);
	if(this.tween>width/2)
	{
		sceneNo=1;
		return 0;
	}
	if(inputBroadcast.isMousePress&&button.mouseOn())
	{
		this.press=true;
	}
	if(this.press) this.tween+=this.tween/4+1;
	this.draw();
}
INTRO.prototype.draw=function()
{
	background(255);
	var base=min(width,height);
	var H=height/4;
	var logoSize;
	var windowRatio=width/height;
	if(windowRatio>=16/9) logoSize=width/2;
	else if(windowRatio<=9/16) logoSize=width*0.85;
	else logoSize=map(windowRatio,16/9,9/16,0.5,0.85)*width;
	UI.logo(width/2,height*9/32,logoSize);
	this.banner(base,H);
	if(this.tween>0) fill(236,240,241,255);
	else fill(255);
	UI.start_button(width/2,height*11/16,H/5);
	if(this.press)
	{
		fill(236,240,241,map(this.tween,0,width/2,255,0));
		UI.start_button(width/2,height*11/16,map(this.tween,0,width/2,H/5,H/2));
	}
}
INTRO.prototype.banner=function(base,H)
{
	var triW=H/8/cos(PI/6);
	var ox;
	var oy=height*9/16;
	noStroke();
	fill("#bdc3c7");
	rect(0,oy,width,H);
	if(this.press)
	{
		fill(255);
		rect(width/2-this.tween,oy-5,this.tween*2,H+5);
	}
	colorMode(HSB);
	for(var i=0;i<4;i++)
	{
		for(var pm=-1;pm<2;pm+=2)
		{
			ox=width/2+pm*base/8;
			for(var j=0;j<9;j++)
			{
				if(j==0&&(i==1||i==2)) continue;
				if(this.tween>base/8+triW*(j+1))
				{
					this.shade[i][j]=int(random(4))*5;
					fill(j*360/9,5+this.shade[i][j],100);
				}
				else fill(0,0,100-this.shade[i][j]);
				beginShape();
				vertex(ox+pm*triW*j,oy+H/4*(i+(i+j)%2));
				vertex(ox+pm*triW*(j+2),oy+H/4*(i+(i+j)%2));
				vertex(ox+pm*triW*(j+1),oy+H/4*(i+(i+j+1)%2));
				endShape(CLOSE);
			}
		}
	}
	colorMode(RGB);
}

function SELECTION()
{
	this.a="bla_bla";
}
SELECTION.prototype.mainSelect=function()
{
	var single=new HEXA_BUTTON(width/2-300,height/2,150);
	var multi=new HEXA_BUTTON(width/2+300,height/2,150);
	background(255);
	fill(_RED);
	hexagon(width/2-300,height/2,150);
	fill(_BLUE);
	hexagon(width/2+300,height/2,150);
	fill(255);
	textAlign(CENTER);
	textSize(36);
	text("single play",width/2-300,height/2);
	text("multi play",width/2+300,height/2);
	if(inputBroadcast.isMousePress)
	{
		if(single.mouseOn()) sceneNo=2;
		if(multi.mouseOn())
		{
			sceneNo=10;
			stream.world=0;
			stream.stage=1;
		}
	}
}
SELECTION.prototype.stageSelect_single=function()
{
	var stageButton=[];
	var coord;
	var w=45*(1.5*12+0.5);
	background(255);
	textAlign(CENTER);
	textSize(25);
	for(var i=0;i<2;i++)
	{
		for(var j=0;j<12;j++)
		{
			coord=new COORD(i,j);
			stageButton.push(new HEXA_BUTTON(width/2-w/2+coord.x(),height*2/5+coord.y(),36));
			if(i*12+j<6) fill(_BLUE);
			else fill(_DARK_WHITE);
			hexagon(width/2-w/2+coord.x(),height*2/5+coord.y(),36);
			fill(255);
			text(i*12+j+1,width/2-w/2+coord.x(),height*2/5+coord.y());
		}
	}
	if(inputBroadcast.isMousePress)
	{
		for(var i=0;i<6;i++)
		{
			if(stageButton[i].mouseOn())
			{
				sceneNo=10;
				stream.world=1;
				stream.stage=i+1;
				break;
			}
		}
	}
}
SELECTION.prototype.stageSelect_multi=function()
{
}

/**
 *
 * 인게임 클래스
 * 
 * @author steliviere
 * @date 2017.12.16
 * @version 0.8
 *
 */
function INGAME()
{
	/**
	 *
	 * @var {int} world		현재 레벨의 큰 스테이지 번호(0:멀티플레이)
	 * @var {int} stage		현재 레벨의 작은 스테이지 번호
	 * @var {FIELD} field		맵 필드
	 * @var {array|COORD} pLocation	플레이어와 적의 위치
	 * @var {OBJECT} P1area		플레이어/1p의 허브와 필러의 위치
	 * @var {OBJECT} P2area		적/2p의 허브와 필러의 위치
	 * @var {OBJECT} Nuarea		점령되지 않은 필러의 위치
	 * @var {PLAYER} p1		플레이어/1p
	 * @var {PLAYER/ENEMY} p2	적/2p
	 * @var {int} whosTurn		1p 턴:1, 2p 턴:2
	 * @var {int} turns		현재까지 경과된 턴수
	 * @var {int} currentP		선택된 캐릭터 (없을 시 -1)
	 * @var {int} moveCost		현재 플레이어의 이동 코스트
	 * @var {object} motionQueue	모션 broadcaster
	 *
	 */
	this.world=1, this.stage=1;
	this.field=null;
	this.pLocation=[];
	this.P1area={hub:null, filler:[]}, this.P2area={hub:null, filler:[]};
	this.Allarea={filler:[]};
	this.p1=null, this.p2=null;
	this.whosTurn=1;
	this.turns=0;
	this.currentP=-1;
	this.otherPlayerDialog=-1;
	this.other_dialogButton=null;
	this.enemyMoved=false;
	this.moveCost=5;
	this.motionQueue=[];
}
//-------------------------------------------------------setting method---------------------------------------------------------------//
INGAME.prototype.setup=function()
{
	/**
	 * 맵을 불러오고 각종 변수를 초기화한다.
	 */
	this.world=stream.world;
	this.stage=stream.stage;
	//map load
//	this.world=1;
//	this.stage=0;
	var mapData=resourceBox.map[this.world][this.stage].copy();
	this.field=new FIELD();
	this.field.makeField(mapData);
	//create players
	for(var i=0;i<this.field.Rows;i++)
	{
		this.pLocation[i]=[];
		for(var j=0;j<this.field.Columns;j++)
		{
			this.pLocation[i][j]=0;
			if(this.field.cells[i][j].kind==3)
			{
				if(this.field.cells[i][j].who==1) this.P1area.hub=new COORD(i,j);
				else this.P2area.hub=new COORD(i,j);
			}
			else if(this.field.cells[i][j].kind==4)
			{
				if(this.field.cells[i][j].who==1) this.P1area.filler.push(new COORD(i,j));
				else if(this.field.cells[i][j].who==2)  this.P2area.filler.push(new COORD(i,j));
				this.Allarea.filler.push(new COORD(i,j));
			}
		}
	}
	this.p1=this.playerCreate(mapData,1);
	if(this.world==_MULTIPLAY) this.p2=this.playerCreate(mapData,2);
	else
	{
		this.p2=this.enemyCreate(mapData);
		for(var no=0;no<this.p2.length;no++)
		{
			this.p2[no].setPath(this,this.P1area.hub);
		}
	}
	//reset other properties
	this.motionQueue=[];
	this.whosTurn=1;
	this.turns=1;
	this.moveCost=3+this.P1area.filler.length*2+this.p1.length*3;
	this.currentP=-1;
	this.enemyMoved=false;
	this.otherPlayerDialog=-1;
	this.other_dialogButton=new OTHER_DIALOGBUTTON();
	this.other_dialogButton.set(this,this.otherPlayerDialog);
	screenControl.set(this.field.w,this.field.h);
	var bannerH=min(width,height)/map(width/height,16/9,9/16,8,5)*5/3;
	screenControl.setBound(0,bannerH,width,height-bannerH);
	var bannerH=min(width,height)/map(width/height,16/9,9/16,8,5)*5/3;
	screenControl.setBound(0,bannerH,width,height-bannerH);
	sceneNo=11;
}
INGAME.prototype.playerCreate=function(data, who)
{
	/**
	 *
	 * 플레이어 배열을 생성한다.
	 *
	 * return {array|PLAYER}	플레이어 배열
	 *
	 */
	var res=[];
	var count=0;
	for(var i=0;i<data.row;i++)
	{
		for(var j=0;j<data.column;j++)
		{
			if(data.player[i][j]!=null)
			{
				if(int(data.player[i][j]/500)==who-1)
				{
					res.push(new PLAYER(i,j,data.player[i][j]-int(data.player[i][j]/500)*500,count,who));
					this.pLocation[i][j]=(3-who*2)*(count+1);
					count++;
				}
			}
		}
	}
	return res;
}
INGAME.prototype.enemyCreate=function(data)
{
	/**
	 *
	 * 적 배열을 생성한다.
	 *
	 * return {array|ENEMY}	적 배열
	 *
	 */
	var res=[];
	var count=0;
	for(var i=0;i<data.row;i++)
	{
		for(var j=0;j<data.column;j++)
		{
			if(data.enemy[i][j]!=null)
			{
				res.push(new ENEMY(i,j,data.enemy[i][j],count));
				this.pLocation[i][j]=-(count+1);
				count++;
			}
		}
	}
	return res;
}
//--------------------------------------------------------ingame method---------------------------------------------------------------//
INGAME.prototype.input=function()
{
	/**
	 * 플레이어의 입력을 받아 캐릭터 연산을 수행한다.
	 */
	var base=min(width,height)
	var clickSignal;
	var cSel;
	var selectContinue=false;
	var thisChara=null;
	var endTurnButton=new BUTTON(width-base*0.08-base/3.7,height-base*0.08-base/5.8,base/3.7,base/5.8);
	if(endTurnButton.mouseOn())
	{
		this.turnEnd();
		return false;
	}
	this.other_dialogButton.set(this,this.otherPlayerDialog);
	var dialogResult=this.other_dialogButton.mouseOn();
	if(this.otherPlayerDialog!=-1)
	{
		switch(dialogResult)
		{
			case "select":
				this.currentP=this.otherPlayerDialog;
				break;
			case "swap":
				if(this.whosTurn==1) thisChara=this.p1[this.currentP];
				else thisChara=this.p2[this.currentP];
				console.log(thisChara,this.currentP,this.other_dialogButton.pos);
				thisChara.move(this, this.other_dialogButton.pos);
				break;
		}
		this.otherPlayerDialog=-1;
		this.other_dialogButton.set(this,this.otherPlayerDialog);
		return false;
	}
	clickSignal=this.field.clickCheck();
	if(clickSignal!==null)
	{
		cSel=this.charaSelect(clickSignal.index);	//캐릭터를 클릭했는지를 파악함
		if(cSel!=-1) clickSignal.signal=_CHARA;
		console.log(clickSignal, this.pLocation, this.currentP);
		if(this.currentP==-1)	//캐릭터 선택이 안 된 상태일 때
		{
			if(clickSignal.signal==_CHARA)
			{
				if(this.whosTurn==1) thisChara=this.p1[cSel];
				else thisChara=this.p2[cSel];
				if(!thisChara.isStunned) this.currentP=cSel;
			}
//			else if(clickSignal.signal==_FILLER) this.filler();
		}
		else			//캐릭터 선택이 된 상태일 때
		{
			if(this.whosTurn==1) thisChara=this.p1[this.currentP];
			else thisChara=this.p2[this.currentP];
			if(hexCell_isLine(thisChara.coord,clickSignal.index)==-1)
			{
				clickSignal.signal=_NOMOVE;
			}
			else if(clickSignal.signal!=_CHARA&&hexCell_dist(thisChara.coord,clickSignal.index)>this.moveCost)
			{
				clickSignal.signal=_NOMOVE;
			}
			switch(clickSignal.signal)
			{
				case _CHARA:
					if(this.otherPlayerDialog==-1&&cSel!=this.currentP)
					{
						this.otherPlayerDialog=cSel;
						selectContinue=true;
					}
					this.other_dialogButton.set(this,this.otherPlayerDialog);
					break;
				case _MOVEABLE:
				case _FILLER:selectContinue=thisChara.move(this, clickSignal.index); break;
			}
			if(!selectContinue||clickSignal.signal==_NOMOVE) this.currentP=-1;
		}
	}
//	else this.currentP=-1;
}
INGAME.prototype.inputInterface=function()
{
	/**
	 * 적(AI)의 턴일 시, 인터페이스 부분만 클릭할 수 있게 한다.
	 */
	var clickSignal;
	clickSignal=this.field.clickCheck();
	if(clickSignal!==null)
	{
		if(clickSignal.signal==_BACK)	//뒤로가기 버튼 클릭 시
		{
			sceneNo=1;
			return false;
		}
		else if(clickSignal.signal==_SETTING)	//설정 버튼 클릭 시
		{
			popupNo=1;
			return false;
		}
	}
}
INGAME.prototype.enemyAI=function()
{
	/**
	 * 적(AI)의 움직임을 제어한다.
	 */
	var chara;
	var moveSync=0;
	if(this.enemyMoved==false)
	{
		for(chara of this.p2)
		{
			if(chara.isLive) chara.move(this);
		}
		this.syncMotion(0);
		this.enemyMoved=true;
	}
	else
	{
		this.turnEnd();
		this.enemyMoved=false;
	}
}
INGAME.prototype.interface=function()
{
	var chara;
	for(chara of this.p1)
	{
		if(chara.isLive) UI.CPmeter(chara.x,chara.y,chara.CP,chara.maxCP);
	}
	if(this.world==_MULTIPLAY)
	{
		for(chara of this.p2)
		{
			if(chara.isLive) UI.CPmeter(chara.x,chara.y,chara.CP,chara.maxCP);
		}
	}
	noFill();
	stroke(_YELLOW);
	strokeWeight(1.2);
	if(this.currentP!=-1)
	{
		if(this.whosTurn==1)
		{
			roundedHexagon(this.p1[this.currentP].x,this.p1[this.currentP].y,45);
			roundedHexagon(this.p1[this.currentP].x,this.p1[this.currentP].y,40);
		}
		else
		{
			roundedHexagon(this.p2[this.currentP].x,this.p2[this.currentP].y,45);
			roundedHexagon(this.p2[this.currentP].x,this.p2[this.currentP].y,40);
		}
	}
	this.other_dialogButton.draw();
	resetMatrix();
	UI.ingame_banner();
	UI.ingame_banner2(this.whosTurn);
	UI.ingame_status(this.whosTurn,this.turns,this.moveCost);
	if((this.world==_MULTIPLAY||this.whosTurn==1)&&sceneNo%2==1) UI.endTurn_button();
}
INGAME.prototype.draw=function()
{
	/**
	 * 현재 장면을 화면에 출력한다.
	 */
	var chara;
	background(255);
	screenControl.setScreen();
	this.field.draw();
	for(chara of this.p1)
	{
		if(chara.isLive) chara.draw();
	}
	for(chara of this.p2)
	{
		if(chara.isLive) chara.draw();
	}
	this.interface();
}
INGAME.prototype.turnEnd=function()
{
	var charas;
	if(this.whosTurn==1) charas=this.p1;
	else charas=this.p2;
	var moveSync=this.motionQueue.length;
	for(var chara of charas)
	{
		if(chara.isLive)
		{
			chara.attack(this, chara.coord);
			if(chara.isStunned!=undefined) chara.isStunned=false;
		}
	}
	this.syncMotion(moveSync);
	this.motionQueue.push({type:"end",result:[]});
}
INGAME.prototype.playerTurn=function()
{
	/**
	 * 플레이어의 턴
	 */
	if(inputBroadcast.isMousePress) this.input();
	this.draw();
	if(this.motionQueue.length>0) sceneNo++;
}
INGAME.prototype.enemyTurn=function()
{
	/**
	 * 적의 턴
	 */
	if(this.world==_MULTIPLAY) this.playerTurn();
	else
	{
		if(inputBroadcast.isMousePress) this.inputInterface();
		this.enemyAI();
		this.draw();
		console.log(this.motionQueue);
		if(this.motionQueue.length>0) sceneNo++;
	}
}
INGAME.prototype.charaSelect=function(coord)
{
	/**
	 *
	 * 클릭한 셀에 자신의 캐릭터가 있는지를 확인한다.
	 *
	 * param {COORD}	클릭한 셀
	 *
	 * return {array|ENEMY}	선택한 플레이어의 index No.(선택하지 않았을 시 -1)
	 *
	 */
	var buho;
	var res;
	if(this.whosTurn==1) buho=1;
	else buho=-1;
	res=this.pLocation[coord.row][coord.col];
	if(res*buho>0) return res*buho-1;
	else return -1;
}
//--------------------------------------------------------motion method---------------------------------------------------------------//
INGAME.prototype.motion=function()
{
	/**
	 * 모션 큐에 따라 캐릭터를 움직인다.
	 */
	var thisMotion=this.motionQueue[0];
	var who_;
	var i;
	var isPros=false;
	var threshMap;
	var isSceneChanged;
	// 캐릭터의 모션을 제어한다.
	if(thisMotion.type=="attack") screenControl.setScreen();
	for(i=0;i<thisMotion.result.length;i++)
	{
		who_=thisMotion.result[i].who;
		if(thisMotion.type=="move") isPros=who_.moveMotion(thisMotion.result[i].newCoord);
		else if(thisMotion.type=="attack") isPros=who_.attackMotion();
	}
	// 실제 화면을 출력한다.
	if(thisMotion.type!="attack")
	{
		this.draw();
	}
	else
	{
		threshMap=thisMotion.result[0].thresh.slice();
		for(i=0;i<thisMotion.result.length;i++)
		{
			for(var r=0;r<threshMap.length;r++)
			{
				for(var c=0;c<threshMap[r].length;c++)
				{
					threshMap[r][c]=threshMap[r][c]||thisMotion.result[i].thresh[r][c];
				}
			}
		}
		this.layer2();
		this.layer3(threshMap);
		var chara;
		for(chara of this.p1)
		{
			if(chara.isLive) chara.draw();
		}
		for(chara of this.p2)
		{
			if(chara.isLive) chara.draw();
		}
		this.interface();
	}
	// 모션이 끝난 후, 캐릭터의 상태를 변경시키고 큐를 한 칸 뽑아낸다.
	if(!isPros)
	{
		isSceneChanged=this.motionEnd(thisMotion);
		this.motionQueue.shift();
		if(this.motionQueue.length==0&&isSceneChanged==false) sceneNo--;
	}
}
INGAME.prototype.motionEnd=function(thisMotion)
{
	/**
	 *
	 * 모션이 끝난 후, 캐릭터의 상태를 변경시킨다.
	 *
	 * param {thisMotion}	현재 제어 중인 모션
	 *
	 */
	var i, who_;
	var r,c;
	var threshMap;
	var datum_=thisMotion.result.slice();
	if(thisMotion.type!="end") threshMap=datum_[0].thresh;
	for(i=0;i<datum_.length;i++)
	{
		who_=datum_[i].who;
		switch(thisMotion.type)
		{
			case "move":	//캐릭터의 위치와 배열상의 위치를 변경시킨다.
				who_.coord=datum_[i].newCoord.copy();
				if(this.pLocation[datum_[i].pCoord.row][datum_[i].pCoord.col]==(who_.arrNo+1)*(who_.who==1?1:-1))
				{
					this.pLocation[datum_[i].pCoord.row][datum_[i].pCoord.col]=0;
				}
				this.pLocation[datum_[i].newCoord.row][datum_[i].newCoord.col]=(who_.arrNo+1)*(who_.who==1?1:-1);
				break;
			case "attack":	//최종적으로 칠해질 맵의 배열을 정한다.
				for(r=0;r<threshMap.length;r++)
				{
					for(c=0;c<threshMap[r].length;c++)
					{
						threshMap[r][c]=threshMap[r][c]||datum_[i].thresh[r][c];
					}
				}
				break;
			case "hit":	//플레이어의 CP 등을 변경시킨다.
				if(datum_[i].stat=="damage") who_.hit();
				else who_.heal();
				break;
		}
	}
	//공격 시 필드를 공격자의 색으로 채운다.
	if(thisMotion.type=="attack")
	{
		for(r=0;r<threshMap.length;r++)
		{
			for(c=0;c<threshMap[r].length;c++)
			{
				if(threshMap[r][c]) this.field.cells[r][c].who=datum_[0].who.who;
			}
		}
	}
	if(thisMotion.type=="end")
	{
		this.turnEndSetting();
		return true;
	}
	return false;
}
INGAME.prototype.turnEndSetting=function()
{
	var livingChara=0;
	var i;
	this.currentP=-1;
	this.otherPlayerDialog=-1;
	this.other_dialogButton.set(this,this.otherPlayerDialog);
	if(this.field.cells[this.P1area.hub.row][this.P1area.hub.col].who==2)
	{
		sceneNo=16;
		return true;
	}
	else if(this.field.cells[this.P2area.hub.row][this.P2area.hub.col].who==1)
	{
		sceneNo=15;
		return true;
	}
	if(this.whosTurn==1)
	{
		this.whosTurn=2;
		this.fillerReset();
		this.moveCost=3+this.P2area.filler.length*2;
		for(i=0;i<this.p2.length;i++)
		{
			if(this.p2[i].isLive) livingChara++;
		}
		this.moveCost+=livingChara*3;
		sceneNo=13;
		return true;
	}
	else
	{
		this.whosTurn=1;
		this.fillerReset();
		this.moveCost=3+this.P1area.filler.length*2;
		for(i=0;i<this.p1.length;i++)
		{
			if(this.p1[i].isLive) livingChara++;
		}
		this.moveCost+=livingChara*3;
		sceneNo=11;
		this.turns++;
		return true;
	}
}
INGAME.prototype.fillerReset=function()
{
	this.P1area.filler=[];
	this.P2area.filler=[];
	for(var thisFiller of this.Allarea.filler)
	{
		if(this.field.cells[thisFiller.row][thisFiller.col].who==1)
		{
			this.P1area.filler.push(new COORD(thisFiller.row,thisFiller.col));
		}
		else if(this.field.cells[thisFiller.row][thisFiller.col].who==2)
		{
			this.P2area.filler.push(new COORD(thisFiller.row,thisFiller.col));
		}
	}
}
INGAME.prototype.syncMotion=function(bar)
{
	var moveMotions=[];
	var attackMotions=[];
	var hitMotions=[];
	var sync=this.motionQueue.slice(0,bar);
	var temp, a;
	var arrayLink=function(_p,q)
	{
		for(var i=0;i<q.length;i++)
		{
			_p.push(q[i]);
		}
		return _p;
	}
	for(var i=bar;i<this.motionQueue.length;i++)
	{
		if(this.motionQueue[i].type=="move")
		{
			if(temp!=this.motionQueue[i].result[0].who) a=0;
			else a++;
			if(moveMotions.length<=a) moveMotions.push([]);
			arrayLink(moveMotions[a],this.motionQueue[i].result);
			temp=this.motionQueue[i].result[0].who;
		}
		else if(this.motionQueue[i].type=="attack") arrayLink(attackMotions, this.motionQueue[i].result);
		else if(this.motionQueue[i].type=="hit") arrayLink(hitMotions, this.motionQueue[i].result);
	}
	for(var p=0;p<moveMotions.length;p++)
	{
		sync.push({type:"move",result:moveMotions[p]});
	}
	if(hitMotions.length!=0) sync.push({type:"hit",result:hitMotions});
	if(attackMotions.length!=0) sync.push({type:"attack",result:attackMotions});
	this.motionQueue=sync;
}
INGAME.prototype.layer2=function()
{
	//f**king p5.js!
	//Why does not p5.js support clipping masks?
	var field=this.field;
	var cells=this.field.cells;
	fill(255);
	noStroke();
	beginShape();
	vertex(-900,-900);
	vertex(-900,field.h+900);
	vertex(field.w+900,field.h+900);
	vertex(field.w+900,-900);
	for(var i=0;i<field.Rows;i++)
	{
		for(var j=0;j<field.Columns;j++)
		{
			if(detectCell(cells[i][j].kind)!=0)
			{
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r);
				endContour();
			}
			else if(cells[i][j].kind!=0)
			{
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r-1.25);
				endContour();
				beginContour();
				roundedHexagonRaw(cells[i][j].x,cells[i][j].y,cells[i][j].r+1.25);
				endContour();
			}
		}
	}
	endShape();
}
INGAME.prototype.layer3=function(thresh)
{
	for(var i=0;i<this.field.Rows;i++)
	{
		for(var j=0;j<this.field.Columns;j++)
		{
			if(!thresh[i][j]) this.field.cells[i][j].draw();
			else this.field.cells[i][j].drawUpper();
		}
	}
}
//--------------------------------------------------------result method---------------------------------------------------------------//
INGAME.prototype.victory=function()
{
	background(255);
	fill(_BLACK);
	textAlign(CENTER);
	textSize(65);
	if(this.world!=_MULTIPLAY) text("victory!",width/2,height*2/5);
	else text("player 1 win!",width/2,height*2/5);
	noStroke();
	textSize(32);
	fill(_RED);
	hexagon(width/2-150,height*2/3,50);
	fill(255);
	text("menu",width/2-150,height*2/3);
	fill(_BLUE);
	hexagon(width/2+150,height*2/3,50);
	fill(255);
	text("next",width/2+150,height*2/3);
	var menuButton=new HEXA_BUTTON(width/2-150,height*2/3,50);
	var nextButton=new HEXA_BUTTON(width/2+150,height*2/3,50);
	if(inputBroadcast.isMousePress)
	{
		if(menuButton.mouseOn())
		{
			sceneNo=1;
		}
		else if(nextButton.mouseOn())
		{
			sceneNo=10;
			if(this.stage!=6&&this.world!=_MULTIPLAY)
			{
				stream.world=this.world;
				stream.stage=this.stage+1;
			}
			else
			{
				stream.world=this.world;
				stream.stage=this.stage;
			}
			/*
			if(this.stage==24)
			{
				stream.world=this.world+1;
				stream.stage=1;
			}
			else
			{
				stream.world=this.world;
				stream.stage=this.stage+1;
			}
			*/
		}
	}
}
INGAME.prototype.gameover=function()
{
	background(255);
	fill(_BLACK);
	textAlign(CENTER);
	textSize(65);
	if(this.world!=_MULTIPLAY) text("game over...",width/2,height*2/5);
	else text("player 2 win!",width/2,height*2/5);
	noStroke();
	textSize(32);
	fill(_RED);
	hexagon(width/2-150,height*2/3,50);
	fill(255);
	text("menu",width/2-150,height*2/3);
	fill(_BLUE);
	hexagon(width/2+150,height*2/3,50);
	fill(255);
	text("retry",width/2+150,height*2/3);
	var menuButton=new HEXA_BUTTON(width/2-150,height*2/3,50);
	var retryButton=new HEXA_BUTTON(width/2+150,height*2/3,50);
	if(inputBroadcast.isMousePress)
	{
		if(menuButton.mouseOn())
		{
			sceneNo=1;
		}
		else if(retryButton.mouseOn())
		{
			sceneNo=10;
			stream.world=this.world;
			stream.stage=this.stage;
		}
	}
}
