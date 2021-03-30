//declaring array
  var temps = [];
  var tempm = [];
  var tempq = [];
  var tempr = [];
  var arr = [];
  for(var i = 0; i<136; i++){
    var n = Math.floor(Math.random()*240);
    arr.push(n+20);
    temps.push(n+20);
    tempm.push(n+20);
    tempq.push(n+20);
    tempr.push(n+20);
    $( ".selection" ).append( "<div >.</div>" );
    $( ".merge" ).append( "<div >.</div>" );
    $( ".quick" ).append( "<div >.</div>" );
    $( ".radix" ).append( "<div >.</div>" );
  }

  console.log(document.querySelectorAll(".selection div"));

  for(var i = 0; i < 136; i++){
    document.querySelectorAll(".selection div")[i].setAttribute("style" , "height:" + arr[i] + "px;");
    document.querySelectorAll(".merge div")[i].setAttribute("style" , "height:" + arr[i] + "px;");
    document.querySelectorAll(".quick div")[i].setAttribute("style" , "height:" + arr[i] + "px;");
    document.querySelectorAll(".radix div")[i].setAttribute("style" , "height:" + arr[i] + "px;");
  }

//sort triggers
var ts=0;
var tm=0;
var tq=0;
var tr=0;

function doSetTimeout(i , j , t1 , t2) {
  setTimeout(function() {
  if(t1>t2){
    i.style.height = t2 + "px";
    j.style.height = t1 + "px";
  }
   }, (ts++)*5);
 }

function doMerge(x , i){
  setTimeout(function() {
  x.style.height = i + "px"; }, (tm++)*5);
}

function doQuick(xa , ia , xb , ib){
  setTimeout(function() {
    xa.style.height = ia + "px";
 xb.style.height = ib + "px";}, (tq++)*5);
}

function doRadix(x , i){
  setTimeout(function() {
  x.style.height = i + "px"; }, (tr++)*5);
}

function merge(i , mid , f){
  var x  = document.querySelectorAll(".merge div");
  if(f-i==1){
    if(tempm[i]>tempm[f]){
      var tp = tempm[i];
      tempm[i]=tempm[f];
      doMerge(x[i] , tempm[f]);
      tempm[f]=tp;
      doMerge(x[f] , tp);
    }
  }
  else if(f-i>1){
    var tempma = [];
    var tempmb = [];
    for(var j = i; j<=mid; j++){
      tempma.push(tempm[j]);
    }
    for(var j = mid+1; j<=f; j++){
      tempmb.push(tempm[j]);
    }
    var a = 0;
    var b = 0;
    var an = mid-i;
    var bn = f-mid-1;
    while(a<=an || b<=bn){
      if(a<=an && b<=bn){
        if(tempma[a]>tempmb[b]){
          tempm[i+a+b] = tempmb[b];
          doMerge(x[i+a+b] , tempmb[b]);
          b++;
        }
        else{
          tempm[i+a+b] = tempma[a];
          doMerge(x[i+a+b] , tempma[a]);
          a++;
        }
      }
      else if(a>an){
        tempm[i+a+b] = tempmb[b];
        doMerge(x[i+a+b] , tempmb[b]);
        b++;
      }
      else if(b>bn){
        tempm[i+a+b] = tempma[a];
        doMerge(x[i+a+b] , tempma[a]);
        a++;
      }
    }
  }
};

function devide(i , f){
  if(f-i>=1){
    var mid = Math.floor((i+f)/2);
    devide(i , mid);
    devide(mid+1 , f);
    merge(i , mid , f);
  }
}

function partition (low, high){
  var x  = document.querySelectorAll(".quick div");
    var pivot = tempq[high];
    var i = (low - 1);

    for (var j = low; j <= high - 1; j++)
    {
        if (tempq[j] < pivot)
        {
            i++;
            var tp = tempq[i];
            tempq[i] = tempq[j];
            tempq[j] = tp;
            doQuick(x[i] , tempq[i] , x[j] , tempq[j]);
        }
    }
    var tp = tempq[i+1];
    tempq[i+1] = tempq[high];
    tempq[high] = tp;
    doQuick(x[i+1] , tempq[i+1] , x[high] , tempq[high]);
    var pi = i+1;
    return pi;
}

function quick(i , f){
      if (i < f)
      {
          var pi = partition(i, f);
          quick(i, pi - 1);
          quick(pi + 1, f);
      }
}

function radix(exp){
  var x  = document.querySelectorAll(".radix div");
  var output = [];
  for(var i = 0; i < 136; i++){
    output.push(0);
  }
    var count = [];
    for(var i = 0; i < 10; i++){
      count.push(0);
    }
    for (var i = 0; i < 136; i++)count[(Math.floor(tempr[i] / exp)) % 10]++;
    for (var i = 1; i < 10; i++)count[i] += count[i - 1];
    for (var i = 135; i >= 0; i--) {
        output[count[(Math.floor(tempr[i] / exp)) % 10] - 1] = tempr[i];
        count[(Math.floor(tempr[i] / exp)) % 10]--;
    }
    for (var i = 0; i < 136; i++)
        {tempr[i] = output[i];
        doRadix(x[i] , tempr[i]);
      }
}

  document.getElementById("sort").addEventListener('click',function ()
  {
    var i =0;
    var j=1;
    for(var i = 0; i<135; i++){
      for(var j=i+1; j<136; j++){
        var x = document.querySelectorAll(".selection div");
          doSetTimeout(x[i] , x[j] , temps[i] , temps[j]);
          if(temps[i]>temps[j]){
            var tp = temps[i];
            temps[i] = temps[j];
            temps[j] = tp;
          }
      }
    }

    devide(0 , 135);

    quick(0 ,135);

    for (var exp = 1; Math.floor(520/exp) > 0; exp *= 10)radix(exp);
  }  );
