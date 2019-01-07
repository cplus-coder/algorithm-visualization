var speed = 500 / 1;
var timer = null;
var data = [];
var pillarIndex = [ null, null, null, null ];
var step = [];
var banPlayValue = false;
export var rValue;
var r1 = 0;
var towerNums = 3;
export var NowStep;
export var AllstepNum;
function initData(_data) {
		data.length = 0;
		pillarIndex = [ null, null, null, null ];
		step.length = 0;
		NowStep = 0;
		console.log(data);
		console.log(step);
		pillarIndex[0] = _data.length-1;
		//data = deepClone(_data);
		for(let i = 0; i < _data.length; i++)
		/*{
			data[i].index = i;
			data[i].next = i-1;
			data[i].pillar = 0;
			data[i].depth = i;
		}*/
		data.push({ pillar: 0, depth: i, index: i, next: i-1});
		data[0].next = null;
		let dataArr = [];
		dataArr = deepClone(data);
		step.push(dataArr);
		switch(towerNums){
			case 3:
				hanoi3(_data.length,0,1,2);
				rValue = null;
				break;
			case 4:
				if(r1)	hanoi5(_data.length, r1, 0, 1, 2, 3);
				else hanoi4(_data.length,0,1,2,3);
				break;
			default:
				break;

		}
		console.log(step);
}

function hanoi5(n, r, a, b, c, d){
	console.log(r);
		if(n==1)
	        movie(a,d);
	    else if( n == 2)
	    {
	        movie(a,b);
	        movie(a,d);
	        movie(b,d);
		}
		else{
		hanoi4(r, a, c, d, b);
		hanoi3(n-r, a, c, d);
		hanoi4(r, b, a, c, d);
		}
}

function hanoi4(n, a, b, c, d) {
		let i,r, k;
		if(n===0) return ;
		else if(n === 1){
			movie(a,d);
		}
		else if( n === 2)
	    {
	        movie(a,b);
	        movie(a,d);
	        movie(b,d);
	    }
		else{
			for(i = 2, r = 0, k = n; k > 0; r++,i++)
				k = k-i;
			hanoi4(n-r, a, c, d, b);
			hanoi3(r, a, c, d);
			hanoi4(n-r, b, a, c, d);
			
		}
		if(r1==0)	rValue = r;
}

function hanoi3(n, a, b, c) {
		if(n >= 1){
			hanoi3(n-1, a, c, b);
			movie(a,c);
			hanoi3(n-1, b, a, c);
		}
}

function movie(a,b) {
		let dataArr = [];
		let from = pillarIndex[a];
		let to = pillarIndex[b];
		data[from].pillar = b;
		if(pillarIndex[b] == null)	data[from].depth = 0;
		else data[from].depth = data[to].depth+1;
		pillarIndex[a] = data[from].next;
		data[from].next = to;
		pillarIndex[b] = data[from].index;
		dataArr = deepClone(data);
		step.push(dataArr);
}

function deepClone(data) {
		  var t = typeof(data), o, i, ni;
		   
		  if(t === 'array') {
		    o = [];
		  }else if( t === 'object') {
		    o = {};
		  }else {
		    return data;
		  }
		   
		  if(t === 'array') {
		    for (i = 0, ni = data.length; i < ni; i++) {
		      o.push(deepClone(data[i]));
		    }
		    return o;
		  }else if( t === 'object') {
		    for( i in data) {
		      	o[i] = deepClone(data[i]);
		    }
		    return o;
		  }
}

function deleteOtherData(){
	let arr = Object.keys(data);
	let length = arr.length;
		for (let i = 0; i < step.length; i++)
			for (let j = 0; j < length; j++) {
				delete step[i][j].index;
				delete step[i][j].next;
		}
}

function getDataIndex(data)
{
		for (let i = 0; i < step.length; i++) {
			var n = 0;
			for(let j = 0; j < data.length; j++)
			{
				if(step[i][j].pillar === data[j].pillar && step[i][j].depth === data[j].depth)
					n++;
				if(n === data.length)
					return i;
			}
		}
}

function getArrIndex(data)
{
	for(let i = 0; i < step.length; i++)
		if(data === step[i])
			return i;
}

export function getPreData(setData,data)
{
		NowStep = getDataIndex(data);
		if(NowStep === 0)
		{
			alert('当前为第一步，没有上一步操作！');
			return;
		}
		setData(objectToArray(step[--NowStep]));
}

export function getNextData(setData,data)
{
		NowStep = getDataIndex(data);
		if(NowStep === step.length-1)
		{
			alert('当前为最后步，没有下一步操作！');
			return;
		}
		setData(objectToArray(step[++NowStep]));
}
/*
function getNextStepData(data)
{
		var i;
		i = getArrIndex(data);
		if(i === step.length-1)
			return false;
		i++;
		console.log(objectToArray(step[i]));
		return objectToArray(step[i]);
}

function getPreStepData(data)
{
		var i;
		i = getArrIndex(data);
		if(i === 0)
			return false;
		i--;
		return objectToArray(step[i]);
}
*/

function objectToArray(obj)
{
	let arr = Object.keys(obj);
	let array = [];
	for(let i = 0; i < arr.length; i++)
	{
		array.push({pillar:obj[i].pillar,depth:obj[i].depth});
	}
	return array;
}

export function playAllData(setData, data)
{
	//initData(data);
	//deleteOtherData();
	banPlayValue = false;
	NowStep = getDataIndex(data);
	if(NowStep === step.length-1)
	{
		NowStep = 0;
		setData(objectToArray(step[NowStep]));
	}
	const playAnimation = () => {
		if(banPlayValue)	return;
		clearTimeout(timer);
		setData(objectToArray(step[++NowStep]));
		if (NowStep === step.length-1)	return;
		setTimeout(playAnimation, speed);
	}
	playAnimation();
	// const timer = setInterval(() => {
	// 	setData(getNextData(step[index++]));
	// 	if (index === step.length - 1) clearInterval(timer);
	// }, speed);
};

export function getNewInitData(data) {
	banPlay();
	console.log(data);
	initData(data);
	AllstepNum = step.length;
	r1 = 0;
	deleteOtherData();
};

export function getSpeed(changedSpeed) {
	speed = changedSpeed;
};

export function banPlay()
{
	banPlayValue = true;
}

export function getTowerNums(setTowerNums, value, setData){
	setTowerNums(value);
	towerNums = parseInt(value);
	r1 = 0;
	var oldData = [];
	oldData = deepClone(data);
	getNewInitData(objectToArray(oldData));
	setData(objectToArray(step[0]));
}

export function setRValue(setData,value)
{
	r1 = value;
	var oldData = [];
	oldData = deepClone(data);
	getNewInitData(objectToArray(oldData));
	setData(objectToArray(step[0]));
}