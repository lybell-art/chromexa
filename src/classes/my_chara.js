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
