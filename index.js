const searchCont = document.getElementById('searchCont');
const searchUL = document.getElementById('searchUL');
const input = document.getElementById('input');
function jsonp(url,obj){
    return new Promise((resolve,reject)=>{
        let script = document.createElement("script");
        let {params,jsonpName}=obj;
        script.src = `${url}?prod=${params.prod}&wd=${params.wd}&jsonpName=${jsonpName}`;
        document.head.appendChild(script);

        resolve();

    })
}
input.oninput=function(e){
    // console.log(e.target.value);


}

jsonp("https://www.baidu.com/sugrec",{
    params:{
        prod:'pc',
        wd:"珠峰"
    },
    jsonpName:'cb'
}).then(value=>{
    console.log('请求成功',value);
});