////定义：全局变量_currentVersion
///功能：设置当前版本号
var _currentVersion = 1117;


////定义：全局变量 _localStorage
///功能：待研究
var _localStorage=0;

////定义：全局变量uaString
///功能：存储浏览器相关信息
var uaString=navigator.userAgent||navigator.vendor||'';


////定义:全局变量screenWidth、screenHeight
///功能：存储屏幕宽度、屏幕高度
var screenWidth= screen.width;   //修改：直接用原生JS,原为$(window).width();
var screenHeight= screen.height; //修改：直接用原生JS，原为$(window).height();



////定义:全局变量gStartPageTemplate
///功能：存储启动页面模板 ？？？
var  gStartPageTemplate=''; //修改：给个初始值为空字符串，原为没有初始化

////定义：全局变量gIsInSWIFT
///功能：标志是否在原生IOS中运行
var gIsInSWIFT = false;



////定义：全局变量gApiUrl
///功能：一些获取数据的路径字符串 待研究？？？
var gApiUrl = {
    'efforts':0,
    'a10001':'/index.php/jsapi/get_new_story?rows=25&',
    'a10003':'/eaclient/apijson.php',
    'a10007':'/eaclient/apijson.php',
    'aBackUp':'/eaclient/apijson.php'
};

////定义：全局变量gPostMethod
///功能；存储http请求方法？？？
var gPostMethod='POST';

////定义：全局变量gHomePageVideo
///功能：待总结？？？
var gHomePageVideo='/index.php/ft/channel/phonetemplate.html?channel=homepagevideo&';

////定义：全局变量gSkyZ
///功能：待总结？？？
var gSkyZ= '/index.php/ft/channel/phonetemplate.html?channel=skyZ&';

////定义：全局变量giPadVideo
///功能：待总结？？？
var giPadVideo = '/index.php/ft/channel/ipadvideo.html?';

////定义：全局变量gGetLastUpdateTime
///功能：待总结？？？
var gGetLastUpdateTime  = '/index.php/jsapi/get_last_updatetime?';

////定义：全局变量gHotStory
///功能：待总结？？？
var gHotStory ='/index.php/jsapi/hotstory/1days?';

////定义：全局变量gWebRoot
///功能：待总结？？？
var gWebRoot = '';



////定义：全局变量osVersion
///功能：存储操作系统版本
var osVersion="";//修改：原文为var osVersion;

////定义：全局变量osVersionMore
///功能：当版本检测出来为手机时，为带小括号的osVersion
var osVersionMore = '';

///功能：标识是否（1/0)使用FT的scroller组件
var useFTScroller = 0;

///功能：指示设备是否支持绝对定位
var noFixedPosition = 0;

///功能：定义一个定制的对象gCustom,待研究
///说明：原文定义在app/mba.html中，内嵌的
var gCustom = {
  "template": "/index.php/ft/channel/phonetemplate.html?pagetype=academy&",
  "appname":"FT商学院",
  "startapi":false,
  "productid":"mbagym",
  "homePageStorageKey":"academyHome",
  "newStoryStorageKey":"academyStories",
  "fetchItems": {
      "item1":{
        "url":"/index.php/ft/channel/phonetemplate.html?channel=academymiddle&",
        "storage":"academymiddle",
        "wrapper":"#middle-content"
      },
      "item2":{
        "url":"/index.php/ft/channel/phonetemplate.html?channel=academyright&",
        "storage":"academyright",
        "wrapper":"#right-content"
      }
  },
  "css":"s.css",
  "useFTScroller":true,
  "pullRefresh":false
}