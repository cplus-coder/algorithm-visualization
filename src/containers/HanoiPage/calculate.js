//import {setData} from './index.jsx'
var data = [];
var pillarIndex = [ null, null, null, null ];
var step = [];
function initData(_data) {
		pillarIndex[0] = _data.length-1;
		data = deepClone(_data);
		for(let i = 0; i < _data.length; i++)
		{
			data[i].index = i;
			data[i].next = i-1;
		}
		data[0].next = null;
		let dataArr = [];
		dataArr = deepClone(data);
		step.push(dataArr);
		hanoi4(_data.length,0,1,2,3);
		console.log(step);
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

/*function count(o){

		var t = typeof o;

		if(t === 'string'){
		return o.length;

		}else if(t === 'object'){

		var n = 0;
		for(const i in o){

		n++;

		}

		return n;
		}
		return false;

}
*/
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

export function getPreData(data)
{
		var i;
		i = getArrIndex(data);
		if(i === 0)
			return false;
		i--;
		return objectToArray(step[i]);
}

export function getNextData(data)
{
		var i;
		i = getArrIndex(data);
		if(i === step.length-1)
			return false;
		i++;
		return objectToArray(step[i]);
}


function sleep(delay) {
		  var start = (new Date()).getTime();
		  while ((new Date()).getTime() - start < delay) {
		    continue;
  }
}

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

export function playAllData(setData,data)
{
		initData(data);
		deleteOtherData();
		let index = getDataIndex(data);
		console.log(index);
		while(index < step.length-1)
		{
			sleep(1000);
			console.log(getNextData(step[index]));
			setData(getNextData(step[index]));
			index++;
		}
}

