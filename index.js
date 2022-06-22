const searchCont = document.getElementById('searchCont');
const searchUL = document.getElementById('searchUL');
const input = document.getElementById('input');
const searchBox = document.getElementById('searchBox');
let html = document.documentElement||document.body;

//目的：把从百度接口获取的数据写入li
//思路：1.获取对应的DOM元素 2.获取数据 3.找到需要的特定数据值 4.循环数据动态创建li 5.键盘按下时触发函数

const getData = async function getData(){
    let aa = input.value;
    let result = await jsonp("https://www.baidu.com/sugrec",{
        params:{
            prod:'pc',
            wd:aa
        },
        jsonpName:'cb'
    })
    // console.log(result);
    let{g}=result;
    // console.log(g);
    if(g!==undefined){
    let str =``;
    g.forEach(item => {
        let date = item.q;
        str+=`<li class="searchLI">${date}</li>`;
    });
    searchUL.innerHTML=str;
    searchCont.style.display='block';
    }
}
input.oninput = getData;
//鼠标点击，展示框消失
html.onclick = function(){
        searchCont.style.display='none';
}




 



