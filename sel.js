//declaring array
  var temp = [];
  var arr = [];
  for(var i = 0; i<178; i++){
    var n = Math.floor(Math.random()*500);
    arr.push(n+20);
    temp.push(n+20);
    $( "body" ).append( "<div >.</div>" );
  }
  for(var i = 0; i < 178; i++){
    document.querySelectorAll("div")[i].setAttribute("style" , "height:" + arr[i] + "px;");
  }

//sort triggers
var t=0;

function doSetTimeout(i , j , t1 , t2) {
  setTimeout(function() {
  if(t1>t2){
    i.style.height = t2 + "px";
    j.style.height = t1 + "px";
  }
   }, (t++)*5);
 }

function doMerge(x , i){
  setTimeout(function() {
  x.style.height = i + "px"; }, (t++)*5);
}

function doQuick(xa , ia , xb , ib){
  setTimeout(function() {
    xa.style.height = ia + "px";
 xb.style.height = ib + "px";}, (t++)*5);
}

function doRadix(x , i){
  setTimeout(function() {
  x.style.height = i + "px"; }, (t++)*5);
}

document.getElementById("selection").addEventListener('click',function ()
{ t=0;
  var i =0;
  var j=1;
  for(var i = 0; i<177; i++){
    for(var j=i+1; j<178; j++){
      var x = document.querySelectorAll("div");
        doSetTimeout(x[i] , x[j] , temp[i] , temp[j]);
        if(temp[i]>temp[j]){
          var tp = temp[i];
          temp[i] = temp[j];
          temp[j] = tp;
        }
    }
  }
}  );






function merge(i , mid , f){
  var x  = document.querySelectorAll("div");
  if(f-i==1){
    if(temp[i]>temp[f]){
      var tp = temp[i];
      temp[i]=temp[f];
      doMerge(x[i] , temp[f]);
      temp[f]=tp;
      doMerge(x[f] , tp);
    }
  }
  else if(f-i>1){
    var tempa = [];
    var tempb = [];
    for(var j = i; j<=mid; j++){
      tempa.push(temp[j]);
    }
    for(var j = mid+1; j<=f; j++){
      tempb.push(temp[j]);
    }
    var a = 0;
    var b = 0;
    var an = mid-i;
    var bn = f-mid-1;
    while(a<=an || b<=bn){
      if(a<=an && b<=bn){
        if(tempa[a]>tempb[b]){
          temp[i+a+b] = tempb[b];
          doMerge(x[i+a+b] , tempb[b]);
          b++;
        }
        else{
          temp[i+a+b] = tempa[a];
          doMerge(x[i+a+b] , tempa[a]);
          a++;
        }
      }
      else if(a>an){
        temp[i+a+b] = tempb[b];
        doMerge(x[i+a+b] , tempb[b]);
        b++;
      }
      else if(b>bn){
        temp[i+a+b] = tempa[a];
        doMerge(x[i+a+b] , tempa[a]);
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
    var x  = document.querySelectorAll("div");
      var pivot = temp[high];
      var i = (low - 1);

      for (var j = low; j <= high - 1; j++)
      {
          if (temp[j] < pivot)
          {
              i++;
              var tp = temp[i];
              temp[i] = temp[j];
              temp[j] = tp;
              doQuick(x[i] , temp[i] , x[j] , temp[j]);
          }
      }
      var tp = temp[i+1];
      temp[i+1] = temp[high];
      temp[high] = tp;
      doQuick(x[i+1] , temp[i+1] , x[high] , temp[high]);
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
    var x  = document.querySelectorAll("div");
    var output = [];
    for(var i = 0; i < 178; i++){
      output.push(0);
    }
      var count = [];
      for(var i = 0; i < 10; i++){
        count.push(0);
      }
      for (var i = 0; i < 178; i++)count[(Math.floor(temp[i] / exp)) % 10]++;
      for (var i = 1; i < 10; i++)count[i] += count[i - 1];
      for (var i = 177; i >= 0; i--) {
          output[count[(Math.floor(temp[i] / exp)) % 10] - 1] = temp[i];
          count[(Math.floor(temp[i] / exp)) % 10]--;
      }
      for (var i = 0; i < 178; i++)
          {temp[i] = output[i];
          doRadix(x[i] , temp[i]);
        }
  }
