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
function setup()
{
	createCanvas(windowWidth,windowHeight);
	//class definition
//	loading=new LOADING();
//	intro=new INTRO();
//	selection=new SELENTION();
//	manageChara=new MANAGE_CHARA();
//	sandBox=new SANDBOX();
	ingame=new INGAME();
//	popup=new POPUP();
	inputBroadcast=new BROADCAST();
	screenControl=new SCREEN_CONTROL(width,height);
	//load data
//	loading.dataLoad();
}
function draw()
{
	inputBroadcast.renew();
	ingame.execute();
//	if(popupNo==0) sceneExecute();
//	else popupExecute();
}
function sceneExecute()
{
	switch(sceneNo)
	{
//		case -1:loading.execute(); break;
//		case 0:intro.execute(); break;
//		case 1:selection.mainSelect(); break;
//		case 2:selection.stageSelect_single(); break;
//		case 3:selection.modeSelect_multi(); break;
//		case 4:selection.stageSelect_multi(); break;
//		case 10:ingame.setup(); break;
//		case 11:ingame.playerTurn(); break;
//		case 12:ingame.playerTurn_motion(); break;
//		case 13:ingame.enemyTurn(); break;
//		case 14:ingame.enemyTurn_motion(); break;
//		case 15:ingame.result(); break;
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
	broadcast.isMousePress=true;
	broadcast.dmouseX=mouseX;
	broadcast.dmouseY=mouseY;
}
function mouseDragged()
{
	var deltaX=mouseX-broadcast.dmouseX;
	var deltaY=mouseY-broadcast.dmouseY;
	if(sceneNo%10==1 || sceneNo==31) screenControl.move(deltaX,deltaY);
}
function mouseWheel(event)
{
	var newZoom=screenControl.zoom+0.001*event.delta;
	if(sceneNo%10==1 || sceneNo==31) screenControl.scale(newZoom,mouseX,mouseY);
}
