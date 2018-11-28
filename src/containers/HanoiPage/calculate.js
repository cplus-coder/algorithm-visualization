var data = new Array();
var pillarIndex = [ null, null, null, null ];
var step = new Array();
function initData(num) {
		let n = num;
		pillarIndex[0] = num-1;
		while(num--)
		{
			data.unshift({
				index:num,
				pillar: 0,
				depth: num,
				next: num-1
			});
		}
		data[0].next = null;
		let dataArr = new Array();
		dataArr = deepClone(data);
		step.push(dataArr);
		hanoi4(n,0,1,2,3);
		console.log(step);
}

function hanoi4(n, a, b, c, d) {
		let i,r, k;
		if(n==0) return ;
		else if(n == 1){
			movie(a,d);
		}
		else if( n == 2)
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
		let dataArr = new Array();
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
		for (let i = 0; i < step.length; i++)
			for (let j = 0; j < data.length; j++) {
				delete step[i][j].index;
				delete step[i][j].next;
		}
}

function getDataIndex(data)
{
		for (let i = 0; i < step.length; i++) {
			if(step[i] === data)
				return i;
		}
}

function getPreData(data)
{
		var i;
		i = getDataIndex(data);
		if(i === 0)
			return false;
		i--;
		return step[i];
}

function getNextData(data)
{
		var i;
		i = getDataIndex(data);
		if(i === step.length)
			return false;
		i++;
		return step[i];
}

function sleep(delay) {
		  var start = (new Date()).getTime();
		  while ((new Date()).getTime() - start < delay) {
		    continue;
  }
}

function playAllData(data)
{
		let index = getDataIndex(data);
		while(index < step.length)
		{
			sleep(1000);
			getNextData(step[index]);
			index++;
		}

}

