////定义:全局变量screenWidth、screenHeight
///功能：存储屏幕宽度、屏幕高度
var screenWidth= screen.width;   //修改：直接用原生JS,原为$(window).width();
var screenHeight= screen.height; //修改：直接用原生JS，原为$(window).height();

////定义:全局变量gStartPageTemplate
///功能：存储启动页面模板 ？？？
var  gStartPageTemplate=''; //修改：给个初始值为空字符串，原为没有初始化

////执行：为全局变量gStartPageTemplate赋值
///功能：根据不同屏幕尺寸，即如果大于700和小于700两种情况，为gStartPageTemplate赋上不同值。
///说明：我们的基本假设是，不管横屏还是竖屏，只要宽度小于700，那就是手机；否则就是平板。（来自原有注释）
if(screenWidth>=700){
	gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&screentype=wide&';
}else{
	gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&';
}
///疑问：导入的phonetemplate.html作用是什么？是不是对应于文件tpl\channel\phonetemplate.html?



////定义：全局变量gIsInSWIFT
///功能：标志是否在原生IOS中运行
var gIsInSWIFT = false;

////执行：为gIsInSWIFT赋值
///功能：判断是否在原生iOS中运行
if(window.location.href.indexOf('isInSWIFT')>=0){//运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行
	gIsInSWIFT=true;
}
///疑问:这个规则“运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行”，应该是在iPhoneApp项目中定义的吧？



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

////执行：在本地测试
if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.location.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {//本机服务器地址的几种形式吧？
	///在本地测试的话就直接使用本地api下的已经通过gulpfile.js的任务ea准备好了的几个json文件
    gApiUrl.a10001 = 'api/ea001.json';
    gApiUrl.a10003 = 'api/ea003.json';
    gApiUrl.a10007 = 'api/ea007.json';
    gApiUrl.aBackUp = 'api/ea001-backup.json';

    gPostMethod = 'GET';//gPostMethod由"POST"变为"GET"

	///在本地测试的话这几个文件也使用本地路径
    gHomePageVideo = 'api/homepagevideo.tpl?';
    gSkyZ = 'api/skyZ.tpl?';
    giPadVideo = 'api/ipadvideo.tpl?';
    gGetLastUpdateTime = 'api/get_last_updatetime.json?';
    gHotStory = 'api/hotstory.json?';

    gWebRoot = 'http://m.ftchinese.com';
    if (screenWidth >= 700) {
        gStartPageTemplate = 'api/homecontentwide.html?';
    } else {
        gStartPageTemplate = 'api/homecontent.html?';
    }
}



