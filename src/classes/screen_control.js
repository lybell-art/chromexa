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
}
SCREEN_CONTROL.prototype.set=function(w,h)
{
	this.w=w;
	this.h=h;
	this.ox=(width-w)/2;
	this.oy=(height-h)/2;
	this.zoom=1;
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
	var zoomMin=min(width/this.w,height/this.h,1);
	this.zoom=constrain(this.zoom,zoomMin,4);
	var wLimit=width-this.w*this.zoom;
	var hLimit=height-this.h*this.zoom;
	if(wLimit<0) this.ox=constrain(this.ox,wLimit,0);
	else this.ox=wLimit/2;
	if(hLimit<0) this.oy=constrain(this.oy,hLimit,0);
	else this.oy=hLimit/2;
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
