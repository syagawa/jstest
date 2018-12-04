const generator = {
  test: function(){
    const Gfn = function* (){
      var a = yield "first";
      var b = yield "second";
      yield a + b;
    };
    let g1 = Gfn();
    console.log(g1);
    for(let elm of g1){
      console.log("g1:", elm);
    }

    let g2 = Gfn();
    console.log("g2:", g2.next());
    console.log("g2:", g2.next(4));
    console.log("g2:", g2.next(8));
    console.log("g2:", g2.next());

    const GfnArray = function* (){
      let a = yield "aaa";
      yield* [12, 3, 4, a];
    };

    let g3 = GfnArray();
    for(let elm of g3){
      console.log("g3:", elm);
    }

    let g4 = GfnArray();
    console.log("g4:", g4.next());
    console.log("g4:", g4.next(2));
    console.log("g4:", g4.next());
    console.log("g4:", g4.next());
    console.log("g4:", g4.next());

    let GfnParam = function * (num) {
      num++;
      yield num;
      num *= 3;
      yield num;
      num = 2;
      yield num;
      num *= 15;
      yield num;
    };
    let g5 = GfnParam(55);
    for(let elm of g5){
      console.log("g5:", elm);
    }
  },
  asyncAlert: function(){
    const Gfn = function*(){
      alert("first");
      yield;
      alert("second");
      yield;
      alert("last");
      yield;
    };
    const g = Gfn();
    document.addEventListener("click", function(){
      g.next();
    });
  },
  fibonacci: function(){
    const Fib = function*(){
      let a = 0, b = 1, temp;
      while(true){
        temp = a + b;
        a = b;
        b = temp;
        yield a;
      }
    };
    const f = Fib();
    for(let n of f){
      if(n > 1000){
        break;
      }
      console.log(n);
    }
  },
  combo: function(){
    const com = function*(arr, len){
      yield* (function* Gfn(res, arr){
        if(res.length < len){
          for(let i = 0; i < arr.length - len + res.length + 1; i++){
            yield* Gfn(res.concat(arr[i]), arr.slice(i + 1));
          }
        }else{
          yield res;
        }
      })([], arr);
    };

    for(let a of com([1,2,3], 2)){
      console.log(a);
    }
  },
  easyAsync: function(){
    const Asy = function*(){
      alert("first");
      yield function(cb){
        setTimeout(cb, 2000);
      };
      alert("after 2sec");
      yield function(cb){
        document.addEventListener("click", function(){
          cb();
        });
      };
      alert("click");
      let source = yield function(cb){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", location.href, true);
        xhr.send(null);
        xhr.onload = function(){
          cb(xhr.responseText);
        };
      };
      alert("page source is " + source.length);
    };

    const g = Asy();
    (function cb(val){
      let res = g.next(val);
      if(!res.done){
        res.value(cb);
      }
    })();
  }

};




export default generator;

/*
Reference documents & web pages

https://qiita.com/kura07/items/d1a57ea64ef5c3de8528
@kura07

*/