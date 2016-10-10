////定义：全局变量_currentVersion
///功能：设置当前版本号
var _currentVersion = 1117;


///定义全局变量uaForMail
//功能：存储浏览器相关信息
var uaForMail=navigator.userAgent||navigator.vendor||"";
uaForMail=uaForMail+"%0D%0A%0D%0Amy URL: "+location.href;



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

///功能：标识是否使用原生的CSS的scroll, 即overflow:scroll
var nativeVerticalScroll = false;

///功能：指示设备是否支持绝对定位
var noFixedPosition = 0;


///如果网址中有wechatShare,则强制调用iOS原生SDK分享（原文注释）
var iOSShareWechat=0;


var gShowStatusBar =0;

///功能：根据设备是pad还是手机，值可能为'/ipad'或'/phone'，再在后面加上gCustom.productid
var gDeviceType='';

///功能：定义一个对象gCustom,待研究
///说明：原文定义在app/mba.html中，内嵌的
/*
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
*/

////以下6个全局变量对应于上述gCustom的各属性var  gStartPageTemplate=''; //修改：给个初始值为空字符串，原为没有初始化

var gStargPageAPI=true;

var gAppName='Web App';

var gHomePageStorageKey = 'homePage';

var gNewStoryStorageKey = 'homepage';

var gPullRefresh=false;



////定义：全局变量gVerticalScrollopts
///类型：object
///功能：存储FTScroller的垂直滚动条配置属性，为new FTScroller(,)函数的第二个参数，待研究
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
var scrollHeight=0, //即为window.scrollY即window.pageYOffset，垂直方向滚动过的距离
scrollOverlay=0;
var sectionScroller, 
theScroller, //用以存储FT的scroller对象
storyScroller, 
channelScroller, 
thenavScroller,//
shareScroller, 
introScroller, 

sectionScrollerX=0;//其值通过sectionScroller.scrollLeft求得，即为首页顶部导航条左侧已经滚过的距离


////定义：时间戳相关的几个全局变量
var thisday;
var thed;
var themi;
var thed;
var thisdayunix; //今天的Unix时间戳
var expiredayunix; //3 * 30 * 24 * 60 * 60; //本地存储过期日(三个月)的unix时间戳
var latestunix;//这是最新的时间戳的意思吧？？
var actionTimeStamp;



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

///功能：存储最近一次在线状态下载文章的时间戳？？（猜的）待研究，但一定是个时间戳???
var lateststory='';


var gHomeAPIfail;

///存储正在读取的story的id
var readingid;


var langmode="ch";


///功能：存储历史记录信息对象的数组，每个数组元素对象结构为{'url':url,'title':channel}
var  hist = [];


var  pageStarted=0;

///功能:指示是否是点击浏览器的前进后退按钮，是的话则为1
var _popstate=1;

///功能：把所有的Ajax requests都放在一个数组里面，如果因为网络不好，用户要求直接转到离线阅读，则立即abort所有requests
var requests=[];

///
var connectInternet = 'no';

///功能：标识是否显示的是最新主页
var gHomePageIsLatest = true; 

///功能：存储给用户的提示内容
var pmessage;

///功能：存储语言模式，cookie'langmode'中存储的
var langmode="ch";

///功能：存储用户名，cookie 'USER_NAME' 中存储的
var username="";//修改：之前没有赋初始值，如果不赋初始值，则自动为undefined


//网页的地址
var gAppRoot=window.location.href;
gAppRoot=gAppRoot.replace(/^.*\.com\//g,"").replace(/(\.html).*$/g,"$1").replace(/(\.php).*$/g,"$1").replace(/\#.*$/g,'');


var gStartPageStorage = '';


var gConnectionType="";

///存储发出请求的时间
var requestTime;


var gStartPageTemplate; 

///存储从url提取的信息组成的数组
var gTagData=[];