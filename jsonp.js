/* 
  封装一个jsonp方法「基于promise管理」,执行这个方法可以发送jsonp请求 
    jsonp([url],[options])
      options配置项
      + params:null/对象 问号参数信息
      + jsonpName:'callback' 基于哪个字段把全局函数名传递给服务器
      + ...
*/
(function () {
  /* 工具类方法 */
  // 检测是否为纯粹对象
  const toString = Object.prototype.toString;
  const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
  };
  // 把对象变为URLENCODED格式字符串 xxx=xxx&xxx=xxx
  const stringify = function stringify(obj) {
    let keys = Reflect.ownKeys(obj),
      str = ``;
    keys.forEach(key => {
      let value = obj[key];
      str += `&${key}=${value}`;
    });
    return str.substring(1);
  };

  /* 核心功能 */
  const jsonp = function jsonp(url, options) {
    //初始化参数
    if(typeof url!=="string")throw new TypeError("url is not string");
    if(!isPlainObject(options))options={};
    let {params,jsonName} = Object.assign({
      params:null,
      jsonName:'callback'
    },options);
    //返回promise实例；请求成功，实例是fulfiled,值是服务器获取的结果；请求失败，实例是rejected...
    return new Promise((resolve,reject)=>{
      let name,script;
       //清除创建的内容方法
       const clear=()=>{
        delete window[name];
        document.body.removeChild(script)
      }
      //创建全局函数{不能和其他全局函数有冲突}
       name=`jsonp${+new Date()}`;
      window[name] = function(value){
        //请求成功，value是从服务器获取的结果
        resolve(value);
        clear();
      };
      //拼接URL地址：拼接params & 拼接callback
      if(params){
        params = stringify(params);
        url +=`${url.includes("?")?'&':'?'}${params}`;
      }
      url+=`${url.includes("?")?'&':'?'}${jsonName}=${name}`;
      //基于script发送数据请求
      script = document.createElement("script");
      script.src = url;
      script.onerror=()=>{
        //请求失败
        reject();
        clear();
      };
      document.body.appendChild(script);
    })

  };

  /* 暴露API */
  if (typeof module === 'object' && typeof module.exports === 'object') module.exports = jsonp;
  if (typeof window !== 'undefined') window.jsonp = jsonp;
})();