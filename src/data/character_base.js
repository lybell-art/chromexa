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
