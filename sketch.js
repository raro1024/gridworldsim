var grid={}
var newgrid={}
var dr=0.8
var mf=0.1
var sk=0.00
var discount=0.9
var start="3-1"
var x=5;
var y=5;
var hardset=["4-1","4-2","2-2"]
var walls=["2-2"]
var white;
function setup() {
	createCanvas(x*100, y*100);
	for(var i=1;i<=x;i++)
	{
	    for(var j=1;j<=4;j++)
	    {
	        grid[i+"-"+j]=0
	    }
	}
	grid["4-1"]=1
	grid["4-2"]=-1


}
function newit(its)
{
    newgrid={...grid}//copy dict by val
	recalc(its)
	grid={...newgrid}//copy dict by val
}
function drawNumber()
{

    for (var key in grid)
    {
        textSize(16);
        fill(color('rgba(255, 255, 255, 1)'));
        text(grid[key], parseInt(key.split("-")[0]*100-50), parseInt(key.split("-")[1]*100-50) );

    }
}
function isWall(key)
{
    return walls.indexOf(key)>-1;
}
function drawBackground()
{
for (var i = 0; i < x; i++) {
		for (var j = 0; j < y; j++) {
		    stroke(255);
		    var key=(i+1)+"-"+(j+1);
		    if (!isWall(key))
		    {
                if (grid[key]<0)
                {
                    var c = color("rgba(255, 0, 0, 1)")
                }
                else
                {
                    var c = color("rgba(0, 255, 0, "+grid[key]+")")
                }
		    }
		    else
		    {
		        var c = color("rgba(71, 69, 63)")
		    }

            fill(c);
			rect(100*i, 100*j, 100, 100);

		}
	}
}
function draw() {
	background(0);
	drawBackground();
	drawNumber()

}

function calcval(key)
{
currentpos=[parseInt(key.split("-")[0]),parseInt(key.split("-")[1])]
var ds={
        "u":addtuppel(currentpos,[0,-1]),
        "d":addtuppel(currentpos,[0,1]),
        "l":addtuppel(currentpos,[-1,0]),
        "r":addtuppel(currentpos,[1,0]),

        }
        var up=parseFloat((discount*(dr*getValxy(ds["u"])+mf*getValxy(ds["l"])+mf*getValxy(ds["r"]))-sk).toFixed(2))
        var down=parseFloat((discount*(dr*getValxy(ds["d"])+mf*getValxy(ds["l"])+mf*getValxy(ds["r"]))-sk).toFixed(2))
        var left=parseFloat((discount*(dr*getValxy(ds["l"])+mf*getValxy(ds["u"])+mf*getValxy(ds["d"]))-sk).toFixed(2))
        var right=parseFloat((discount*(dr*getValxy(ds["r"])+mf*getValxy(ds["u"])+mf*getValxy(ds["d"]))-sk).toFixed(2))
        var vals=[up,down,left,right]
        var max=Math.max(...vals)
    return [max,vals.indexOf(max)]
}
function addtuppel(a,b){return [a[0]+b[0],a[1]+b[1]]}

function getValxy(t)
{

        if(grid[t[0]+"-"+t[1]]!=undefined && walls.indexOf(t[0]+"-"+t[1])==-1)
        {
            return grid[t[0]+"-"+t[1]]
        }

        return grid[currentpos[0]+"-"+currentpos[1]]

}
function recalc(its)
{
    var keys = [start]

       for(var i=1 ;i<its;i++)
       {
        keys=getNeighbors(keys,start)
       }

    for(var key in keys)
    {
        newgrid[keys[key]]=calcval(keys[key])[0]

    }

}
function getNeighbors(keys,key)
{
    var newkeys=keys
    for(var k in keys)
    {
        var  t  = [parseInt(keys[k].split("-")[0]),parseInt(keys[k].split("-")[1])]
        var ds={
            "u":addtuppel(t,[0,-1]),
            "d":addtuppel(t,[0,1]),
            "l":addtuppel(t,[-1,0]),
            "r":addtuppel(t,[1,0]),

            }
        for(d in ds)
        {
            if(grid[ds[d][0]+"-"+ds[d][1]]!=undefined && hardset.indexOf(ds[d][0]+"-"+ds[d][1])<0 && newkeys.indexOf(ds[d][0]+"-"+ds[d][1])<0)
            {
                newkeys.push(ds[d][0]+"-"+ds[d][1])
            }
        }
    }
    return newkeys

}
