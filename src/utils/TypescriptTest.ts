function asd(a: number,b:number): number{//括号后面是函数返回值定义
  return a + b
}
function asds(a: number,b:number): void{//void = 函数没有返回值
      console.log(a + b)
  }

async function func(){}

let a: number = 10;
let b: any = 10;

// a = 'asd'   错
// b = 'asd'   对 


type NumStr = number | string;  //使用这个变量 只能复制数字和字符串

let c: NumStr = 10;
let d: NumStr = 'asd';

// let cc: NumStr = false; 错

let aa: 'on' | 'off' = 'on';

// aa = 'off';  对
// aa = 'other';  错


// 验证对象  需要用到 接口API

interface Post {
    title: string;
    author:string;
}

let post: Post = { //必须与上面定义的post对象一致 否则报错
    title:"dasd",
    author:"asdasd",
    // asdasd:"asdasd"  错
}



function ss(post1: Post){       
        console.log(post1.author);
}

let post1 = { //必须与上面定义的post对象一致 否则报错
    title:"dasd",
    author:"asdasd",
    asdasd:"asdasd" 
}

ss(post1);

// 数组


let arr : number[] = [1,2,3,3,4,4];

let arrr : Array<number> = [11,2,2,2,2];

// 元素 分别指定类型   

let tup: [number,string,boolean] = [1,'asd',false];

