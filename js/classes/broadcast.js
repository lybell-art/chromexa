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
