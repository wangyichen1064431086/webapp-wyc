////定义：全局变量_currentVersion
///功能：设置当前版本号
var _currentVersion = 1117;



////定义：全局变量gDeviceId
///功能：疑问：指示当前设备？？？
var gDeviceId="";



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
///功能；
var gPostMethod='POST';


var gApi001Method = 'GET';

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



///功能：定义一个对象gCustom,待研究
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


////以下6个全局变量对应于上述gCustom的各属性
var  gStartPageTemplate=''; //修改：给个初始值为空字符串，原为没有初始化

var gStargPageAPI=true;

var gAppName='Web App';

var gHomePageStorageKey = 'homePage';

var gNewStoryStorageKey = 'homepage';

var gPullRefresh=false;



////定义：全局变量gVerticalScrollopts
///类型：object
///功能：存储垂直滚动条相关变量（待研究）
var gVerticalScrollOpts = {//修改：把声明和赋值合并了
    scrollingX: false,
    bouncing:gPullRefresh,
    snapping: false,
    scrollbars: true,
    scrollBoundary: 8,
    updateOnChanges: true,
    updateOnWindowResize: true,
    windowScrollingActiveFlag: "gFTScrollerActive"
};

////定义：几个和scroller相关的全局变量
///疑问：它们具体都代表什么？
var scrollHeight=0, scrollOverlay=0;
var sectionScroller, 
theScroller, 
storyScroller, 
channelScroller, 
thenavScroller,
shareScroller, 
introScroller, 
sectionScrollerX=0;


////定义：时间戳相关的几个全局变量
var thisday;
var thed;
var themi;
var thed;
var thisdayunix; //今天的Unix时间戳
var expiredayunix; //3 * 30 * 24 * 60 * 60; //本地存储过期日(三个月)的unix时间戳
var latestunix;//这是最新的时间戳的意思吧？？



////定义：全局变量gNowView
///功能：指示目前显示的Div的class，可能为fullbody, storyview, adview或channel
var gNowView = 'fullbody';


////定义：全局变量longholiday
///功能：指示是否处于长假时间？？？（待确认）
var longholiday = 0;
//if (thed >= '20130109' && thed <= '20130112') {longholiday = 1};


////定义：全局变量gStartStatus
///功能：描述启动时状态的字符串
var gStartStatus="";


////定义：全局变量gOnlineAPI
///功能：标志其是处于线上(true)or线下(false)
var gOnlineAPI = false;

////定义：全局变量allstories
///类型:array
///功能:存储所有文章？？？疑问
var allstories=[];



///功能：存储请求开始前的时间戳
var gHomeAPIRequest;

///功能：请求成功后的时间戳
var gHomeAPISuccess;

///功能：请求成功后的时间戳(猜的)待确认
var gHomeAPIfail;

var gStartPageAPI=true;

///功能：存储最近一次在线状态下载文章的时间戳？？（猜的）待研究，但一定是个时间戳
var lateststory='';


var gHomeAPIfail;


var readingid;
var langmode="ch";
var  hist = [];
var  pageStarted=0;


///功能：把所有的Ajax requests都放在一个数组里面，如果因为网络不好，用户要求直接转到离线阅读，则立即abort所有requests
var requests=[];

///
var connectInternet = 'no';

///功能：标识是否显示的是最新主页
var gHomePageIsLatest = true; 